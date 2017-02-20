import Game from '../game';

class PlayScreen extends me.ScreenObject {

  onResetEvent() {
    this.player = me.pool.pull("player");
    me.game.world.addChild(this.player, 1);
    //me.game.world.addChild(me.pool.pull("enemy", 50, 50), 2);
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);  

    this.enemyManager = new Game.EnemyManager();
    this.enemyManager.createEnemies();
    me.game.world.addChild(this.enemyManager, 2);

    /* key bindings */
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.A, "left");
    me.input.bindKey(me.input.KEY.D, "right");
    me.input.bindKey(me.input.KEY.SPACE, "shoot", true);

  }

  onDestroyEvent() {
    /* remove key bindings on state change */
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.SPACE); 
  }

  checkIfLoss(y) {
    if (y >= this.player.pos.y) {
      this.reset();
    }
  }

};

export default PlayScreen;