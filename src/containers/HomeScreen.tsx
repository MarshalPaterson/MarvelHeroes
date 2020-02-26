import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

import API from '../Services/Api';
import Heroes from '../components/Heroes';
import Search from '../components/Search';

const {width, height} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      loading: true,
      data: [],
      error: null,
      firstCharacter: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  componentDidMount() {
    this.getAllCharacters();
    this._start();
  }

  componentWillReceiveProps() {
    this.state = {
      fadeValue: new Animated.Value(0),
    };
    this._start();
  }

  handleToDetailPage = character => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {character: character});
  };

  getAllCharacters = () => {
    API.getCharacters({orderBy: '-modified'})
      .then(response => {
        this.setState({
          loading: false,
          data: response.data.results.slice(),
          firstCharacter: response.data.results[0],
        });
      })
      .catch(err => {
        this.setState({loading: false, error: err});
      });
  };

  handleSearchSubmit = text => {
    API.getCharacters({nameStartsWith: text})
      .then(response => {
        this.setState({loading: false, data: response.data.results.slice()});
      })
      .catch(err => {
        this.setState({loading: false, error: err});
      });
  };

  handleChange = text => {
    const newData = this.state.data.filter(item => {
      let name = item.name;
      const itemData = name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      value: text,
      data: newData,
    });

    if (text == '') {
      this.cancelSearch();
    }
  };

  cancelSearch = () => {
    this.setState({
      loading: true,
      value: '',
      data: [],
    });
    this.getAllCharacters();
  };

  renderHeader = () => {
    return (
      <Search
        value={this.state.value}
        action={this.handleChange}
        onSubmit={this.handleSearchSubmit}
        cancelSearch={this.cancelSearch}
      />
    );
  };

  renderCharacters = () => {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (
          <Heroes character={item} goToDetail={this.handleToDetailPage} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  };

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeValue,
          height: height,
          width: width,
        }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Image
              source={require('../assets/r.png')}
              style={styles.titleImageMain}
            />
            {this.state.loading ? (
              <View>
                <View style={styles.bgImageWrapper}>
                  <Image
                    source={require('../assets/r.png')}
                    style={styles.bgImage}
                  />
                  <Text style={styles.textItem}>Marvel Heroes</Text>
                  <ActivityIndicator style={styles.loaderImg} size="large" />
                </View>
              </View>
            ) : (
              this.renderCharacters()
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#562929',
  },
  textItem: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    top: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
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
    width: width,
    height: height,
  },
  titleImage: {
    width: 165,
    height: 120,
  },
  titleImageMain: {
    width: 165,
    height: 70,
  },
  loaderImg: {
    top: 40,
  },
});

export default HomeScreen;
