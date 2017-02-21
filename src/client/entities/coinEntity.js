export default class CoinEntity extends me.CollectableEntity {

  constructor(x, y, settings) {
    super(x, y, settings);
  }

  onCollision(response, other) {
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    me.game.world.removeChild(this);
    return false;
  }

};