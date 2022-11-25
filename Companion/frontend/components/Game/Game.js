import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Gods from './Gods/Gods';
import Scan from './Scan/Scan';
import Stats from './Stats/Stats';

const TabNavigator = createBottomTabNavigator();

const Game = () => {
    return (
        <TabNavigator.Navigator screenOptions={{
            tabBarLabelStyle: {
                fontSize: 16,
            }
        }}>
            <TabNavigator.Screen name="Gods" component={Gods} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="user" size={20} color={color} solid/>)
            }} />
            <TabNavigator.Screen name="Scan" component={Scan} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="qrcode" size={20} color={color} solid/>)
            }} />
            <TabNavigator.Screen name="Stats" component={Stats} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="list" size={20} color={color} solid/>)
            }} />
        </TabNavigator.Navigator >
    )
}

export default Game;