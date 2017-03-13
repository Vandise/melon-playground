export default class {

  constructor(npc, player) {
    this.NPC = npc;
    this.player = player;
  }

  execute() {
    console.log(this.NPC.configs.dialog);
    setTimeout(() => {
      this.player.state.isInteracting = false;
    }, 1000);
  }

};