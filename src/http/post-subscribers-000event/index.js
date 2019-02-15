const db = require('@architect/data')

exports.handler = async function http (req) {
  const API_KEY = req.headers['x-api-key'] || false
  const { event = false } = req.params
  const { data = { subscriberURL: '' } } = req.body
  const { subscriberURL = '' } = data

  const encodedURL = (Buffer.from(subscriberURL)).toString('base64')

  const subscriber = await db.subscribers.put({
    serviceEvent: `${API_KEY}|${event}`,
    subscriber: encodedURL,
    subscriberURL,
    updated: Date.now()
  })

  const subscription = {
    event,
    subscriberURL,
    updated: subscriber.updated
  }

  return {
    type: 'application/json; charset=utf8',
    status: 201,
    body: JSON.stringify({ data: subscription })
  }
}
