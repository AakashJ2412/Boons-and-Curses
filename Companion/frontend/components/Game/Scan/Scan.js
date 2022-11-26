import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Snackbar, Button } from 'react-native-paper';
import ScanButton from './ScanButton';
import Scanner from './Scanner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Scan = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Scan Button" component={ScanButton} />
            <Stack.Screen name="Scanner" component={Scanner} />
        </Stack.Navigator>
    )
}

export default Scan;