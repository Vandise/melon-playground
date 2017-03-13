const FRAME_PADDING = 9;
const ANIMATION_SPEED = 50;
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];
const ANIMATIONS = {
  stand:  { frames: 8, framesPerDirection: false, speed: 0  },
  walk:   { frames: 9, framesPerDirection: true,  speed: ANIMATION_SPEED },
  attack: { frames: 9, framesPerDirection: true,  speed: 100 },
  death:  { frames: 9, framesPerDirection: true,  speed: 100 },
  hit:    { frames: 8, framesPerDirection: true,  speed: ANIMATION_SPEED }
};

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
  }

};
