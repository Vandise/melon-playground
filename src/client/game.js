import Resources from './resources';
import Player from './player';
import Enemy from './enemy';
import EnemyManager from './enemyManager';
import Laser from './Laser';
import PlayScreen from './screens/play';

export const LASER_WIDTH = 5;
export const LASER_HEIGHT = 28;

const playScreen = new PlayScreen();

export const settings = {
  PlayScreen: playScreen,
  Resources,
  Player,
  Enemy,
  EnemyManager,
  Laser
};

export default settings;