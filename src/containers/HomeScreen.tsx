import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import {observer} from 'mobx-react';

import API from '../Services/Api';
import Heroes from '../components/Heroes';
import Search from '../components/Search';
import Store from '../stores/Store';

// create a component
@observer
class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
      error: null,
      firstCharacter: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAllCharacters();
  }

  handleToDetailPage = character => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {character: character});
  };

  getAllCharacters = () => {
    API.getCharacters({orderBy: '-modified'})
      .then(response => {
        Store.setCharacters(response.data.results);
        this.setState({loading: false, data: Store.characters.slice(), firstCharacter:response.data.results[0]});
      })
      .catch(err => {
        this.setState({loading: false, error: err});
      });
  };

  handleSearchSubmit = text => {
    API.getCharacters({nameStartsWith: text})
      .then(response => {
        this.setState({loading: false});
        Store.setCharacters(response.data.results);
      })
      .catch(err => {
        this.setState({loading: false, error: err});
      });
  };

  handleChange = text => {
    // print(this.state.data)
    const newData = Store.characters.filter(item => {
      let name = item.name;
      const itemData = name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      value: text,
      data: newData,
    });
    
    if text == '' {
      this.cancelSearch()
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
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <Image
            source={require('../assets/ml.png')} style={styles.titleImage}
          />
          {this.state.loading ? 
          <View>
            <View style={styles.bgImageWrapper}>
              <Image
                source={require('../assets/mbg.jpeg')}
                style={styles.bgImage}
              />
              <Text style={styles.textItem}>Marvel Heroes</Text>
              <ActivityIndicator size='large' />
            </View>
            
          </View> : this.renderCharacters()}
        </View>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textItem: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    top: 20
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
    width: null,
    height: null,
  },
  titleImage: {
    width: 105,
    height: 59
  }
});

export default HomeScreen;
