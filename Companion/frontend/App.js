import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from './UserContext';
import GameCreateJoin from './components/GameCreateJoin/GameCreateJoin';


const App = () => {

  const [gameId, setGameId] = useState("");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <Context.Provider value={{ gameId, setGameId, user, setUser, isAdmin, setIsAdmin, setGameStarted }}>
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