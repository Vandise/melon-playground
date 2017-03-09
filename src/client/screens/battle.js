import game from '../game';

class BattleScreen extends me.ScreenObject {
  /**
  *  action to perform on state change
  */
  onResetEvent() {
    //me.levelDirector.loadLevel("lab_basic");
    //me.game.world.addChild(new me.ColorLayer("background", "#555", 0), 0);
    this.enemy = new game.references.entities.NPC(400, 200, {
      frameheight: 96,
      framewidth: 96,
      height: 30,
      width: 30,
      battleMode: true,
      image: 'npc-idle',
      direction: 'southwest'
    });
    this.enemy.renderable.scale(1.8);
    this.player = new game.references.entities.Player(200, 270, {
      frameheight: 96,
      framewidth: 96,
      height: 30,
      width: 30,
      battleMode: true
    });
    this.player.renderable.scale(1.8);
    this.player.setCurrentHeading("northeast");
    me.game.world.addChild(this.player, 1);
    me.game.world.addChild(this.enemy, 1);
    this.imageLayer = 
    me.game.world.addChild(new me.ImageLayer(0, 0, {
      image: 'battle_cave'
    }), 0);
    
    //me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0); 
    
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP,    "up");
    me.input.bindKey(me.input.KEY.DOWN,  "down");
    me.input.bindKey(me.input.KEY.SPACE, "space");
    me.input.bindKey(me.input.KEY.T, "talk");
    me.input.bindKey(me.input.KEY.GRAVE_ACCENT, "move");
    me.input.bindPointer(me.input.KEY.GRAVE_ACCENT);
    
  }

  /**
  *  action to perform when leaving this screen (state change)
  */
  onDestroyEvent() {

  }
};

export default BattleScreen;