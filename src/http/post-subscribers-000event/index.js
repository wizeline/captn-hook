const db = require('@architect/data')

exports.handler = async function http (req) {
  const api_key = req.headers['x-api-key'] || false
  const {event = false} = req.params
  const {data = {subscriberURL: ''}} = req.body
  const {subscriberURL = ''} = data

  const encodedURL = (new Buffer(subscriberURL)).toString('base64')

  const subscriber = await db.subscribers.put({
    serviceEvent: `${api_key}|${event}`,
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
