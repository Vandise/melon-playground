import game from '../game';

class PlayScreen extends me.ScreenObject {
  /**
  *  action to perform on state change
  */
  onResetEvent() {
    me.game.world.addChild(new me.ColorLayer("background", "#ff0000", 0), 0);        
  }
  
  /**
  *  action to perform when leaving this screen (state change)
  */
  onDestroyEvent() {
    
  }
};

export default PlayScreen;