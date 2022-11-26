import React, { useEffect, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, ProgressBar, Text } from 'react-native-paper';

const Stats = ({ navigation }) => {

    const fetchStat = async () => {
        //fetchStat
    }

    const [health, setHealth] = useState(0.5);
    const [strength, setStrength] = useState(0.5);
    const [affinity, setAffinity] = useState(0.5);
    const [speed, setSpeed] = useState(0.5);
    const [charm, setCharm] = useState(0.5);
    const [defense, setDefense] = useState(0.5);

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
                        <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={health} color={'red'} />
                        <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                    </View>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Strength</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={strength} color={MD2Colors.orange400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Defense</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={defense} color={MD2Colors.blue600} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Charm</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={charm} color={MD2Colors.pink300} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Speed</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={speed} color={MD2Colors.green400} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                </View>
                <View style={styles.stat}>
                    <Text variant="headlineMedium">Affinity</Text>
                    <ProgressBar style={{ alignSelf: 'center', height: 20 }} progress={affinity} color={MD2Colors.purple900} />
                    <Text variant="labelMedium" style={{ marginTop: 5 }}>20/100</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Stats;