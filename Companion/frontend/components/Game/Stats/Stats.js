import React, { useEffect, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, ProgressBar, Text } from 'react-native-paper';

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

    const fetchStat = async () => {
        //fetchStat
        let health = 500;
        let strength = 100;
        let defense = 100;
        let speed = 100;
        let charm = 100;
        let affinity = 100;
        setHealth(health);
        setStrength(strength);
        setDefense(defense);
        setSpeed(speed);
        setCharm(charm);
        setAffinity(affinity);
        health = (health - minHealth)/(maxHealth - minHealth);
        strength = (strength - minStrength)/(maxStrength - minStrength);
        defense = (defense - minDefense)/(maxDefense - minDefense);
        speed = (speed - minSpeed)/(maxSpeed - minSpeed);
        charm = (charm - minCharm)/(maxCharm - minCharm);
        affinity = (affinity - minAffinity)/(maxAffinity - minAffinity);
        setDisplayHealth(health);
        setDisplayStrength(strength);
        setDisplayDefense(defense);
        setDisplaySpeed(speed);
        setDisplayCharm(charm);
        setDisplayAffinity(affinity);
        console.log(health, strength, defense, speed, charm, affinity);
    }

    useEffect(()=>{
        fetchStat();
    }, [])

    const [health, setHealth] = useState(0);
    const [strength, setStrength] = useState(0);
    const [affinity, setAffinity] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [charm, setCharm] = useState(0);
    const [defense, setDefense] = useState(0);
    const [displayHealth, setDisplayHealth] = useState(0);
    const [displayStrength, setDisplayStrength] = useState(0);
    const [displayAffinity, setDisplayAffinity] = useState(0);
    const [displaySpeed, setDisplaySpeed] = useState(0);
    const [displayCharm, setDisplayCharm] = useState(0);
    const [displayDefense, setDisplayDefense] = useState(0);

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
                        <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displayHealth} color={'red'} />
                        <Text variant="labelMedium" style={{ marginTop: 5 }}>{health}</Text>
                    </View>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Strength</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displayStrength} color={MD2Colors.orange400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{strength}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Defense</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displayDefense} color={MD2Colors.blue600} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{defense}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Charm</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displayCharm} color={MD2Colors.pink300} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{charm}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Speed</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displaySpeed} color={MD2Colors.green400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{speed}</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Affinity</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={displayAffinity} color={MD2Colors.purple900} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>{affinity}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Stats;