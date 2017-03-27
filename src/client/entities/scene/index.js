import game from '../../game';

export default class Scene extends me.Entity {
  constructor(x, y, settings) {
    super(x, y, settings);
    this.configs = settings;
    this.body.collisionType = game.collisionTypes.SCENE;
  }

  execute(player) {
    player.state.isInteracting = true;
    console.log(this.configs.dialog);
    me.game.world.removeChild(this);
    player.state.isInteracting = false;
  }

}