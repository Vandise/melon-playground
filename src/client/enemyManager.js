import { settings } from './game';

const COLS = 9;
const ROWS = 4;

export default class EnemyManager extends me.Container {

  constructor() {
    super(0, 32,
      (COLS * 64 - 32),
      (ROWS * 64 - 32)
    );
    this.COLS = COLS;
    this.ROWS = ROWS;
    this.vel = 16;
  }

  createEnemies() {
    this.createdEnemies = true
    for (let i = 0; i < this.COLS; i++) {
      for (let j = 0; j < this.ROWS; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }
    this.updateChildBounds();
  }

  onActivateEvent() {
    let _this = this;
    this.timer = me.timer.setInterval(function () {
      let bounds = _this.childBounds;

      if ((_this.vel > 0 && (bounds.right + _this.vel) >= me.game.viewport.width) ||
          (_this.vel < 0 && (bounds.left + _this.vel) <= 0)) {
          _this.vel *= -1;
          _this.pos.y += 16;
          if (_this.vel > 0) {
            _this.vel += 5;
          }
          else {
            _this.vel -= 5;
          }
          settings.PlayScreen.checkIfLoss(bounds.bottom);
        }
        else {
          _this.pos.x += _this.vel;
        }
    }, 1000);
  }

  onDeactivateEvent() {
    me.timer.clearInterval(this.timer);
  }

  removeChildNow(child) {
    this._super(me.Container, "removeChildNow", [child]);
    this.updateChildBounds();
  }

  update(time) {
    if (this.children.length === 0 && this.createdEnemies) {
      settings.PlayScreen.reset();
    }
    this._super(me.Container, "update", [time]);
    this.updateChildBounds();
  }

}