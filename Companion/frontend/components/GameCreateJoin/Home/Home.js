import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'

const Home = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            width: 300,
            height: 50,
            margin: 10
        },
        text: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 280,
            padding: 5
        }
    });

    return (
        <View style={styles.container}>
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate("Create Game")} labelStyle={styles.text}>
                Create Game
            </Button>
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate("Join Game")} labelStyle={styles.text}>
                Join Game
            </Button>
        </View>
    )
}

export default Home