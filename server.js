const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const secure = require('express-force-https')

let app = express()
app.use(secure)
app.use(serveStatic(__dirname + '/dist'))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
