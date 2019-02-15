exports.handler = async function http(req) {
  console.log(req)
  return {
    type: 'application/json; charset=utf8',
    body: JSON.stringify({
      success: true
    })
  }
}
