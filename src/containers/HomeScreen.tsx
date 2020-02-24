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
        this.setState({loading: false, data: Store.characters.slice()});
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
    //this.state.data\/////      onChange={this.handleChange}
  }

  cancelSearch = () => {
    this.setState({
      value: '',
      data: [],
    });
    this.getAllCharacters()
  }

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
          {this.state.loading ? <ActivityIndicator /> : this.renderCharacters()}
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
    backgroundColor: '#FfFfFf',
  },
});

export default HomeScreen;
