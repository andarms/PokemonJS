import CONFIG from '../config';
import DATA from '../Data';

const DIRECTIONS = ["up", "right", "down", "left"]


class NPC extends Phaser.Sprite {
  constructor(game, x, y, properties) {
    super(game, x, y - 16, properties.sprite);

    this.game.physics.arcade.enable(this);
    // this.body.collideWorldBounds = true;
    this.body.setSize(32, 32, 0, 16);
    this.body.immovable = true;



    this.oldDirection = '';
    this.direction = 'down';
    this.moving = false;
    this.changedTile = true;
    this.speed = 1;
    this.animationSpeed = 8;
    this.currentTile = {
      x: x / CONFIG.TILE_SIZE,
      y: y / CONFIG.TILE_SIZE
    };

    this.timer = 0;
    this.waitTime = Math.random() * (150 - 50) + 50;
    this.lock = false;

    this.animations.add('down', [0, 1, 2, 3], this.animationSpeed, true);
    this.animations.add('left', [4, 5, 6, 7], this.animationSpeed, true);
    this.animations.add('right', [8, 9, 10, 11], this.animationSpeed, true);
    this.animations.add('up', [12, 13, 14, 15], this.animationSpeed, true);
    this.idleFrames = {
      "down": 0,
      "left": 4,
      "right": 8,
      "up": 12
    };

    this.properties = properties;

    if (this.properties.direction) {
      this.direction = this.properties.direction;
      this.frame = this.idleFrames[this.direction];
    }


  }

  release() {
    this.lock = false;
  }

  look(direction) {
    this.direction = direction;
    this.frame = this.idleFrames[this.direction];
    setTimeout(() => {
      this.game.eventEndSignal.dispatch()
    }, 500);
  }

  faceplayer() {
    switch (DATA.player.direction) {
      case 'right':
        this.direction = 'left';
        break;
      case 'left':
        this.direction = 'right';
        break;
      case 'up':
        this.direction = 'down';
        break;
      case 'down':
        this.direction = 'up';
        break;
    }
    this.frame = this.idleFrames[this.direction];
    this.game.eventEndSignal.dispatch();
  }

  lookAround() {
    if (this.lock) return;
    if (this.timer > this.waitTime) {
      let dir = Phaser.ArrayUtils.getRandomItem(DIRECTIONS);
      this.direction = dir;
      this.frame = this.idleFrames[this.direction];
      this.waitTime = Math.random() * (150 - 50) + 50;
      this.timer = 0;
    }
  }

  update() {
    switch (this.properties.movement) {
      case "0":
        break; // No movement
      case "1":
        this.lookAround();
        break;
    }

    this.timer++;
  }

}

export default NPC;
