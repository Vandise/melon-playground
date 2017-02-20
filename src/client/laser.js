import { LASER_WIDTH, LASER_HEIGHT } from './game';

const Bullet = class extends me.Renderable {

  constructor() {
    super(0, 0, LASER_WIDTH, LASER_HEIGHT);
  }

  destroy() {
    
  }

  draw(renderer) {
    const color = renderer.getColor();
    renderer.setColor('#5EFF7E');
    renderer.fillRect(0, 0, this.width, this.height);
    renderer.setColor(color);    
  }

};

export default class Laser extends me.Entity {

  constructor(x, y) {
    super(x, y, {
      width: LASER_WIDTH,
      height: LASER_HEIGHT
    });
    this.z = 5;
    this.body.setVelocity(0, 300);
    this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
    this.renderable = new Bullet();
    this.alwaysUpdate = true;
  }

  update(time) {
    this.body.vel.y -= this.body.accel.y * time / 1000;
    if (this.pos.y + this.height <= 0) {
      me.game.world.removeChild(this);
    }
    
    this.body.update();
    me.collision.check(this);
    
    return true;
  }

};