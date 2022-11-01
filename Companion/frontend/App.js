import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { io } from "socket.io-client";
const socket = io("ws://localhost:5000");


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.disconnectServer = this.disconnectServer.bind(this);
  }

  componentDidMount() {
    socket.connect()
    socket.on("hello from server", () => {
      console.log("Server says hi")
    });
    console.log("Component mounted")
  }

  disconnectServer(event) {
    console.log("Disconnected")
    event.preventDefault();
    socket.emit("disconnect from server", "No specific reason")
    socket.disconnect()
  }

  render() {

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
        <Button title="Disconnect" onPress={this.disconnectServer} />
      </View>
    );
  }
}
