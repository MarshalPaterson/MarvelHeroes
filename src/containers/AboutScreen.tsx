import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

type Props = {};
export default class AboutScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image
            source={require('../assets/mbg.jpeg')}
            style={styles.bgImage}
          />
        </View>
        <Text style={styles.welcome}>Welcome to Marvel Heroes</Text>
        <Text style={styles.instructions}>React Native Example</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 90,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
});
