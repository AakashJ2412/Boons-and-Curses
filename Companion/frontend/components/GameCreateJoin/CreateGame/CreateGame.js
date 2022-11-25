import { View, StyleSheet, TouchableOpacity, Share } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState, useEffect, useContext } from 'react'
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { Context } from '../../../UserContext';

const CreateGame = ({ navigation }) => {
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
        textHighlight: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 280,
            padding: 5
        },
        button: {
            width: 300,
            height: 50,
            margin: 10
        }
    });

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: gameLink
            });
        } catch (error) {
            alert(error.message);
        }
    }

    const [user1, setUser1] = useState("");
    const [gameLink, setGameLink] = useState("asdasdasdaddasdasdasdasdasfgafasdasdasdaskdjalksdjaklsjdlaksjdklj");
    const [error, setError] = useState("");
    const appContext = useContext(Context)

    // const copyToClipboard = () => {
    //     Clipboard.setString(gameLink);
    // }

    const toLobby = () => {
        if (user1 === "") {
            setError("Please enter a name");
            return;
        }
        appContext.setUser(user1);
        appContext.setGameId(gameLink);
        appContext.setIsAdmin(true);
        navigation.navigate("Lobby");
    }

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Create Game</Text>
            <TextInput
                label="Your Username"
                value={user1}
                onChangeText={text => setUser1(text)}
                style={styles.input}
            />

            <TouchableOpacity onPress={onShare} style={{backgroundColor:"lightgrey", width: 300,borderRadius: 2, padding: 10}}>
                    <Text style={styles.textHighlight} numberOfLines={1} variant="bodyLarge">{gameLink}</Text>
            </TouchableOpacity>
            <Text>
                Tap the box to copy link
            </Text>
            <Button mode="contained" onPress={toLobby} style={styles.button} labelStyle={styles.textHighlight}>
                Next
            </Button>
            <Snackbar
                visible={error !== ""}
                onDismiss={() => setError("")} F
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        setError("");
                    },
                }}>
                {error}
            </Snackbar>
        </View>
    )
}

export default CreateGame;