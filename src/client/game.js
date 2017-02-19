import Resources from './resources';
import Player from './player';
import Enemy from './enemy';
import PlayScreen from './screens/play';

class Game {
  constructor() {
    this.PlayScreen = PlayScreen;
    this.Resources = Resources;
    this.Player = Player;
    this.Enemy = Enemy;
  }
};

export default new Game();