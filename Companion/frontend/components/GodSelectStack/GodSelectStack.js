import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GodSelect from './GodSelect/GodSelect';
import Gods from './Gods/Gods';

const Stack = createNativeStackNavigator();

const GodSelectStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="God Select" component={GodSelect} />
            <Stack.Screen name="God" component={Gods} />
        </Stack.Navigator>
    );
};

export default GodSelectStack;