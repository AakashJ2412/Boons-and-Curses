import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from './UserContext';
import GameCreateJoin from './components/GameCreateJoin/GameCreateJoin';
import GodSelectStack from './components/GodSelectStack/GodSelectStack';
import Game from './components/Game/Game';

import { io } from "socket.io-client";
const socket = io("ws://localhost:5000");

const App = () => {

  const [gameId, setGameId] = useState("");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [userGod, setUserGod] = useState("");
  socket.connect()

  return (
    <Context.Provider value={{ gameId, setGameId, user, setUser, isAdmin, setIsAdmin, setGameStatus, socket, userGod, setUserGod }}>
      <NavigationContainer>
        {gameStatus === "notStarted" ?
          <GameCreateJoin />
          : gameStatus === "godSelect" ?
            <GodSelectStack />
            : <Game />
        }
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;