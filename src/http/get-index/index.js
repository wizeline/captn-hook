// @architect/functions enables secure sessions, express-style middleware and more
// let arc = require('@architect/functions')
// let url = arc.http.helpers.url

exports.handler = async function http (req) {
  console.log(req)

  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: `
    <!doctype html>
    <html lang='en'>
      <body>Welcome to Captn' Hook</body>
    </html>
   `
  }
}
