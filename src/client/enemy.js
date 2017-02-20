const DEFAULT_ENEMY_IMAGE = 'ships';
const WIDTH_HEIGHT = 32;

export default class Enemy extends me.Entity {

  constructor(x, y) {
    const image = me.loader.getImage(DEFAULT_ENEMY_IMAGE);
    super(x, y, {
      image,
      width: WIDTH_HEIGHT,
      height: WIDTH_HEIGHT
    });
    this.body.setVelocity(0, 0);
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    this.chooseShipImage();
  }

  chooseShipImage() {
    const frame = ~~(Math.random() * 3);
    this.renderable.addAnimation("idle", [frame], 1);
    this.renderable.setCurrentAnimation("idle");
  }

  update(dt) {
    this._super(me.Entity, "update", [dt]);
    this.body.update();
    return true;
  }

};