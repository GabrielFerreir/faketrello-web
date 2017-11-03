let app = require('express')
let socket = require('socket.io')
let http = require('http')
const server = http.Server(app)
server.listen(3000)
const io = socket(server)

io.on('connection', function (socket) {
  socket.on('batata', function (res) {
    socket.broadcast.emit('moved', {
      idProject: res.idProject
    })
  })
  // socket.on('disconnect', function () {
  // })
})
