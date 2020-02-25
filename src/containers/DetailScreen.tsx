import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import API from '../Services/Api';
import Heroes from '../components/Heroes';
import Chart from '../components/Chart';

const {width, height} = Dimensions.get('screen');

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      loading: true,
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    if (navigation.state.params !== undefined) {
      this.getCharacter(navigation.state.params.character.id);
    }
  }

  getCharacter = id => {
    API.getCharacterById(id, {orderBy: '-onsaleDate'})
      .then(res => {
        this.setState({
          character: res.data.results,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err, loading: false});
      });
  };

  render() {
    const {loading, character, animatedValue} = this.state;
    const {navigation} = this.props;

    if (navigation.state.params === undefined) {
      return (
        <View style={styles.container}>
          <View style={styles.bgImageWrapper}>
            <Image
              source={require('../assets/mbg.jpeg')}
              style={styles.bgImage}
            />
          </View>
          <Text style={styles.welcome}>Please select a Marvel Hero!</Text>
        </View>
      );
    } else {
      const character = navigation.state.params.character;

      return (
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: animatedValue}}},
          ])}>
          <View style={styles.profile}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={styles.image}
                source={{
                  uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                }}
              />
            </View>
            {character.description !== '' && (
              <Text style={styles.description}>{character.description}</Text>
            )}
            <Chart />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profile: {},
  comicContainer: {
    padding: 10,
    alignItems: 'center',
  },
  character: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  description: {
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width,
    height: 450,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 90,
    color: 'white'
  },
});
