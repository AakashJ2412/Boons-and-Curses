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

const getDamage = (power, probability, stab, strength, defense, plAff, oppAff) => {
  if(Math.floor(Math.random()*100) < probability) {
    return Math.floor(power * (stab) * (strength*((plAff+100)/100))/(defense*((oppAff+100)/100)))
  } else {
    return 0;
  }
}

const staticGameData = {
  "cards": [
      "ZS1","ZS2","ZS3","ZS4",
      "HP1","HP2","HP3","HP4",
      "AP1","AP2","AP3","AP4",
      "AT1","AT2","AT3","AT4",
      "HD1","HD2","HD3","HD4",
      "PS1","PS2","PS3","PS4"
  ],
  "oppCards": ["ZS1","HP1","HP2", "AP1","AP2","AT1","AT2","HD1","HD3","PS1"],
  "stabCards": {"ZS": 0, "HP": 1, "AP": 2, "AT": 3, "HD": 4, "PS": 5},
  "rivalCards": {"ZS": [1,4], "HP": [0,1], "AP": [1,3], "AT": [3,5], "HD": [0,5], "PS": [3,4]},
  "gods": ['zeus','hephaestus','aphrodite', 'athena', 'hades', 'poseidon'],
  "godStats": {
      'zeus': {
          health: 340,
          strength: 150,
          defense: 100,
          speed: 110,
          charm: 10,
          affinity: -10    
      },
      'hephaestus': {
          health: 360,
          strength: 100,
          defense: 170,
          speed: 100,
          charm: -40,
          affinity: 0    
      },
      'aphrodite': {
          health: 320,
          strength: 100,
          defense: 100,
          speed: 110,
          charm: 50,
          affinity: 30    
      },
      'athena': {
          health: 260,
          strength: 150,
          defense: 100,
          speed: 120,
          charm: 0,
          affinity: 20    
      },
      'hades': {
          health: 300,
          strength: 120,
          defense: 90,
          speed: 140,
          charm: 40,
          affinity: 0    
      },
      'poseidon': {
          health: 300,
          strength: 100,
          defense: 140,
          speed: 100,
          charm: 0,
          affinity: 50    
      }
  }
}

gameSessions = []

