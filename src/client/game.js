import resources from './resources';
import PlayScreen from './screens/play';
import TitleScreen from './screens/title';

class Game {

  constructor() {
    this.resources = resources;
    this.references = {
      screens: {
        PlayScreen,
        TitleScreen,
      },
      entities: {},
    };
    this.instances = {
      screens: {},
      entities: {},
    };
    this.gameProperties = {
      score: 0,
    };
  }

  getScreenInstance(instanceName) {
    const instance = this.instances.screens[instanceName];
    if (!instance) {
      this.instances.screens[instanceName] = new this.references.screens[instanceName]();
    }
    return this.instances.screens[instanceName];
  }

};

const game = new Game();

export default game;