import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Context } from '../../../UserContext';
import { Text, Button, Snackbar } from 'react-native-paper';

const godsList = [
    {
        name: 'Zeus',
        description: 'Zeus is the king of the gods and the god of the sky and thunder. He is the son of Cronus and Rhea, the brother of Hades, Poseidon, Hera, Demeter, Hestia, and the father of Ares, Haephaestus',
        rivalries: ['God 1', 'God 2']
    },
    {
        name: 'Poseidon',
        description: 'Poseidon is the god of the sea, earthquakes, storms, and horses. He is the brother of Zeus and Hades, the father of Polyphemus, and the husband of Amphitrite.',
        rivalries: ['God 1', 'God 2']
    },
    {
        name: 'Hades',
        description: 'Hades is the god of the underworld, the dead, wealth, and fertility. He is the brother of Zeus and Poseidon, the husband of Persephone, and the father of Zagreus.',
        rivalries: ['God 1', 'God 2']
    },
    {
        name: 'Aphrodite',
        description: 'Aphrodite is the goddess of love, beauty, pleasure, and procreation. She is the daughter of Zeus and Dione, the wife of Hephaestus, and the mother of Eros.',
        rivalries: ['God 1', 'God 2']
    },
    {
        name: 'Athena',
        description: 'Athena is the goodes of war strategy and wisdom',
        rivalries: ['God 1', 'God 2']
    },
    {
        name: 'Haephestus',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        rivalries: ['God 1', 'God 2']
    }
]

const Gods = ({ navigation }) => {
    const [godName, setGodName] = useState("");
    const [godDescription, setGodDescription] = useState("");
    const [godImage, setGodImage] = useState('https://picsum.photos/500');
    const [godRivalries, setGodRivalries] = useState([]);
    const [godLoad, setGodLoad] = useState(false);
    const [error, setError] = useState("");

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
        appContext.socket.on("godSelected", (data) => {
            if(data.gameSessionId === appContext.gameId && data.selectVal && data.user === appContext.user) {
                appContext.setGameStatus("started");
            } else {
                setError("Error authenticating session");
                setGodLoad(false);
            }
        })
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            overflow: "scroll",
        },
        coverImage: {
            maxWidth: 500,
            minWidth: "100vw",
            minHeight: "35vh",
        },
        text: {
            margin: 10,
        }
    })

    const start = () => {
        setGodLoad(true);
        appContext.socket.emit("selectGod", {gameSessionId: appContext.gameId, user: appContext.user, selectedGod: appContext.userGod});
    }

    return (
        <View style={styles.container}>
            <Image style={styles.coverImage} source={{ uri: 'https://picsum.photos/500' }} />
            <Text variant='displayLarge' style={styles.text}>{godName}</Text>
            <Text variant='bodyLarge' style={styles.text}>{godDescription}</Text>
            <Text variant='displaySmall' style={styles.text}>Rivals</Text>
            {godRivalries.map((rivalry, index) => {
                return (
                    <Text variant='headlineSmall' key={index} style={{ margin: 2.5, marginLeft: 10 }}>{rivalry}</Text>
                )
            })}
            <Button style={{ margin: 10, alignSelf: 'center', width: 300, position: "absolute", zIndex: 5, marginTop:"85vh" }} mode="contained" disabled={godLoad} onPress={() => start()}>Start</Button>
            <Snackbar visible={error} onDismiss={() => setError("")} action={{ label: 'Dismiss', onPress: () => setError("") }}>
                {error}
            </Snackbar>
        </View >
    )
}

export default Gods;
