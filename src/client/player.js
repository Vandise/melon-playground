const DEFAULT_PLAYER_IMAGE = 'player';
export default class Player extends me.Sprite{

  constructor() {
    const image = me.loader.getImage(DEFAULT_PLAYER_IMAGE);
    super(me.game.viewport.width / 2 - image.width / 2, me.game.viewport.height - image.height - 20, {
      image
    });
    this.velx = 450;
    this.maxX = me.game.viewport.width - this.width;
  }

  update(time) {
    if (me.input.isKeyPressed("left")) {
      this.pos.x -= this.velx * time / 1000;
    }

    if (me.input.isKeyPressed("right")) {
      this.pos.x += this.velx * time / 1000;
    }

    this.pos.x = this.pos.x.clamp(0, this.maxX);

    return true;
  }

};