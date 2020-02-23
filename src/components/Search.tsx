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

// create a component

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  cancelSearch = () => {
    this.setState({value: ''}, () => {
      this.props.cancelSearch();
    });
  };
  render() {
    const {onSubmit} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          returnKeyType="done"
          value={this.state.value}
          onChangeText={text => this.setState({value: text})}
          placeholder="Search"
          onSubmitEditing={() => {
            onSubmit(this.state.value);
          }}
        />
        {this.state.value !== '' ? (
          <Button title="Cancel" onPress={this.cancelSearch} />
        ) : null}
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
    width: '80%',
    height: 30,
    backgroundColor: 'white',
    padding: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});
