import React, { useEffect, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, ProgressBar, Text } from 'react-native-paper';
import {Context} from '../../../UserContext'

const maxHealth = 600;
const minHealth = 0;
const maxStrength = 450;
const minStrength = 0;
const maxDefense = 450;
const minDefense = 0;
const maxSpeed = 450;
const minSpeed = 0;
const maxCharm = 250;
const minCharm = -250;
const maxAffinity = 250;
const minAffinity = -250;

const Stats = ({ navigation }) => {


    const appContext = useContext(Context);
    const fetchStat = async () => {
        //fetchStat
        appContext.socket.emit("getPlayerStats", {gameSessionId: appContext.gameId, user: appContext.user});
    }

    useEffect(()=>{
        appContext.socket.on("playerStats", (data) => {
            console.log("update stats");
            if(data.gameSessionId === appContext.gameId && data.user === appContext.user && data.statsVal === true) {
                console.log(data)
                setHealth(data.player.health);
                setStrength(data.player.strength);
                setDefense(data.player.defense);
                setSpeed(data.player.speed);
                setCharm(data.player.charm);
                setAffinity(data.player.affinity);
            } else {
                console.log("Error fetching stats")
            }
        });
        appContext.socket.on("cardPlayed", (data) => {
            console.log("card played");
            if(data.gameSessionId === appContext.gameId && data.playVal === true) {
                appContext.socket.emit("getPlayerStats", {gameSessionId: appContext.gameId, user: appContext.user});
            }
        })
        fetchStat();
    }, [])

    const [health, setHealth] = useState(0);
    const [strength, setStrength] = useState(0);
    const [affinity, setAffinity] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [charm, setCharm] = useState(0);
    const [defense, setDefense] = useState(0);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10
        },
        stat: {
            width: "80%",
            margin: 10,
        },
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Health</Text>
                    <View>
                        <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(health - minHealth)/(maxHealth - minHealth)} color={'red'} />
                        <Text variant="labelMedium" style={{ marginTop: 5 }}>{health}</Text>
                    </View>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Strength</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(strength - minStrength)/(maxStrength - minStrength)} color={MD2Colors.orange400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{strength}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Defense</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(defense - minDefense)/(maxDefense - minDefense)} color={MD2Colors.blue600} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{defense}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Charm</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(charm - minCharm)/(maxCharm - minCharm)} color={MD2Colors.pink300} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{charm}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Speed</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(speed - minSpeed)/(maxSpeed - minSpeed)} color={MD2Colors.green400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{speed}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Affinity</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={(affinity - minAffinity)/(maxAffinity - minAffinity)} color={MD2Colors.purple900} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{affinity}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Stats;