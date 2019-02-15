const arc = require('@architect/functions')
const db = require('@architect/data')

async function handler (record) {
  console.log(`record: `, record)

  const API_KEY = record.client || 'xxxxX.Xxxxx'
  const event = record.event

  let response = {
    status: 500
  }

  try {
    const results = await db.subscribers.query({
      KeyConditionExpression: `serviceEvent = :event`,
      ExpressionAttributeValues: {
        ':event': `${API_KEY}|${event}`
      }
    })

    results.Items.forEach(subscriber => {
      const payload = {
        event,
        url: subscriber.subscriberURL,
        data: record.data
      }

      console.log(payload)

      arc.queues.publish({
        name: 'webhooks',
        payload
      })
    })
  } catch (e) {
    console.log(`error`, e)
    response = {
      status: 500,
      error: `Error while Processing event '${event}'`
    }
  }

  return response
}

exports.handler = arc.queues.subscribe(handler)
