import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Snackbar, Button, Portal, Dialog, RadioButton, Provider } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Context } from '../../../UserContext';
import { NavigationHelpersContext } from '@react-navigation/native';

const attackCardIds = [
    'ZS1',
    'HP1',
    'AP1',
    'AP2',
    'AT1',
    'AT2', //aegis shield issue
    'HD1',
    'HD3',
    'PS1',
]

const Scan = ({ navigation }) => {

    const [barCodeHasPermission, setBarCodeHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [dialogShow, setDialogShow] = useState(false);
    const [opponents, setOpponents] = useState([
        "Player 1",
        "Player 2",
        "Player 3",
    ]);
    const [selectedOpponent, setSelectedOpponent] = useState("");
    const [alertDialogShow, setAlertDialogShow] = useState(false);
    const appContext = useContext(Context);
    const [cardData, setCardData] = useState();

    useEffect(() => {
        setOpponents([...appContext.opponents]);
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setBarCodeHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        setCardData(data);
        setScanned(true);
        if (attackCardIds.includes(data)) {
            setDialogShow(true);
        }
        else {
            // make call to execute card which don't need to choose opponent
            appContext.socket.emit("playCard", { gameSessionId: appContext.gameId, user: appContext.user, cardId: cardData });
            setAlertDialogShow(true);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    const opponentChosen = () => {
        console.log(selectedOpponent);
        //make call to execute card which requires opponent
        if (cardData === "PS2") {
            opponents.forEach(element => {
                if (element !== appContext.user) {
                    appContext.socket.emit("playCard", { gameSessionId: appContext.gameId, user: appContext.user, opponent: element, cardId: cardData });
                }
            });
        } else {
            appContext.socket.emit("playCard", { gameSessionId: appContext.gameId, user: appContext.user, opponent: selectedOpponent, cardId: cardData });
        }
        setDialogShow(false);
        setAlertDialogShow(true);
    }

    const alertSuccess = () => {
        setAlertDialogShow(false);
        navigation.navigate('Scan Button');
    }

    const hideDialog = () => setDialogShow(false);
    const hideAlertDialog = () => setAlertDialogShow(false);

    return (
        <Provider>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                <Portal>
                    <Dialog visible={dialogShow} onDismiss={hideDialog}>
                        <Dialog.Title>
                            Choose Opponent
                        </Dialog.Title>
                        <Dialog.Content>
                            <ScrollView>
                                {opponents.map((opponent, index) => {
                                    return (
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} key={index}>
                                            <Text variant="labelLarge">
                                                {opponent}
                                            </Text>
                                            <RadioButton
                                                value={opponent}
                                                status={selectedOpponent === opponent ? 'checked' : 'unchecked'}
                                                onPress={() => setSelectedOpponent(opponent)}
                                                style={{ margin: 5 }}
                                            />
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={opponentChosen} disabled={selectedOpponent === ""}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog visible={alertDialogShow} onDismiss={hideAlertDialog}>
                        <Dialog.Title>
                            Success!
                        </Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">
                                The card was recorded
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={alertSuccess}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        </Provider>
    )
}

export default Scan;