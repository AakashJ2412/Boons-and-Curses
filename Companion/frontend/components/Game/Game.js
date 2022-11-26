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

const resetStack = ({ navigation, route }) => ({
    tabPress: (e) => {
        const state = navigation.getState();

        if (state) {
            // Grab all the tabs that are NOT the one we just pressed
            const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);

            nonTargetTabs.forEach((tab) => {
                // Find the tab we want to reset and grab the key of the nested stack
                const tabName = tab?.name;
                const stackKey = tab?.state?.key;

                if (stackKey && tabName === 'Scan') {
                    // Pass the stack key that we want to reset and use popToTop to reset it
                    navigation.dispatch({
                        ...StackActions.popToTop(),
                        target: stackKey,
                    });
                }
            });
        }
    },
})

const Game = () => {
    return (
        <TabNavigator.Navigator screenOptions={{
            tabBarLabelStyle: {
                fontSize: 16,
            }
        }}>
            <TabNavigator.Screen name="Stats" component={Stats} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="list" size={20} color={color} solid />)
            }} />
            <TabNavigator.Screen name="Scan" component={Scan} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="qrcode" size={20} color={color} solid />)
            }}
                listeners={resetStack} />
            <TabNavigator.Screen name="Gods" component={Gods} options={{
                tabBarIcon: ((focused, color, size) => <FontAwesome5Icon name="user" size={20} color={color} solid />)
            }} />
        </TabNavigator.Navigator >
    )
}

export default Game;