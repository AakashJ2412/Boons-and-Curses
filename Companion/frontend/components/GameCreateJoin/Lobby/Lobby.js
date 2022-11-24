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
    const [admin, setAdmin] = useState("");
    const [startLoad, setStartLoad] = useState(false);

    const fetchData = async () => {
        console.log("fetching data"+appContext.user);
        appContext.socket.emit("fetchGameSessionData", { gameSessionId: appContext.gameId, user: appContext.user });
        await appContext.socket.on("fetchGameSessionDataResponse", (data) => {
            if(data.gameSessionId === appContext.gameId && data.retVal) {
                console.log("fetching data response");
                setAdmin(data.gameSession.admin);
                setPlayers(data.gameSession.players);
            }
        })
        console.log("done fetching data");
    }

    useEffect(() => {
        fetchData();
        appContext.socket.on("playerJoined", (data) => {
            console.log("checkForJoin")
            if(data.joinVal === true && data.gameSessionId === appContext.gameId) {
                console.log("player joined");
                fetchData();
            }
        })
        appContext.socket.on("gameSessionStarted", (data) => {
            if(data.gameSessionId === appContext.gameId && data.startVal) {
                appContext.setGameStarted(true);
            } else {
                setStartLoad(false);
            }
        })
        console.log(players)
        console.log(admin)
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
        setStartLoad(true);
        appContext.socket.emit("startGameSession", { gameSessionId: appContext.gameId, user: appContext.user });
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
                        {appContext.user === admin ? <FontAwesome5 name={'crown'}/> : null }
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
                        if (player === appContext.user) {
                            return null;
                        }
                        return (
                            <Card style={styles.card} key={index}>
                                <Card.Content>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                        <Title>{player}</Title>
                                        {player === admin ? <FontAwesome5 name={'crown'} /> : null}
                                    </View>
                                </Card.Content>
                            </Card>
                        )
                    })}
            </View>
            <Button style={styles.button} mode="contained" onPress={startGame} disabled={!appContext.isAdmin || startLoad} labelStyle={{
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