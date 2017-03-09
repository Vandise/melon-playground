import game from './client/game';
import PlayScreen from './client/screens/play';
import BattleScreen from './client/screens/battle';

class Bootstrap {

  constructor() {
    // Initialize the video.
    if (!me.video.init(600, 400, {wrapper : "screen", scale: 3.0})) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);
    me.sys.gravity = 0;
    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  }

  loaded() {
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(me.state.BATTLE, new BattleScreen());

    // add our player entity in the entity pool
    Object.keys(game.references.entities).forEach((name) => {
      me.pool.register(name, game.references.entities[name]);
    });
    // me.pool.register("mainPlayer", PlayerEntity);

    // Start the game.
    me.state.change(me.state.PLAY);
  }

  static boot() {
    var bootstrap = new Bootstrap();
    return bootstrap;
  }
}

window.onReady(function onReady() {
    Bootstrap.boot();
});