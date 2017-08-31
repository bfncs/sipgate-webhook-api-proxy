# sipgate Webhook API Proxy

The [sipgate Webhook API](https://github.com/sipgate/sipgate.io) (also known as sipgate.io) is a realtime telephony API that enables you to get call meta data and manipulate the call flow in real time.

While super-handy it currently allows you to only configure a single web endpoint for incoming/outgoing calls that has to answer to any request. It often makes sense to have multiple endpoints with all but one only listening and processing call meta data.

This proxy is a simple way to get around this restrictions and add an unlimited number of additional endpoints that only listen for requests.

## Get started

1. Clone this project.
2. Copy `.env.dist` to `.env` and edit the settings in the newly created file:
* `PORT` should include your desired port
* `PRIMARY_URL` should include the url of your normal webhook handler that confirms the sipgate.io specst
* `SECONDARY_URLS` should include a comma-separated list of urls of handlers where any requests are relayed but that are not expected to respond in a particular way
3. Run `npm start` to start the service.