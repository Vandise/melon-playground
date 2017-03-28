export default class Animateable extends me.Entity {

  constructor(x, y, settings) {
    super(x,y, settings);
  }

  setAnimationResolver(callback) {
    this.state.animationResolver = new Promise(callback);
  }

  triggerAnimation(animationName, returnFirstFrame, isAnimating = false) {
    const aniDirection = `${animationName}_${this.state.currentHeading}`;
    if (!this.renderable.isCurrentAnimation(aniDirection)) {
      this.state.isAnimating = true;
      this.renderable.setCurrentAnimation(aniDirection, (() => {
        this.state.isAnimating = isAnimating;
        return returnFirstFrame;
      }).bind(this));
    }
  }

};