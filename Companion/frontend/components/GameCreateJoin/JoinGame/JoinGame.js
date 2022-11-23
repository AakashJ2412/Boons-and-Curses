import { View, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, Button, Snackbar } from 'react-native-paper'
import { Context } from '../../../UserContext';

const JoinGame = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        input: {
            width: 300,
            height: 50,
            margin: 10
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

    const appContext = useContext(Context);

    const checkLink = link => {
        // code for checking link
        return true;
    }

    const next = () => {
        if (user1 === "") {
            setError("Please enter a username");
            return;
        } else if (gameLink === "") {
            setError("Please enter a game link");
            return;
        } else if (!checkLink(gameLink)) {
            setError("Invalid game link");
            return;
        }
        appContext.setUser(user1);
        appContext.setGameId(gameLink);
        navigation.navigate("Lobby");
        return;
    }

    const [user1, setUser1] = useState("");
    const [gameLink, setGameLink] = useState("");
    const [error, setError] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                label="Your Username"
                value={user1}
                onChangeText={text => setUser1(text)}
                style={styles.input}
            />
            <TextInput
                label="Game Link"
                value={gameLink}
                onChangeText={text => setGameLink(text)}
                style={styles.input}
            />
            <Button style={styles.button} mode="contained" onPress={next} labelStyle={styles.text}> Next </Button>
            <Snackbar visible={error} onDismiss={() => setError("")} action={{ label: 'Dismiss', onPress: () => setError("") }}>
                {error}
            </Snackbar>
        </View >
    )
}

export default JoinGame