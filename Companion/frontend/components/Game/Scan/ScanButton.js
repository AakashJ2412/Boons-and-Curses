import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Snackbar, Button } from 'react-native-paper';

const Scan = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            width: "80%",
            margin: 10,
        },
    });

    const handleScanButton = () => {
        console.log("Scan button pressed");
        navigation.navigate('Scanner');
    }

    return (
        <View style={styles.container}>
            <Button style={styles.button} mode="contained" onPress={handleScanButton}>
                Scan
            </Button>
        </View>
    )
}

export default Scan;