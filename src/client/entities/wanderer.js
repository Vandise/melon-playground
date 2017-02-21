const DEAFULT_IMAGE = 'badGuy';
const SPRITE_DIMENSIONS = 45;
const WANDER_SPEED = 0.7;

export default class Wanderer extends me.Entity {

  constructor() {
    super(me.game.viewport.width / 2 - SPRITE_DIMENSIONS / 2, me.game.viewport.height / 2 - SPRITE_DIMENSIONS / 2, {
      image: DEAFULT_IMAGE,
      width: SPRITE_DIMENSIONS,
      height: SPRITE_DIMENSIONS,
    });
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

      // change direction to coord x/y
      this.moveTo(coord.x, coord.y);
      const dx = coord.x - this.pos.x;
      const dy = coord.y - this.pos.y;
      this.rotation = Math.atan2(dy, dx);
      this.body.update(dt);
      return true;
    } else {

      // change direction to heading x/y
      this.moveTo(this.heading.x, this.heading.y);
      const dx = this.heading.x - this.pos.x;
      const dy = this.heading.y - this.pos.y;

      this.rotation = Math.atan2(dy, dx);
      this.body.update(dt);
      return true;
    }

    return false;
  }

  onCollision(response, other) {

  }

  /*

    Wandering Logic

  */

  moveTo(x, y) {
    const playerX = this.pos.x;
    const playerY = this.pos.y;
    const rise = playerX - x;
    const run = playerY - y;
    const distance = Math.sqrt((rise*rise) + (run*run));

    let velX = WANDER_SPEED * (run/distance);
    let velY = WANDER_SPEED * (rise/distance);

    // anywhere on the map decreasing X coordinate (left)
    if (playerX > x) {
      velX = 0 - Math.abs(velX);

    // hit the left boundary move (right)
    } else if (playerX <= SPRITE_DIMENSIONS + 20) {
      velX = Math.abs(velX);

    // hit the right boundary move (left)
    } else if (playerX >= this.worldWidth - (SPRITE_DIMENSIONS + 20)) {
      velX = 0 - Math.abs(velX);
    } else if (playerX < x) {
      velX = Math.abs(velX);
    }

    // anywhere on the map decreasing Y coordinate (up)
    if (playerY > y) {
      velY = 0 - Math.abs(velY);

    // hit the top boundary move (up)
    } else if (playerY <= SPRITE_DIMENSIONS + 20) {
      velY = Math.abs(velY);

    // hit the bottom boundary move (up)
    } else if (playerY >= this.wordHeight - (SPRITE_DIMENSIONS + 20)) {
      velY = 0 - Math.abs(velY);
    } else if (playerY < y){
      velY = Math.abs(velY);
    }

    this.body.vel.x = velX;
    this.body.vel.y = velY;

    console.log("Velocity:", this.body.vel.x, this.body.vel.y);
    console.log("Position:", playerX, playerY);
    console.log("Move: ", x, y, distance, (run/distance), (rise/distance));

  }

  updateHeading() {
    const _self = this;
    const ANGLE = 90 * (Math.PI / 180); // constraint in radians
    const DIST = 200;                   // within 200px of the current position

    _self.currentHeading.x = _self.pos.x + Math.cos(_self.rotation) * DIST;
    _self.currentHeading.y = _self.pos.y + Math.sin(_self.rotation) * DIST;

    // grab an offset angle based on the constraint
    const offset = (Math.floor(Math.random() * ANGLE) -  ANGLE/2);
    const newX = _self.pos.x + Math.cos(_self.rotation + offset) * DIST;
    const newY = _self.pos.y + Math.sin(_self.rotation + offset) * DIST;

    const sanitised = this.outSideWorldBounds(newX, newY);
    _self.heading = {
      x: sanitised.x,
      y: sanitised.y
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
      x : (x < 0)  ? x *= -1 : x,
      y : (y < 0) ? y *= -1 : y
    };
  }

  lerp(first, second, fraction) {
    const dx = first.x + (second.x - first.x) * fraction;
    const dy = first.y + (second.y - first.y) * fraction;
    return {
      x: dx,
      y: dy
    };
  }

};