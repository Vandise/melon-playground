
const FRAME_PADDING = 9;
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];
const ANIMATIONS = {
  stand:  { frames: 8, framesPerDirection: false, speed: 0  },
  walk:   { frames: 9, framesPerDirection: true,  speed: 10 },
  attack: { frames: 9, framesPerDirection: true,  speed: 10 },
  death:  { frames: 9, framesPerDirection: true,  speed: 10 },
  hit:    { frames: 8, framesPerDirection: true,  speed: 10 }
};


export default class Player extends me.Entity {

  constructor(x, y, settings) {
    settings.width = 96;
    settings.height = 96;
    settings.image = 'charactersheet';

    super(x,y, settings);
    this.currentHeading = 'north';

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
    window.player = this;

    let currentFrame = 0;
    Object.keys(ANIMATIONS).forEach((animation, i) => {
      const config = ANIMATIONS[animation];
      if (config.framesPerDirection) {
        DIRECTIONS.forEach((direction) => {
          const frames = Array(config.frames).fill().map((_, i) => {
            const frame = currentFrame;
            currentFrame += 1;
            return frame;
          });
          console.log(animation, direction, frames, currentFrame);
          this.renderable.addAnimation(`${animation}_${direction}`, frames);
        });
      } else {
        const frames = Array(config.frames).fill().map((_, i) => {
          const frame = currentFrame;
          currentFrame += 1;
          return frame;
        });
        if (frames.length < FRAME_PADDING) {
          currentFrame += FRAME_PADDING - (frames.length);
        }
        console.log(animation, frames, currentFrame);
        this.renderable.addAnimation(animation, frames);
      }
    });

    this.renderable.setCurrentAnimation('stand');

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
      this.renderable.setAnimationFrame(this.getHeadingOffset(this.currentHeading));
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

  getHeadingOffset(heading) {
    const offset = DIRECTIONS.indexOf(heading);
    return offset > -1 ? offset : 0;
  }

  setCurrentHeading(heading) {
    this.currentHeading = heading;
  }

};