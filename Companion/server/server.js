const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
//const staticGameData = require('./staticGameData')

app.use('/', (req, res) => {
  res.send("Game server is running")
})

const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:19006'
    }
}) //in case server and client run on different urls

gameSessions = []

io.on('connection',(socket)=>{
  
  console.log('client connected: ', socket.id)
  socket.on("createGameSession", (data) => {
    console.log("create game session")
    gameSessions.push({
      id: data.gameSessionId,
      players: [{name: data.player, selectedGod: -1}],
      admin: data.player,
      startState: 0
    })
    console.log(gameSessions)
  })
  
  socket.on("joinGameSession", (data) => {
    console.log(data.gameSessionId)
    console.log("join game session")
    const gameSession = gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    if (!gameSession || gameSession.startState !== 0) {
      console.log("game session not found")
      console.log(gameSession)
      socket.emit(data.player+"_joinGameSessionResponse", {ret: false})
    } else {
      console.log("game session found")
      console.log(gameSession)
      socket.emit(data.player+"_joinGameSessionResponse", {ret: true})
      gameSession.players.push({name: data.player, selectedGod: -1})
      io.sockets.emit("playerJoined", {gameSessionId: data.gameSessionId, joinVal: true})
    }
  })

  socket.on("fetchGameSessionData", (data) => {
    console.log("fetch gameSession data" + data.user + " " + data.gameSessionId)
    ret =  gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    console.log(ret)
    if (ret)
      socket.emit("fetchGameSessionDataResponse", {gameSessionId: data.gameSessionId, gameSession: ret, retVal: true})
    else
      socket.emit("fetchGameSessionDataResponse", {gameSessionId: data.gameSessionId, retVal: false})
  })

  socket.on("startGameSession", (data) => {
    console.log("start game session")
    const gameSession = gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    if (!gameSession || gameSession.startState !== 0 || data.user !== gameSession.admin) {
      console.log("game session not found")
      console.log(gameSession)
      socket.emit("gameSessionStarted", {gameSessionId: data.gameSessionId, startVal: false})
    } else {
      console.log("game session found")
      console.log(gameSession)
      let gameSessionInd = gameSessions.findIndex(gameSession => gameSession.id === data.gameSessionId)
      gameSessions[gameSessionInd].startState = 1
      io.sockets.emit("gameSessionStarted", {gameSessionId: data.gameSessionId, startVal: true})
    }
  })

  socket.on("selectGod", (data) => {
    console.log("select god")
    const gameSession = gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    if (!gameSession || gameSession.startState !== 1) {
      console.log("game session not found")
      console.log(gameSession)
      socket.emit("godSelected", {gameSessionId: data.gameSessionId, selectVal: false})
    } else {
      console.log("game session found")
      let gameSessionInd = gameSessions.findIndex(gameSession => gameSession.id === data.gameSessionId)
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).selectedGod = data.selectedGod
      console.log(gameSession)
      socket.emit("godSelected", {gameSessionId: data.gameSessionId, selectVal: true, user: data.user})
    }
  })

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