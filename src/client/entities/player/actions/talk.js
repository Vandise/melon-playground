export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
    // TODO: make a check to ensure the NPC registered is within talking range
    //        unregister the NPC if not
    if (!this.player.state.isAnimating) {
      if (me.input.isKeyPressed("talk") && !this.player.state.isInteracting ) {
        if (this.player.state.initializedNPC) {
          this.player.state.isInteracting = true;
          this.player.state.initializedNPC.triggerDefaultNPCAction(this.player);
        } else {
          console.log('Cannot do that right now.');
        }
      }
    }
  }

};
