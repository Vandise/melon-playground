export default class Player extends me.Entity {

  constructor(x, y, settings) {
    super(x,y, settings);
    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
  }

  update(dt) {
        if (me.input.isKeyPressed("left")) {
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("right")) {
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("up")) {
            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed("down")) {
            // update the entity velocity
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }
        return false;
  }

};