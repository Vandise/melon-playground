/* state */
export const INITIAL_PLAYER_STATE = {
  currentHeading: 'north',
  isAnimating: false,
  isInteracting: false,
  initializedNPC: null,
  target: null,
  animationResolver: null,
  moving: false,
};

/* movement */
export const FRICTION = 0.4;
export const BODY_VELOCITY_X = 2.5;
export const BODY_VELOCITY_Y = 2.5;

/* animations */
export const FRAME_PADDING = 9;
export const ANIMATION_SPEED = 50;
export const ANIMATIONS = {
  stand:  { frames: 8, framesPerDirection: false, speed: 0  },
  walk:   { frames: 9, framesPerDirection: true,  speed: ANIMATION_SPEED },
  attack: { frames: 9, framesPerDirection: true,  speed: 100 },
  death:  { frames: 9, framesPerDirection: true,  speed: 100 },
  hit:    { frames: 8, framesPerDirection: true,  speed: ANIMATION_SPEED }
};