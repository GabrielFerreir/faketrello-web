const app = require('express')()
const body = require('body-parser')
let port = 8080

module.exports = app

let allowCors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Search')
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
}

app.use(allowCors)
app.use(body.json({limit: '30mb'}))
app.use(body.urlencoded({limit: '30mb', extended: true}))
app.listen(port, () => {
  console.log(`Server online on port ${port} `)
})
