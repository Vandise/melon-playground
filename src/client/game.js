import Player from './entities/player';
import NPC from './entities/npc'
import resources from './resources';

class Game {

  constructor() {
    this.resources = resources;
    this.references = {
      screens: {

      },
      entities: {
        Player,
        NPC,
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