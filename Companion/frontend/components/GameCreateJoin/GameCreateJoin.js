import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateGame from './CreateGame/CreateGame';
import Lobby from './Lobby/Lobby';
import Home from './Home/Home';
import JoinGame from './JoinGame/JoinGame';

const Stack = createNativeStackNavigator();

const GameCreateJoin = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create Game" component={CreateGame} />
            <Stack.Screen name="Join Game" component={JoinGame} />
            <Stack.Screen name="Lobby" component={Lobby} />
        </Stack.Navigator>
    )
}

export default GameCreateJoin;