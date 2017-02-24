const DEAFULT_IMAGE = 'badGuy';
const SPRITE_DIMENSIONS = 45;
const WANDER_SPEED = 0.5;

export default class Wanderer extends me.Entity {

  constructor() {
    super(me.game.viewport.width / 2 - SPRITE_DIMENSIONS / 2, me.game.viewport.height / 2 - SPRITE_DIMENSIONS / 2, {
      image: DEAFULT_IMAGE,
      width: SPRITE_DIMENSIONS,
      height: SPRITE_DIMENSIONS,
    });
    this.movingToPosition = false;
    this.body.gravity = 0;
    this.body.collisionType = me.collision.types.WANDERER;

    this.movementStack = new Array();
    this.rotation = 0;
    this.heading = {
      x: 0,
      y: 0,
    };
    this.currentHeading = {
      x: 0,
      y: 0,
    };
    this.worldWidth = me.game.viewport.width;
    this.worldHeight = me.game.viewport.height;
    window.wanderer = this;
  }

  update(dt) {

    if(Math.floor(Math.random() * 20) === 0) {
      this.updateHeading();
    }

    let coord = null;
    if (coord = this.movementStack.pop()) {
      this.moveToXY(coord.x, coord.y);
    } else {
      this.moveToXY(this.currentHeading.x, this.currentHeading.y);
    }

    this.body.update(dt);
    return true;
  }

  /*

    Wandering Logic

  */

  moveToXY(x, y) {
    const speed = 1;
    const angle = Math.atan2(y - this.pos.y, x - this.pos.x);

    this.body.vel.x = Math.cos(angle) * speed;
    this.body.vel.y = Math.sin(angle) * speed;

    this.movingToPosition = true;

  }

  distanceToXY(x, y) {
    const dx = this.pos.x - x;
    const dy = this.pos.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateHeading() {
    const _self = this;
    const ANGLE = 90 * (Math.PI / 180); // constraint in radians
    const DIST = 150;                   // within 200px of the current position

    _self.currentHeading.x = _self.pos.x + Math.cos(_self.rotation) * DIST;
    _self.currentHeading.y = _self.pos.y + Math.sin(_self.rotation) * DIST;

    // grab an offset angle based on the constraint
    const offset = (Math.floor(Math.random() * ANGLE) -  ANGLE/2);
    const newX = _self.pos.x + Math.cos(_self.rotation + offset) * DIST;
    const newY = _self.pos.y + Math.sin(_self.rotation + offset) * DIST;

    const sanitised = this.outSideWorldBounds(newX, newY);
    _self.heading = {
      x: sanitised.x,
      y: sanitised.y,
    };
    _self.movementStack = [];

    for(let i = 1; i <= 60; i++) {
      _self.movementStack.push(
        _self.lerp(_self.heading, _self.currentHeading, i/60)
      );
    }

  }

  outSideWorldBounds(x, y) {
    return {
      x : (x < 0 || x > this.worldWidth -  (SPRITE_DIMENSIONS + 20)) ? x *= -1 : x,
      y : (y < 0 || y > this.worldHeight - (SPRITE_DIMENSIONS + 20)) ? y *= -1 : y
    };
  }

  lerp(first, second, fraction) {
    const dx = first.x + (second.x - first.x) * fraction;
    const dy = first.y + (second.y - first.y) * fraction;
    return {
      x: dx,
      y: dy,
    };
  }

};