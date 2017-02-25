export default class NPC extends me.Entity {

  constructor(x, y, settings) {
    super(x, y, settings);
    this.alwaysUpdate = true;
    this.renderable.scale(0.75,0.75);
    this.renderable.anchorPoint.set(0.5, 0.5);
    this.renderable.addAnimation("read", [0, 1, 2, 3], 200);
    this.renderable.addAnimation("write", [0, 1], 200);
    this.renderable.addAnimation("stand", [0], 0);
    this.renderable.setCurrentAnimation("write");
    this.renderable.flipX();
  }

  update(dt) {
    this.body.update(dt);
    return (this._super(me.Entity, 'update', [dt]));
  }

};