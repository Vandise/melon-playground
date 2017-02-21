import game from '../game';

class PlayScreen extends me.ScreenObject {

  onResetEvent() {
    this.wanderer = me.pool.pull('Wanderer', 1);
    me.game.world.addChild(this.wanderer, 1);
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);
  }

  onDestroyEvent() {

  }
};

export default PlayScreen;