import game from '../game';

class PlayScreen extends me.ScreenObject {

  onResetEvent() {
    me.game.world.addChild(new me.ColorLayer("background", "#ff0000", 0), 0);        
  }

  onDestroyEvent() {

  }
};

export default PlayScreen;