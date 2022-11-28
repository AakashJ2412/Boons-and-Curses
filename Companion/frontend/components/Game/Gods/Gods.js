import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Context } from '../../../UserContext';

const godsList = [
    {
        name: 'Zeus',
        description: 'Zeus is the Olympian god of the sky and the thunder, the king of all other gods and men, and, consequently, the chief figure in Greek mythology. Zeus led the gods in the wars against the Titans to establish the reign of the gods. Zeus is also known for his infidelity with his sister Hera and many other affairs, which led to him having many children. Zeus gives boons related to Strength, Charm, and Health.',
        rivalries: ['Hades', 'Hephaestus'],
    },
    {
        name: 'Hephestus',
        description: 'Hephaestus is the god of blacksmiths and fire. Called “The Celestial Artificer,” he was also associated with other craftsmen (sculptors, carpenters, metalworkers). He is the husband of Aphrodite. He was thrown off from Mount Olympus by Zeus for being his ugliest child and the fall handicapped him permanently. He grants the champions with curses and boons related to Defence, Health, and Intelligence.',
        rivalries: ['Zeus', 'Hephaestus'],
    },
    {
        name: 'Aphrodite',
        description: 'Athena is the Olympian goddess of wisdom and war and the adored patroness of the city of Athens. She was also – somewhat paradoxically – associated with peace and handicrafts, especially spinning and weaving. Majestic and stern, Athena surpassed everybody in both of her main domains. Even Ares feared her, and all Greek heroes asked her for help and advice. She hates Aphrodite because of their vastly different personalities and how Aphrodite used her charm to her advantage.',
        rivalries: ['Athena', 'Aphrodite'],
    },
    {
        name: 'Athena',
        description: 'Athena is the Olympian goddess of wisdom and war and the adored patroness of the city of Athens. She was also – somewhat paradoxically – associated with peace and handicrafts, especially spinning and weaving. Majestic and stern, Athena surpassed everybody in both of her main domains. Even Ares feared her, and all Greek heroes asked her for help and advice. She hates Aphrodite because of their vastly different personalities and how Aphrodite used her charm to her advantage.',
        rivalries: ['Poseidon', 'Aphrodite'],
    },
    {
        name: 'Hades',
        description: 'Hades is the Ancient Greek god of the Underworld, the place where human souls go after death. In time, his name became synonymous with his realm. It has to be said unsurprisingly – since he barely left it. Hades is also famous for his kidnapping of his wife, Persephone. Hades is equivalent to the glass cannon of the gods and thus gives boons and curses towards Strength, Speed, and Intelligence. Hades hates his brothers Poseidon and Zeus for exiling him to the Underworld.',
        rivalries: ['Zeus', 'Poseidon'],
    },
    {
        name: 'Poseidon',
        description: ' Poseidon is the violent and ill-tempered god of the sea. One of the Twelve Olympians, he was also feared as the provoker of earthquakes and worshipped as the creator of the horse. A hot-blooded deity, Poseidon had many disputes with gods and men, most famously with Athena. His major boons and curses are towards Strength but give minor ones towards Defence and Speed. Poseidon and Athena fought over the control of the city of Athens. Poseidon lost the battle and was unhappy when the people of Athens accepted Athena as their patron.',
        rivalries: ['Athena', 'Hades'],
    },
]

const Gods = ({ navigation }) => {

    const [godName, setGodName] = useState("");
    const [godDescription, setGodDescription] = useState("");
    const [godRivalries, setGodRivalries] = useState([]);

    const appContext = useContext(Context);

    const getGod = () => {
        let godIndex = appContext.userGod;
        let god = godsList[godIndex];
        setGodName(god.name);
        setGodDescription(god.description);
        setGodRivalries([...god.rivalries]);
    }

    useEffect(() => {
        getGod();
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
        },
        coverImage: {
            maxWidth: 500,
            minWidth: "100%",
            minHeight: "35%",
        },
        text: {
            margin: 10,
        }
    })

    return (
        <View style={styles.container}>
            <Text variant='displayLarge' style={styles.text}>{godName}</Text>
            <Text variant='bodyLarge' style={styles.text}>{godDescription}</Text>
            <Text variant='displaySmall' style={styles.text}>Rivals</Text>
            {godRivalries.map((rivalry, index) => {
                return (
                    <Text variant='headlineSmall' key={index} style={{ margin: 2.5, marginLeft: 10 }}>{rivalry}</Text>
                )
            })}
        </View >
    )
}

export default Gods;