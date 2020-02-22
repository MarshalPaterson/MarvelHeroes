import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
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
      error: null,
    };
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
        this.setState({loading: false});
        Store.setCharacters(response.data.results);
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

  renderHeader = () => {
    return (
      <Search
        onSubmit={this.handleSearchSubmit}
        cancelSearch={() => this.getAllCharacters()}
      />
    );
  };

  renderCharacters = () => {
    return (
      <FlatList
        data={Store.characters.slice()}
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
      <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator /> : this.renderCharacters()}
      </View>
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
