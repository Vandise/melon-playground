import move from './move';
import idle from './idle';
import initialize from './initialize';

const ACTIONS = {
  move,
  idle,
  initialize,
};

export default class {

  constructor(player) {
    this.player = player;
  }

  create(actionName) {
    if (Object.keys(ACTIONS).indexOf(actionName) > -1) {
      const klass = ACTIONS[actionName];
      return (new klass(this.player));
    }
    return false;
  }

};