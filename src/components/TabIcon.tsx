import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

export default class TabIcon extends Component {
  render() {
    const { icon } = this.props;

    return (
      <Image
        source={ icon }
        style={ [ styles.icon ] }
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
});
