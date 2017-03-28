import { TRAVEL_POINT_THRESHOLD } from '../../shared/constants';

export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
    const dy = this.player.state.target.y - this.player.pos.y;
    const dx = this.player.state.target.x - this.player.pos.x;
    const angle = Math.atan2(dy, dx);
    const velX = Math.cos(angle);
    const velY = Math.sin(angle);

    const LEVERAGE_RAD = 0.17;
    const absVelX = Math.abs(velX);

    this.player.state.moving = true;

    // idle if within range threshold
    if (dx <= TRAVEL_POINT_THRESHOLD && dx >= -TRAVEL_POINT_THRESHOLD && dy <= TRAVEL_POINT_THRESHOLD && dy >= -TRAVEL_POINT_THRESHOLD) {
      this.player.setStandingDirection();
      this.player.body.vel.y = 0;
      this.player.body.vel.x = 0;
    }

    if (velX <= 0) {

      // absolute south and west
      if (absVelX >= 1 - LEVERAGE_RAD || absVelX <= LEVERAGE_RAD) {
        // south
        if (absVelX < 0.5) {
          if (!this.player.renderable.isCurrentAnimation("walk_south")) {
            console.log("south");
            this.player.setCurrentHeading('south');
            this.player.renderable.setCurrentAnimation("walk_south");
          }
        // west
        } else {
          if (!this.player.renderable.isCurrentAnimation("walk_west")) {
            console.log("west");
            this.player.setCurrentHeading('west');
            this.player.renderable.setCurrentAnimation("walk_west");
          }
        }
      } else {
        // northwest
        if (velY < 0) {
          if (!this.player.renderable.isCurrentAnimation("walk_northwest")) {
            console.log("northwest");
            this.player.setCurrentHeading('northwest');
            this.player.renderable.setCurrentAnimation("walk_northwest");
          }
        // southwest
        } else {
          if (!this.player.renderable.isCurrentAnimation("walk_southwest")) {
            console.log("southwest");
            this.player.setCurrentHeading('southwest');
            this.player.renderable.setCurrentAnimation("walk_southwest");
          }
        }
      }
    } else {
      // absolute north and east
      if (absVelX >= 1 - LEVERAGE_RAD || absVelX <= LEVERAGE_RAD) {
        // north
        if (absVelX < 0.5) {
          if (!this.player.renderable.isCurrentAnimation("walk_north")) {
            console.log("north");
            this.player.setCurrentHeading('north');
            this.player.renderable.setCurrentAnimation("walk_north");
          }
        // east
        } else {
          if (!this.player.renderable.isCurrentAnimation("walk_east")) {
            console.log("east");
            this.player.setCurrentHeading('east');
            this.player.renderable.setCurrentAnimation("walk_east");
          }
        }
      } else {
        // northeast
        if (velY < 0) {
          if (!this.player.renderable.isCurrentAnimation("walk_northeast")) {
            console.log("northeast");
            this.player.setCurrentHeading('northeast');
            this.player.renderable.setCurrentAnimation("walk_northeast");
          }
        // southeast
        } else {
          if (!this.player.renderable.isCurrentAnimation("walk_southeast")) {
            console.log("southeast");
            this.player.setCurrentHeading('southeast');
            this.player.renderable.setCurrentAnimation("walk_southeast");
          }
        }
      }
    }

    this.player.body.vel.x = Math.cos(angle) * this.player.body.accel.x * me.timer.tick;
    this.player.body.vel.y = Math.sin(angle) * this.player.body.accel.y * me.timer.tick;

  }

};