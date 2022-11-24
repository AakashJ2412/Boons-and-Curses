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
    
    const checkLink = (link) => {
        setLoadState(1);
        appContext.socket.emit("joinGameSession", { gameSessionId: link, player: user1 })
        appContext.socket.on(user1+"_joinGameSessionResponse", (data) => {
            if (data.ret === true)
            setLoadState(2);
            else if (data.ret === false)
            setLoadState(3)
        });
        return loadState;
    }

    const next = () => {
        if (user1 === "") {
            setError("Please enter a username");
            return;
        } else if (gameLink === "") {
            setError("Please enter a game link");
            return;
        } else if (checkLink(gameLink) !== 1) {
            setError("Error connecting to server");
            return;
        }
        return;
    }

    
    
    const [loadState, setLoadState] = useState(0); // 0 is disabled, 1 is checking, 2 is true, 3 is false
    const [user1, setUser1] = useState("");
    const [gameLink, setGameLink] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        if(loadState === 2) {
            appContext.setUser(user1);
            appContext.setGameId(gameLink);
            navigation.navigate("Lobby");
        }
        else if (loadState === 3)
            setError("Invalid game link");
    }, [loadState])

    return (
        <View style={styles.container}>
            <TextInput
                label="Your Username"
                value={user1}
                onChangeText={text => setUser1(text)}
                style={styles.input}
                editable = {loadState === 1 ? false : true}
            />
            <TextInput
                label="Game Link"
                value={gameLink}
                onChangeText={text => setGameLink(text)}
                style={styles.input}
                editable = {loadState === 1 ? false : true}
            />
            <Button style={styles.button} mode="contained" onPress={next} labelStyle={styles.text} editable = {loadState === 1 ? false : true}> Next </Button>
            <Snackbar visible={error} onDismiss={() => setError("")} action={{ label: 'Dismiss', onPress: () => setError("") }}>
                {error}
            </Snackbar>
        </View >
    )
}

export default JoinGame