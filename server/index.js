const app = require('express')()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3030

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

io.on('connection', (socket) => {
  console.log('>>> A client has connected')

  socket.on('disconnect', () => {
    console.log('<<< A client disconnected')
  })

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', data)
  })

  socket.on('left', (data) => {
    socket.broadcast.emit('left', data)
  })

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

  socket.on('typing-stop', (data) => {
    socket.broadcast.emit('typing-stop', data)
  })
})

http.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
