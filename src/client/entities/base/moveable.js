import { DIRECTIONS } from '../shared/constants';
import { TRAVEL_POINT_THRESHOLD, ANIMATION_RESOLVE_INTERVAL } from '../shared/constants';

export default (Base) => class extends Base {

  constructor(x, y, settings) {
    super(x, y, settings);
  }

  setTarget(e) {
    this.state.target = {
      y: e.gameLocalY,
      x: e.gameLocalX
    };
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

  moveTo(gameLocalX, gameLocalY) {
    this.setTarget({ gameLocalX, gameLocalY });
    this.state.isAnimating = true;
    this.setAnimationResolver((resolve) => {
      const timer = setInterval(() => {
        if (this.withinMovementThreshold()) {
          clearInterval(timer);
          this.state.isAnimating = false;
          resolve({ target: this.state.target, pos: this.pos });
        }
      }, ANIMATION_RESOLVE_INTERVAL);
    });
    this.actions.create('move').execute();
  }

  withinMovementThreshold() {
    if (this.state.target && this.state.target.x && this.state.target.y && this.pos) {
      const dy = this.state.target.y - this.pos.y;
      const dx = this.state.target.x - this.pos.x;
      return (
        dx <= TRAVEL_POINT_THRESHOLD  && 
        dx >= -TRAVEL_POINT_THRESHOLD && 
        dy <= TRAVEL_POINT_THRESHOLD  && 
        dy >= -TRAVEL_POINT_THRESHOLD
      );
    }
    return true;
  }

};