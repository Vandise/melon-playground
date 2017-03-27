import game from '../game';
import actionFactory from './actions/player/actionFactory';

// TODO, create a config file to export shared constants (used in initialize)
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];

export default class Player extends me.Entity {

  constructor(x, y, settings) {
    settings.width = 96;
    settings.height = 96;
    settings.image = 'charactersheet';

    super(x,y, settings);
    this.state = {
      currentHeading: 'north',
      isAnimating: false,
      isInteracting: false,
      initializedNPC: null,
      target: null,
    };

    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    this.body.setCollisionMask(me.collision.types.WORLD_SHAPE|game.collisionTypes.SCENE|me.collision.types.NPC_OBJECT);
    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);

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
    this.state.target = {
      y: e.gameLocalY,
      x: e.gameLocalX
    };
  }

  triggerAnimation(animationName, returnFirstFrame, isAnimating = false) {
    const aniDirection = `${animationName}_${this.state.currentHeading}`;
    if (!this.renderable.isCurrentAnimation(aniDirection)) {
      this.state.isAnimating = true;
      this.renderable.setCurrentAnimation(aniDirection, () => {
        this.state.isAnimating = isAnimating;
        return returnFirstFrame;
      });
    }
    return true;
  }

  setStandingDirection(direction = null) {
    this.renderable.setCurrentAnimation("stand");
    this.renderable.setAnimationFrame(this.getHeadingOffset(direction ? direction : this.state.currentHeading));
  }

  getHeadingOffset(heading) {
    const offset = DIRECTIONS.indexOf(heading);
    return offset > -1 ? offset : 0;
  }

  setCurrentHeading(heading) {
    this.state.currentHeading = heading;
  }

  update(dt) {

    if (!this.state.isAnimating) {
      if (me.input.isKeyPressed("move")) {
        this.actions.create('move').execute();
      } else {
        this.actions.create('idle').execute();
      }
    }
    this.actions.create('talk').execute();
    this.actions.create('attack').execute();

    this.body.update(dt);

    me.collision.check(this);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0 || this.state.isAnimating) {
      this._super(me.Entity, "update", [dt]);
      return true;
    }
    return false;
  }

  onCollision(res, other) {
    if (other.body.collisionType === me.collision.types.NPC_OBJECT
          && this.state.initializedNPC != other) {
      console.log("Press 'T' to talk to me!");
      this.state.initializedNPC = other;
      return true;
    }
    if (other.body.collisionType === game.collisionTypes.SCENE) {
      if (!this.state.isInteracting) {
        console.log("trigger scene", other.type);
        other.execute(this);
      }
      return false;
    }
    return true;
  }

};