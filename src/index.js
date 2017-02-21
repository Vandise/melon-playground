import game from './client/game';
import PlayScreen from './client/screens/play';

class Bootstrap {

  constructor() {
    // Initialize the video.
    if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto"})) {
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

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  }

  loaded() {
    me.state.set(me.state.PLAY, game.getScreenInstance('PlayScreen'));

    // add all out entities
    Object.keys(game.references.entities).forEach((name) => {
      me.pool.register(name, game.references.entities[name]);
    });

    // Start the game.
    me.state.change(me.state.PLAY);
  }

  static boot() {
    const bootstrap = new Bootstrap();

    // Mobile browser hacks
    if (me.device.isMobile && !navigator.isCocoonJS) {
      // Prevent the webview from moving on a swipe
      window.document.addEventListener("touchmove", function (e) {
      e.preventDefault();
      window.scroll(0, 0);
      return false;
      }, false);

      // Scroll away mobile GUI
      (function () {
        window.scrollTo(0, 1);
        me.video.onresize(null);
      }).defer();

      me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
        window.scrollTo(0, 1);
      });
    }

    return bootstrap;
  }
}

window.onReady(function onReady() {
    Bootstrap.boot();
});