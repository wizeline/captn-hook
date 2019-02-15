const db = require('@architect/data')

exports.handler = async function http (req) {
  const API_KEY = req.headers['x-api-key'] || 'xxxxX.Xxxxx'
  const { event = false } = req.params

  const results = await db.subscribers.query({
    KeyConditionExpression: `serviceEvent = :event`,
    ExpressionAttributeValues: {
      ':event': `${API_KEY}|${event}`
    }
  })

  // map output
  const subscriptions = (results.Items || []).map((item) => {
    const { serviceEvent, subscriber, ...subscription } = item
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
