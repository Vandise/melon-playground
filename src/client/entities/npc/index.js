import ActionFactory from './actions/actionFactory';

const FRAME_PADDING = 8;
const DIRECTIONS = ['east', 'north', 'northeast', 'northwest', 'south', 'southeast', 'southwest', 'west'];
const ANIMATIONS = {
  idle: { frames: 8, framesPerDirection: true, speed: 250  },
};

export default class NPC extends me.Entity {

  constructor(x, y, settings) {
    super(x, y, settings);
    this.configs = settings;
    this.body.collisionType = me.collision.types.NPC_OBJECT;
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
          this.renderable.addAnimation(`${animation}_${direction}`, frames);
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
        this.renderable.addAnimation(animation, frames);
      }
    });

    this.renderable.setCurrentAnimation(`idle_${settings.direction}`);

  }

  triggerDefaultNPCAction(player) {
    (new ActionFactory(this, player)).execute();
  }

  update(dt) {
    this.body.update(dt);
    return (this._super(me.Entity, 'update', [dt]));
  }

};