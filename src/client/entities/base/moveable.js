import { DIRECTIONS } from '../shared/constants';

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

};