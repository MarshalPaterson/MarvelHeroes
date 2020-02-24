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
import TheChart from '../components/TheChart';

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
    this.getCharacter(navigation.state.params.character.id);
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

  // renderCcharacter = () => {
  //   const {character} = this.state;
  //   return character.map((comic, i) => {
  //     return <Heroes key={i} comic={comic} />;
  //   });
  // };

  render() {
    const {loading, character, animatedValue} = this.state;
    const {navigation} = this.props;
    const character = navigation.state.params.character;
    console.log('character', character);

    // const collapseInterpolate = this.state.animatedValue.interpolate({
    //   inputRange: [0, 400],
    //   outputRange: [450, 0],
    //   extrapolate: 'clamp',
    // });

    // const opacityInterpolate = this.state.animatedValue.interpolate({
    //   inputRange: [0, 300],
    //   outputRange: [1, 0],
    //   extrapolate: 'clamp',
    // });

    // const widthInterpolate = this.state.animatedValue.interpolate({
    //   inputRange: [0, 300],
    //   outputRange: [width, 0],
    //   extrapolate: 'clamp',
    // });

    // const imageStyle = {
    //   height: collapseInterpolate,
    //   width: widthInterpolate,
    //   opacity: opacityInterpolate,
    // };
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
          <TheChart />
        </View>
      </ScrollView>
    );
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
});
