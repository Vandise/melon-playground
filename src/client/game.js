import PlayScreen from './screens/play';
import Wanderer from './entities/wanderer';
import resources from './resources';

class Game {

  constructor() {
    this.resources = resources;
    this.references = {
      screens: {
        PlayScreen,
      },
      entities: {
        Wanderer,
      },
      containers: {

      },
    };
    this.instances = {
      screens: {},
      entities: {},
      containers: {},
    };
    this.data = {};
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