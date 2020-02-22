import {observable, computed, action} from 'mobx';

class Store {
  @observable characters = observable.array();

  @action setCharacters(characters) {
    const newCharacters = characters.map(character => {
      return {
        ...character,
        isFavourited: false,
      };
    });
    this.characters.replace(newCharacters);
  }
}

const storeSingleton = new Store();
export default storeSingleton;
