@app
captnhook

@http
get /
get /events
post /events
get /subscribers/:event
post /subscribers/:event
post /triggers/:event

@queues
events
webhooks

@tables
events
  key *String
  event **String
  #service

subscribers
  serviceEvent *String
  subscriber **String

webhooks
  serviceEvent *String
  subscriberURL **String

