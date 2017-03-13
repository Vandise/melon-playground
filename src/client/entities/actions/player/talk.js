export default class {

  constructor(player) {
    this.player = player;
  }

  execute() {
    // TODO: make a check to ensure the NPC registered is within talking range
    //        unregister the NPC if not
    if (!this.player.isAnimating) {
      if (me.input.isKeyPressed("talk") && !this.player.isInteracting ) {
        if (this.player.initializedNPC) {
          this.player.isInteracting = true;
          this.player.initializedNPC.triggerDefaultNPCAction(this.player);
        } else {
          console.log('Cannot do that right now.');
        }
      }
    }
  }

};
