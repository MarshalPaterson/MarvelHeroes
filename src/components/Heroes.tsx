import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Heroes = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.goToDetail(props.character)}>
      <Image
        style={styles.image}
        source={{
          uri: `${props.character.thumbnail.path}.${props.character.thumbnail.extension}`,
        }}
      />
      <Text style={styles.text}>{props.character.name} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 380,
    borderBottomWidth: 3,
    borderColor: 'white',
    backgroundColor: '#000000',
    position: 'relative',
  },
  image: {
    width,
    height: 340,
  },
  text: {
    position: 'absolute',
    left: 10,
    top: 342,
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default Heroes;
