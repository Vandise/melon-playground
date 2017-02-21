import resources from './resources';
import PlayScreen from './screens/play';
import TitleScreen from './screens/title';
import HUD from './containers/hud';
import Player from './entities/player';
import CoinEntity from './entities/coinEntity';
import EnemyEntity from './entities/enemyEntity';

class Game {

  constructor() {
    this.resources = resources;
    this.references = {
      screens: {
        PlayScreen,
        TitleScreen,
      },
      entities: {
        Player,
        CoinEntity,
        EnemyEntity
      },
      containers: {
        HUD,
      },
    };
    this.instances = {
      screens: {},
      entities: {},
      containers: {},
    };
    this.data = {
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