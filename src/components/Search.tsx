import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class Search extends Component {
  constructor() {
    super();
  }

  cancelSearch = () => {
    this.setState({value: ''}, () => {
      this.props.cancelSearch();
    });
  };

  render() {
    const {onSubmit} = this.props;
    const {onChange} = this.props;
    const {cancelSearch} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          returnKeyType="done"
          value={this.props.value}
          onChangeText={this.props.action}
          placeholder="Search"
          onSubmitEditing={() => {
            onSubmit(this.props.value);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width,
    backgroundColor: 'black',
    padding: 5,
    flexDirection: 'row',
  },
  input: {
    width: '99%',
    height: 30,
    backgroundColor: 'white',
    padding: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});
