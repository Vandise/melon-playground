import Animateable from '../base/animateable';
import Moveable from '../base/moveable';
import game from '../../game';
import actionFactory from './actions/actionFactory';
import { INITIAL_PLAYER_STATE, BODY_VELOCITY_X, BODY_VELOCITY_Y, FRICTION } from './config';

export default class Player extends Moveable(Animateable) {

  constructor(x, y, settings) {
    settings.width = 96;
    settings.height = 96;
    settings.image = 'charactersheet';

    super(x,y, settings);
    this.state = INITIAL_PLAYER_STATE;

    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    this.body.setCollisionMask(me.collision.types.WORLD_SHAPE|game.collisionTypes.SCENE|me.collision.types.NPC_OBJECT);
    this.body.setVelocity(BODY_VELOCITY_X, BODY_VELOCITY_Y);
    this.body.setFriction(FRICTION, FRICTION);

    this.actions = new actionFactory(this);
    this.actions.create('initialize').execute();

    if(!settings.battleMode) {
      me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
    }

    window.player = this;

    this.renderable.setCurrentAnimation('stand');
    me.input.registerPointerEvent('pointermove', me.game.viewport, this.setTarget.bind(this));
  }

  update(dt) {

    if (!this.state.isAnimating) {
      if (me.input.isKeyPressed("move")) {
        this.actions.create('move').execute();
      } else {
        this.actions.create('idle').execute();
      }
    } else {
      if (this.state.moving && !this.withinMovementThreshold()) {
        this.actions.create('move').execute();
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