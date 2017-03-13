export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
    if (me.input.isKeyPressed("space")) {
      this.player.triggerAnimation('attack', true);
      return true;
    }
    return false;
  }

};
