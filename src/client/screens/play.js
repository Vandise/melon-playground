import game from '../game';

class PlayScreen extends me.ScreenObject {
  /**
  *  action to perform on state change
  */
  onResetEvent() {
    //lab_welcome
    me.levelDirector.loadLevel("lab_basic");
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP,    "up");
    me.input.bindKey(me.input.KEY.DOWN,  "down");
    me.input.bindKey(me.input.KEY.SPACE, "space");
    me.input.bindKey(me.input.KEY.T, "talk");
  }

  /**
  *  action to perform when leaving this screen (state change)
  */
  onDestroyEvent() {

  }
};

export default PlayScreen;