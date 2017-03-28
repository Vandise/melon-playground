export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
    //console.log('Player Idle');
    this.player.state.moving = false;
    this.player.setStandingDirection();
    this.player.body.vel.y = 0;
    this.player.body.vel.x = 0;
  }

};
