import game from '../game';

class ScoreItem extends me.Renderable {

  constructor(x, y) {
    super(x, y, 10, 10);
    this.score = -1;
  }

  update() {
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  }

  draw(context) {

  }

};


class HUD extends me.Container {

  constructor() {
    super();
    this.isPersistent = true;
    this.floating = true;
    this.name = "HUD";
    this.ScoreItem = ScoreItem;

    this.addChild(new this.ScoreItem(5, 5));
  }

};

export default {
  Container: HUD,
  ScoreItem
};