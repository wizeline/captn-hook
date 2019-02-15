const arc = require('@architect/functions')

exports.handler = async function http (req) {
  const api_key = req.headers['x-api-key'] || 'xxxxX.Xxxxx'
  const {event = false} = req.params
  const {data = {}} = req.body


  if(!event) {
    return {
      status: 400,
      error: `Bad Request`
    }
  }

  try {
    const payload = {
      client: api_key,
      event,
      data
    }

    // push event to the queue
    await arc.queues.publish({
      name: 'events',
      payload,
    })

    return {
      type: 'application/json; charset=utf8',
      status: 202,
      body: JSON.stringify(payload)
    }
  } catch (e) {
    return {
      status: 500,
      error: `Error while Queueing event '${event}'`
    }
  }
}
