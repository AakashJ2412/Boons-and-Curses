import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gods from './Gods/Gods';
import Scan from './Scan/Scan';
import Stats from './Stats/Stats';

const TabNavigator = createBottomTabNavigator();

const Game = () => {
    return (
        <TabNavigator.Navigator>
            <TabNavigator.Screen name="Gods" component={Gods} />
            <TabNavigator.Screen name="Scan" component={Scan} />
            <TabNavigator.Screen name="Stats" component={Stats} />
        </TabNavigator.Navigator>
    )
}

export default Game;