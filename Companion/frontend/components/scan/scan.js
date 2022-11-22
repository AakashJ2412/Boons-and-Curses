import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../../UserContext';
import { StyleSheet, Text, View, Button } from 'react-native';

export const CameraScan = () => {
    
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
      <Text>This be camera screen.</Text>
      <StatusBar style="auto" />
      {/* <Button title="Disconnect" onPress={this.disconnectServer} /> */}
    </View>
  );
}