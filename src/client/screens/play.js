import game from '../game';

class PlayScreen extends me.ScreenObject {

  onResetEvent() {
    me.levelDirector.loadLevel('map/area01');
    game.data.score = 0;

    this.HUD = new game.references.containers.HUD.Container();
    me.game.world.addChild(this.HUD);
  }

  onDestroyEvent() {

  }
};

export default PlayScreen;