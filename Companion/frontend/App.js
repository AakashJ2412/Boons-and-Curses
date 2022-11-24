import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from './UserContext';
import GameCreateJoin from './components/GameCreateJoin/GameCreateJoin';
import { io } from "socket.io-client";
const socket = io("ws://localhost:5000");

const App = () => {

  const [gameId, setGameId] = useState("");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  socket.connect()

  return (
    <Context.Provider value={{ gameId, setGameId, user, setUser, isAdmin, setIsAdmin, setGameStarted, socket }}>
      <NavigationContainer>
        {!gameStarted ?
          <GameCreateJoin />
          :
          <View>
            
          </View>
        }
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;