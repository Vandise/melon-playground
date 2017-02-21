export default class EnemyEntity extends me.Entity {

  constructor(x, y, settings) {
    const width = settings.width;
    const height = settings.height;
    settings.image = 'wheelie_right';
    settings.framewidth = settings.width = 64;
    settings.frameheight = settings.height = 64;

    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

    super(x, y, settings);

    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.framewidth;
    this.pos.x  = x + width - settings.framewidth;
    this.walkLeft = false;

    this.body.setVelocity(4, 6);

  }

  update(dt) {
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      }
      else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }

      this.renderable.flipX(this.walkLeft);
      this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
    }
    else {
      this.body.vel.x = 0;
    }

    this.body.update(dt);

    me.collision.check(this);

    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }

  onCollision(response, other) {
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
        this.renderable.flicker(750);
      }
      return false;
    }
    return true;
  }
};