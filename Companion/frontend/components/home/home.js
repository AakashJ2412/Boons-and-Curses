import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../../UserContext';
import { StyleSheet, Text, View, Button } from 'react-native';


export const HomeScreen = () => {
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <Button title="Disconnect" onPress={this.disconnectServer} /> */}
    </View>
  );
}