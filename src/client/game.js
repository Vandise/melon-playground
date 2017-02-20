import Resources from './resources';
import Player from './player';
import Enemy from './enemy';
import EnemyManager from './enemyManager';
import Laser from './Laser';
import PlayScreen from './screens/play';

export const LASER_WIDTH = 5;
export const LASER_HEIGHT = 28;

class Game {

  constructor() {
    this.PlayScreen = PlayScreen;
    this.Resources = Resources;
    this.Player = Player;
    this.Enemy = Enemy;
    this.EnemyManager = EnemyManager;
    this.Laser = Laser;
  }

};

export default new Game();