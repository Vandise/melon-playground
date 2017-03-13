export default class {

  constructor(npc) {
    this.NPC = npc;
    this.player = player;
  }

  execute() {
    console.log("I will kill you!");
    setTimeout(() => {
      this.player.isInteracting = false;
      me.state.change(me.state.BATTLE);
    }, 1000);
  }

};