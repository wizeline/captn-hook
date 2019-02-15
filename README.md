# Captn' Hook

Captn' Hook is a Webhooks service that allows asynchronous Service-to-Service Communication.


## Code

### Getting started

Code is organized following [Architect](https://arc.codes/) [Layout](https://arc.codes/quickstart/arc-project-layout).
See the [project manifest](./.arc)

#### http/

HTTP Event Handlers for the Hook  API ⚓️. 

Current endpoints:
- `GET /`
- `GET /events`
- `POST /events`
- `GET /subscribers`
- `POST /subscribers`
- `POST /triggers`

#### queues/

Queue Event Handlers. 

Current triggers:
- `events`: Triggered Events.
- `webhooks`: Cannon's Webhook.


### Running locally

```
npm run local
```


## Architecture Overview

![Captn' Hook](./docs/diagrams/Captn%27%20Hook%20-%20v1.png)

For more details on the architecture see the [docs
](docs/) about Captn' Hook Architecture.
