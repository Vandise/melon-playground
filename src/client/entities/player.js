export default class Player extends me.Entity {

  /* constructed from tiled */
  constructor(x, y, settings) {
    super(x, y, settings);
  }

  update(dt) {
    this.body.update(dt);
    me.collision.check(this);
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }

  onCollision(response, other) {
    // everything is solid
    return true;
  }

};