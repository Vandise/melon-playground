import actionFactory from './actions/player/actionFactory';

// TODO, create a config file to export shared constants (used in initialize)
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];

export default class Player extends me.Entity {

  constructor(x, y, settings) {
    settings.width = 96;
    settings.height = 96;
    settings.image = 'charactersheet';

    super(x,y, settings);
    this.currentHeading = 'north';
    this.isAnimating = false;
    this.isInteracting = false;
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);

    this.initializedNPC = null;
    this.target = null;

    this.actions = new actionFactory(this);
    this.actions.create('initialize').execute();

    if(!settings.battleMode) {
      me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
    }

    window.player = this;

    this.renderable.setCurrentAnimation('stand');
    me.input.registerPointerEvent('pointermove', me.game.viewport, this.setTarget.bind(this));
  }

  setTarget(e) {
    this.target = {
      y: e.gameLocalY,
      x: e.gameLocalX
    };
  }

  characterActions() {

    if (me.input.isKeyPressed("space")) {
      this.triggerAnimation('attack', true);
    }

    // TODO: make a check to ensure the NPC registered is within talking range
    //        unregister the NPC if not

    if (!this.isAnimating) {
      if (me.input.isKeyPressed("talk") && !this.isInteracting ) {
        if (this.initializedNPC) {
          this.isInteracting = true;
          this.initializedNPC.triggerDefaultNPCAction(this);
        } else {
          console.log('Cannot do that right now.');
        }
      }
    }

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

  update(dt) {
    this.characterActions();
    if (!this.isAnimating && me.input.isKeyPressed("move")) {
      this.actions.create('move').execute();
    } else {
      this.actions.create('idle').execute();
    }
    this.body.update(dt);

    me.collision.check(this);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0 || this.isAnimating) {
      this._super(me.Entity, "update", [dt]);
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

};