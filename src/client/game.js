import Player from './entities/player/';
import NPC from './entities/npc/'
import Scene from './entities/scene/'
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
        Scene
      },
      containers: {

      },
    };
    this.instances = {
      screens: {},
      entities: {},
      containers: {},
    };
    this.collisionTypes = {
      SCENE : me.collision.types.USER << 0,
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