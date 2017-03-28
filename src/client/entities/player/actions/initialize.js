import { DIRECTIONS } from '../../shared/constants';
import { FRAME_PADDING, ANIMATION_SPEED, ANIMATIONS } from '../config';

export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
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
          this.player.renderable.addAnimation(`${animation}_${direction}`, frames, config.speed);
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
        this.player.renderable.addAnimation(animation, frames, config.speed);
      }
    });
    this.player.renderable.addAnimation('dead', [197], 0);
  }

};
