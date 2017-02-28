
const FRAME_PADDING = 9;
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];
const ANIMATIONS = {
  stand:  { frames: 8, framesPerDirection: false, speed: 0  },
  walk:   { frames: 9, framesPerDirection: true,  speed: 250 },
  attack: { frames: 9, framesPerDirection: true,  speed: 250 },
  death:  { frames: 9, framesPerDirection: true,  speed: 250 },
  hit:    { frames: 8, framesPerDirection: true,  speed: 250 }
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
    /*
    if (me.input.isKeyPressed("left") && me.input.isKeyPressed("up")) {
      if (!this.renderable.isCurrentAnimation("walk_northwest")) {
        this.setCurrentHeading('northwest');
        this.renderable.setCurrentAnimation("walk_northwest");
      }
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
    }
    */

    if (me.input.isKeyPressed("left")) {
      if (!this.renderable.isCurrentAnimation("walk_west")) {
        this.setCurrentHeading('west');
        this.renderable.setCurrentAnimation("walk_west");
      }
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
    } else if (me.input.isKeyPressed("right")) {
      if (!this.renderable.isCurrentAnimation("walk_east")) {
        this.setCurrentHeading('east');
        this.renderable.setCurrentAnimation("walk_east");
      }
      this.body.vel.x += this.body.accel.x * me.timer.tick;
    } else if (me.input.isKeyPressed("up")) {
      if (!this.renderable.isCurrentAnimation("walk_north")) {
        this.setCurrentHeading('north');
        this.renderable.setCurrentAnimation("walk_north");
      }
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
    } else if (me.input.isKeyPressed("down")) {
      if (!this.renderable.isCurrentAnimation("walk_south")) {
        this.setCurrentHeading('south');
        this.renderable.setCurrentAnimation("walk_south");
      }
      this.body.vel.y += this.body.accel.y * me.timer.tick;
    } else {
      this.setStandingDirection();
      this.body.vel.y = 0;
      this.body.vel.x = 0;
    }

    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      this._super(me.Entity, "update", [dt]);
      return true;
    }
    return false;
  }

  setStandingDirection(direction = null) {
    this.renderable.setCurrentAnimation("stand");
    this.renderable.setAnimationFrame(this.getHeadingOffset(direction ? direction : this.currentHeading));
  }

  getHeadingOffset(heading) {
    const offset = DIRECTIONS.indexOf(heading);
    return offset > -1 ? offset : 0;
  }

  setCurrentHeading(heading) {
    this.currentHeading = heading;
  }

};