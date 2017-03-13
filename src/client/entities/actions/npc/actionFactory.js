import attack from './attack';
import talk from './talk';

const ACTIONS = {
  attack,
  talk,
};

export default class {

  constructor(npc, player) {
    this.NPC = npc;
    this.player = player;
  }

  execute() {
    console.log(this.NPC.configs.default_action);
    if (Object.keys(ACTIONS).indexOf(this.NPC.configs.default_action) > -1) {
      const klass = ACTIONS[this.NPC.configs.default_action];
      (new klass(this.NPC, this.player)).execute();
      return true;
    }
    return false;
  }

};