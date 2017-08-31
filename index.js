require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request-promise-native');

const { PORT = 3000, PRIMARY_URL, SECONDARY_URLS } = process.env;

const commaSeparatedStringToArray = str =>
  String.prototype.split.call(str, ',').map(s => s.trim());

const secondaryUrls = commaSeparatedStringToArray(SECONDARY_URLS);

const proxy = (req, target) =>
  request({
    uri: target,
    body: req.body,
    method: req.method,
    headers: req.headers,
  });

app.use(bodyParser.raw({ type: '*/*' }));

app.all('/', (req, res) => {
  secondaryUrls.forEach(url => {
    proxy(req, url).catch(error => {
      console.error(`Unable to proxy request to secondary URL ${url}.`, error);
    });
  });

  proxy(req, PRIMARY_URL)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log(`Proxy started on port ${PORT}.`);
});
