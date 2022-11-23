import { View, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Title, Text, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Context } from '../../../UserContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const delay = ms => new Promise(res => setTimeout(res, ms));

const dummyPlayers = [
    {
        name: "Player 1",
    },
    {
        name: "Player 2",
    },
    {
        name: "Player 3",
    },
    {
        name: "Player 4",
    },
]

const Lobby = ({ navigation }) => {
    const appContext = useContext(Context);
    const [players, setPlayers] = useState([]);

    const fetchData = async () => {
        console.log("fetching data");
        // await delay(3000);
        console.log("done fetching data");
        setPlayers([...dummyPlayers]);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        card: {
            width: 300,
            margin: 10
        },
        button: {
            width: 300,
            height: 50,
            margin: 10,
            marginTop: "auto"
        }
    });

    const startGame = () => {
        // TODO logic for game starting
        appContext.setGameStarted(true);
    }

    /*
    TODO
        1. Add logic for displaying crown icon for host
    */

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Title>{appContext.user}</Title>
                        <FontAwesome5 name={'crown'} />
                    </View>
                </Card.Content>
            </Card>

            <Text style={{ margin: 10, alignSelf: 'flex-start' }} variant="headlineMedium">Players</Text>
            <View style={{ flex: 2, overflow: "scroll" }}>
                {players.length === 0 ?
                    <View>
                        <ActivityIndicator animating={true} color={MD2Colors.deepPurple800} />
                        <Text style={{ margin: 10 }} variant="labelSmall">Waiting for players to join</Text>
                    </View>
                    : players.map((player, index) => {
                        return (
                            <Card style={styles.card} key={index}>
                                <Card.Content>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                        <Title>{player.name}</Title>
                                        <FontAwesome5 name={'crown'} />
                                    </View>
                                </Card.Content>
                            </Card>
                        )
                    })}
            </View>
            <Button style={styles.button} mode="contained" onPress={startGame} disabled={!appContext.isAdmin} labelStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 280,
                padding: 5
            }}>Start Game</Button>
        </View >
    )
}

export default Lobby;