io.on('connection',(socket)=>{
  
  console.log('client connected: ', socket.id)
  socket.on("createGameSession", (data) => {
    console.log("create game session")
    gameSessions.push({
      id: data.gameSessionId,
      players: [{
        name: data.player, 
        selectedGod: -1, 
        health: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        charm: 0,
        affinity: 0,
        burn: 0,
        invulnerable: 0,
        lastStand: 0,
        blacksmith: 0
      }],
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
      gameSession.players.push({name: data.player,
                                selectedGod: -1, 
                                health: 0,
                                strength: 0,
                                defense: 0,
                                speed: 0,
                                charm: 0,
                                affinity: 0,
                                burn: 0,
                                invulnerable: 0,
                                lastStand: 0,
                                blacksmith: 0
                              })
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
      let selectGod = staticGameData.gods[data.selectedGod]
      console.log(data.selectedGod)
      console.log(Number.isInteger(data.selectedGod))
      console.log(selectGod)
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).selectedGod = data.selectedGod
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).health = staticGameData.godStats[selectGod].health
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).strength = staticGameData.godStats[selectGod].strength
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).defense = staticGameData.godStats[selectGod].defense
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).speed = staticGameData.godStats[selectGod].speed
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).charm = staticGameData.godStats[selectGod].charm
      gameSessions[gameSessionInd].players.find(player => player.name === data.user).affinity = staticGameData.godStats[selectGod].affinity
      console.log(gameSession)
      socket.emit("godSelected", {gameSessionId: data.gameSessionId, selectVal: true, user: data.user})
    }
  })

  socket.on("getPlayerStats", (data) => {
    console.log("get player stats")
    const gameSession = gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    if (!gameSession || gameSession.startState !== 1) {
      console.log("game session not found")
      console.log(gameSession)
      socket.emit("playerStats", {gameSessionId: data.gameSessionId, statsVal: false})
    } else {
      console.log("game session found")
      console.log(gameSession)
      socket.emit("playerStats", {gameSessionId: data.gameSessionId, statsVal: true, user: data.user, player: gameSession.players.find(player => player.name === data.user)})
    }
  })

  socket.on("playCard", (data) => {
    console.log("play a card")
    const gameSession = gameSessions.find(gameSession => gameSession.id === data.gameSessionId)
    if (!gameSession || gameSession.startState !== 1) {
      console.log("game session not found")
      console.log(gameSession)
      socket.emit("cardPlayed", {gameSessionId: data.gameSessionId, playVal: "game session not found"})
    } else if ( ! staticGameData.cards.includes(data.cardId) ) {
      console.log("Invalid card")
      console.log(gameSession)
      socket.emit("cardPlayed", {gameSessionId: data.gameSessionId, playVal: "invalid card"})
    } else {
      console.log("game session found")
      console.log(gameSession)
      let gameSessionInd = gameSessions.findIndex(gameSession => gameSession.id === data.gameSessionId)
      let playerInd = gameSessions[gameSessionInd].players.findIndex(player => player.name === data.user)
      let oppInd = -1
      if(staticGameData.oppCards.includes(data.cardId)) {
        oppInd = gameSessions[gameSessionInd].players.findIndex(player => player.name === data.opponent);
      }
      let selfHealthChange = 0, selfStrengthChange = 0, selfDefenseChange = 0, selfSpeedChange = 0, selfCharmChange = 0, selfAffinityChange = 0;
      let stabModifier = 1;
      let invStabModifier = 1;
      if (staticGameData.stabCards[data.cardId.substring(0,2)] === gameSessions[gameSessionInd].players[playerInd].selectedGod) {
        stabModifier = 1.25;
        invStabModifier = 0.75;
      } else if (staticGameData.rivalCards[data.cardId.substring(0,2)].includes(gameSessions[gameSessionInd].players[oppInd].selectedGod)) {
        stabModifier = 0.75;
        invStabModifier = 1.25;
      }
      let damage = 0;
      let oppHealthChange = 0, oppStrengthChange = 0, oppDefenseChange = 0, oppSpeedChange = 0, oppCharmChange = 0, oppAffinityChange = 0;
      switch (data.cardId) {
        case "ZS1":
          damage = getDamage(30,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          break;
        case "ZS2":
          gameSessions[gameSessionInd].players[playerInd].lastStand = 1;
          break;
        case "ZS3":
          selfStrengthChange = Math.floor(20*stabModifier);
          selfDefenseChange = Math.floor(20*stabModifier);
          selfSpeedChange = - Math.floor(10*invStabModifier);
          break;
        case "ZS4":
          selfHealthChange = Math.floor(30*stabModifier);
          break;
        case "HP1":
          damage = getDamage(10,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          if(Math.floor(Math.random()*2) === 1) {
            gameSessions[gameSessionInd].players[oppInd].burn = 3;
          }
          break;
        case "HP2":
          gameSessions[gameSessionInd].players[oppInd].invulnerable = 2;
          break;
        case "HP3":
          if (stabModifier === 1.25) {
            selfStrengthChange = Math.floor(10*stabModifier);
            selfDefenseChange = Math.floor(10*stabModifier);
          } else {
            selfStrengthChange = - Math.floor(10*invStabModifier);
            selfDefenseChange = - Math.floor(10*invStabModifier);
          }
          break;
        case "HP4":
          selfDefenseChange = Math.floor(10*stabModifier);
          gameSessions[gameSessionInd].players[playerInd].blacksmith = 1;
          break;
        case "AP1":
          damage = getDamage(30,90, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          selfHealthChange = Math.floor(damage/2);
          break;
        case "AP2":
          selfSpeedChange = Math.floor(10*stabModifier);
          oppDefenseChange = - Math.floor(10*invStabModifier);
          oppAffinityChange = - 10;
          break;
        case "AP3":
          gameSessions[gameSessionInd].players[playerInd].selectedGod = -1;
          break;
        case "AP4":
          selfAffinityChange = 30;
          break;
        case "AT1":
          damage = getDamage(40,90, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          break;
        case "AT2": // to be resolved
          oppHealthChange = data.oppDamage;
          selfHealthChange = data.selfDamage;
          break;
        case "AT3":
          selfDefenseChange = Math.floor(10*stabModifier);
          selfSpeedChange = Math.floor(10*stabModifier);
          break;
        case "AT4":
          break;
        case "HD1":
          damage = getDamage(35,95, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          break;
        case "HD2":
          break;
        case "HD3":
          randVal = Math.floor(Math.random()*100);
          if (randVal < 25) {
            damage = getDamage(75,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);  
          } else if (randVal >= 25 && randVal < 50) {
            damage = getDamage(50,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          } else {
            damage = getDamage(25,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          }
          oppHealthChange = -damage;
          break;
        case "HD4":
          selfCharmChange = Math.floor(20*stabModifier);
          selfSpeedChange = Math.floor(20*stabModifier);
          selfHealthChange = - Math.floor(50*invStabModifier);
          break;
        case "PS1":
          damage = getDamage(50,80, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          break;
        case "PS2": // to be resolved
          damage = getDamage(data.krakenDamage,100, stabModifier, gameSessions[gameSessionInd].players[playerInd].strength , gameSessions[gameSessionInd].players[oppInd].defense, gameSessions[gameSessionInd].players[playerInd].affinity, gameSessions[gameSessionInd].players[oppInd].affinity);
          oppHealthChange = -damage;
          gameSessions[gameSessionInd].players[oppInd].burn = 0;
          gameSessions[gameSessionInd].players[oppInd].invulnerable = 3;
          break;
        case "PS3":
          if (stabModifier === 1.25) {
            selfStrengthChange = Math.floor(20*stabModifier);
            selfSpeedChange = Math.floor(10*stabModifier);
          } else {
            selfStrengthChange = - Math.floor(20*invStabModifier);
            selfSpeedChange = - Math.floor(10*invStabModifier);
          }
          break;
        case "PS4":
          selfSpeedChange = Math.floor(30*stabModifier);
          break;
      }
      // Iterate through statuses
      // Blacksmith
      if (gameSessions[gameSessionInd].players[playerInd].blacksmith > 0 && oppInd !== -1 && Math.floor(Math.random()*100) < 10) {
        gameSessions[gameSessionInd].players[oppInd].burn = 3;  
      }
      // Burn
      if (gameSessions[gameSessionInd].players[playerInd].burn > 0) {
        gameSessions[gameSessionInd].players[oppInd].burn -= 1;
        selfHealthChange -= 10;  
      }
      // Invulnerability
      if (gameSessions[gameSessionInd].players[playerInd].invulnerable > 0) {
        gameSessions[gameSessionInd].players[playerInd].invulnerable -= 1;
      }
      if (oppInd !== -1 && gameSessions[gameSessionInd].players[oppInd].invulnerable > 0) {
        if(Math.floor(Math.random()*100) < 10) {
          oppHealthChange *= 2;
        } else {
          oppHealthChange = 0;
        }
      }
      // last stand
      if (gameSessions[gameSessionInd].players[playerInd].lastStand > 0) {
        selfHealthChange -= 5;
      }

      gameSessions[gameSessionInd].players[playerInd].health += selfHealthChange;
      gameSessions[gameSessionInd].players[playerInd].strength += selfStrengthChange;
      gameSessions[gameSessionInd].players[playerInd].defense += selfDefenseChange;
      gameSessions[gameSessionInd].players[playerInd].speed += selfSpeedChange;
      gameSessions[gameSessionInd].players[playerInd].charm += selfCharmChange;
      gameSessions[gameSessionInd].players[playerInd].affinity += selfAffinityChange;

      if (oppInd !== -1) {
        gameSessions[gameSessionInd].players[oppInd].health += oppHealthChange;
        gameSessions[gameSessionInd].players[oppInd].strength += oppStrengthChange;
        gameSessions[gameSessionInd].players[oppInd].defense += oppfDefenseChange;
        gameSessions[gameSessionInd].players[oppInd].speed += oppSpeedChange;
        gameSessions[gameSessionInd].players[oppInd].charm += oppCharmChange;
        gameSessions[gameSessionInd].players[oppInd].affinity += oppAffinityChange;
      }
      io.sockets.emit("cardPlayed", {gameSessionId: data.gameSessionId, playVal: true})
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