const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)

app.use('/', (req, res) => {
  res.send("Game server is running")
})

const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:19006'
    }
}) //in case server and client run on different urls

io.on('connection',(socket)=>{
  
  console.log('client connected: ',socket.id)
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  socket.on('disconnect',()=>{
    console.log('client disconnected')
  })

  socket.on('disconnect from server',(reason)=>{
    console.log("Reason: ", reason)
  })

})

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', PORT)
})