
const FRAME_PADDING = 9;
const ANIMATION_SPEED = 50;
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];
const ANIMATIONS = {
  stand:  { frames: 8, framesPerDirection: false, speed: 0  },
  walk:   { frames: 9, framesPerDirection: true,  speed: ANIMATION_SPEED },
  attack: { frames: 9, framesPerDirection: true,  speed: 100 },
  death:  { frames: 9, framesPerDirection: true,  speed: 100 },
  hit:    { frames: 8, framesPerDirection: true,  speed: ANIMATION_SPEED }
};


export default class Player extends me.Entity {

  constructor(x, y, settings) {
    settings.width = 96;
    settings.height = 96;
    settings.image = 'charactersheet';

    super(x,y, settings);
    this.currentHeading = 'north';
    this.isAnimating = false;
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);

    this.initializedNPC = null;

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
          if (frames.length < FRAME_PADDING) {
            currentFrame += FRAME_PADDING - (frames.length);
          }
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
        this.renderable.addAnimation(animation, frames, config.speed);
      }
    });

    this.renderable.setCurrentAnimation('stand');

  }

  update(dt) {
    if (me.input.isKeyPressed("space")) {
      this.triggerAnimation('attack', true);
    }
    if (!this.isAnimating && !this.multiDirection()) {

      if (me.input.isKeyPressed("talk")) {
        if (this.initializedNPC) {
          this.initializedNPC.triggerDialog();
        } else {
          console.log('Cannot do that right now.');
        }
      }

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
    }
    this.body.update(dt);

    // TODO: make a check to ensure the NPC registered is within talking range
    //        unregister the NPC if not

    // handle collisions against other shapes
    me.collision.check(this);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0 || this.isAnimating) {
      this._super(me.Entity, "update", [dt]);
      return true;
    }
    return false;
  }

  multiDirection() {
    if (me.input.isKeyPressed("left") && me.input.isKeyPressed("up")) {
      if (!this.renderable.isCurrentAnimation("walk_northwest")) {
        this.setCurrentHeading('northwest');
        this.renderable.setCurrentAnimation("walk_northwest");
      }
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
      return true;
    }
    if (me.input.isKeyPressed("left") && me.input.isKeyPressed("down")) {
      if (!this.renderable.isCurrentAnimation("walk_southwest")) {
        this.setCurrentHeading('southwest');
        this.renderable.setCurrentAnimation("walk_southwest");
      }
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      this.body.vel.y += this.body.accel.y * me.timer.tick;
      return true;
    }
    if (me.input.isKeyPressed("right") && me.input.isKeyPressed("down")) {
      if (!this.renderable.isCurrentAnimation("walk_southeast")) {
        this.setCurrentHeading('southeast');
        this.renderable.setCurrentAnimation("walk_southeast");
      }
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      this.body.vel.y += this.body.accel.y * me.timer.tick;
      return true;
    }
    if (me.input.isKeyPressed("right") && me.input.isKeyPressed("up")) {
      if (!this.renderable.isCurrentAnimation("walk_northeast")) {
        this.setCurrentHeading('northeast');
        this.renderable.setCurrentAnimation("walk_northeast");
      }
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
      return true;
    }
    return false;
  }

  onCollision(res, other) {
    if (other.body.collisionType === me.collision.types.NPC_OBJECT
          && this.initializedNPC != other) {
      console.log("Press 'T' to talk to me!");
      this.initializedNPC = other;
    }
    return true;
  }

  triggerAnimation(animationName, returnFirstFrame, isAnimating = false) {
    const aniDirection = `${animationName}_${this.currentHeading}`;
    if (!this.renderable.isCurrentAnimation(aniDirection)) {
      this.isAnimating = true;
      this.renderable.setCurrentAnimation(aniDirection, () => {
        this.isAnimating = isAnimating;
        return returnFirstFrame;
      });
    }
    return true;
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