class PlayScreen extends me.ScreenObject {

  onResetEvent() {
    me.game.world.addChild(me.pool.pull("player"));
    me.game.world.addChild(me.pool.pull("enemy", 50, 50), 2);
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);  

    /* key bindings */
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.A, "left");
    me.input.bindKey(me.input.KEY.D, "right");
      
  }

  onDestroyEvent() {
    /* remove key bindings on state change */
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);    
  }

};

export default PlayScreen;