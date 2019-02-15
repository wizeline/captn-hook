const db = require('@architect/data')

exports.handler = async function http (req) {
  const api_key = req.headers['x-api-key'] || 'xxxxX.Xxxxx'
  const {event = false} = req.params
  const {data = {subscriberURL: ''}} = req.body
  const {subscriberURL = ''} = data

  const results = await db.subscribers.query({
    KeyConditionExpression: `serviceEvent = :event`,
    ExpressionAttributeValues: {
      ':event': `${api_key}|${event}`
    }
  })

  // map output
  const subscriptions = (results.Items || []).map((item) => {
    const { serviceEvent, subscriber, ...subscription} = item
    const eventName = serviceEvent.split('|')[1] || event

    return {
      event: eventName,
      ...subscription
    }
  })

  return {
    type: 'application/json; charset=utf8',
    status: 200,
    body: JSON.stringify({
      subscriptions,
      count: results.Count
    })
  }
}
