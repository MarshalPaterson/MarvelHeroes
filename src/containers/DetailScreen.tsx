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
import Chart from '../components/Chart';

const {width, height} = Dimensions.get('screen');

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      character: null,
      loading: true,
      comicsNumber: 0,
      eventsNumber: 0,
      seriesNumber: 0,
      storiesNumber: 0,
    };
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 3000,
    }).start();
  };

  componentDidMount() {
    this._start();
  }

  componentWillReceiveProps() {
    this.state = {
      fadeValue: new Animated.Value(0),
    };
    this._start();
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
    const {animatedValue} = this.state;
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
        <Animated.View
          style={{
            opacity: this.state.fadeValue,
            height: height,
            width: width,
          }}>
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
                <Text style={styles.nameTitle}>
                  {navigation.state.params.character.name}
                </Text>
              </View>
              {character.description !== '' && (
                <Text style={styles.description}>{character.description}</Text>
              )}
              <Text style={styles.nameTitleMain}>
                Character stats have appeared in:
              </Text>
              <Chart
                comicsNumber={
                  navigation.state.params.character.comics.items.length
                }
                eventsNumber={
                  navigation.state.params.character.events.items.length
                }
                seriesNumber={
                  navigation.state.params.character.series.items.length
                }
                storiesNumber={
                  navigation.state.params.character.stories.items.length
                }
              />
            </View>
          </ScrollView>
        </Animated.View>
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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 320,
    color: 'white',
  },
  nameTitle: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  nameTitleMain: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
  },
});
