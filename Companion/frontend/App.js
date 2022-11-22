import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from './UserContext';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { io } from "socket.io-client";
const socket = io("ws://localhost:5000");
const Stack = createNativeStackNavigator();

import { HomeScreen } from './components/home/home';
import { CameraScan } from './components/scan/scan';
import { CardDetails } from './components/details/details';
import { AboutUs } from './components/about/about';

const App = () => {
  
  useEffect(() => {
    socket.connect()
    socket.on("hello from server", () => {
      console.log("Server says hi")
    });
    console.log("Component mounted")
  });

  // const disconnectServer = (event) => {
  //   console.log("Disconnected")
  //   event.preventDefault();
  //   socket.emit("disconnect from server", "No specific reason")
  //   socket.disconnect()
  // }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <div>
      <UserContext.Provider value={{ signcheck, email, setUser, logout }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutUs} />
            <Stack.Screen name="Scan" component={CameraScan} />
            <Stack.Screen name="Details" component={CardDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </div>
  );
}

export default App;