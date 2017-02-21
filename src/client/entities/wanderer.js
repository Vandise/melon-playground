const DEAFULT_IMAGE = 'badGuy';
const SPRITE_DIMENSIONS = 45;

export default class Wanderer extends me.Entity {

  constructor() {
    super(me.game.viewport.width / 2 - SPRITE_DIMENSIONS / 2, me.game.viewport.height / 2 - SPRITE_DIMENSIONS / 2, {
      image: DEAFULT_IMAGE,
      width: SPRITE_DIMENSIONS,
      height: SPRITE_DIMENSIONS,
    });
    this.body.setVelocity(0, 0);
    this.body.collisionType = me.collision.types.WANDERER;
  }

  update(dt) {
    this.body.update();
    return true;
  }

};