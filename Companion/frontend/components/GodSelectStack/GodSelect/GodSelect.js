import React, { useEffect, useContext, useState } from 'react';
import { Text, Card, Title, Button } from 'react-native-paper';
import { Context } from '../../../UserContext';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

const godsList = [
    {
        name: 'Zeus',
        description: 'Zeus is the king of the gods and the god of the sky and thunder. He is the son of Cronus and Rhea, the brother of Hades, Poseidon, Hera, Demeter, Hestia, and the father of Ares, Haephaestus',
        rivalries: ['Hades', 'Hephaestus'],
    },
    {
        name: 'Hephestus',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        rivalries: ['Zeus', 'Hephaestus'],
    },
    {
        name: 'Aphrodite',
        description: 'Aphrodite is the goddess of love, beauty, pleasure, and procreation. She is the daughter of Zeus and Dione, the wife of Hephaestus, and the mother of Eros.',
        rivalries: ['Athena', 'Aphrodite'],
    },
    {
        name: 'Athena',
        description: 'Athena is the goodes of war strategy and wisdom',
        rivalries: ['Poseidon', 'Aphrodite'],
    },
    {
        name: 'Hades',
        description: 'Hades is the god of the underworld, the dead, wealth, and fertility. He is the brother of Zeus and Poseidon, the husband of Persephone, and the father of Zagreus.',
        rivalries: ['Zeus', 'Poseidon'],
    },
    {
        name: 'Poseidon',
        description: 'Poseidon is the god of the sea, earthquakes, storms, and horses. He is the brother of Zeus and Hades, the father of Polyphemus, and the husband of Amphitrite.',
        rivalries: ['Athena', 'Hades'],
    },
]

const GodSelect = ({ navigation }) => {
    const appContext = useContext(Context);
    const [gods, setGods] = useState(godsList);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
        card: {
            margin: 10,
        },
    });

    const selectGod = index => {
        appContext.setUserGod(index);
        navigation.navigate('God');
    }

    return (
        <ScrollView >
            <View style={styles.container}>
                {gods.map((god, index) =>
                    <TouchableOpacity key={index} style={{ maxWidth: 350, width: '85%' }} onPress={() => selectGod(index)}>
                        <Card style={styles.card} >
                            <Card.Content>
                                <Title>{god.name}</Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

export default GodSelect;