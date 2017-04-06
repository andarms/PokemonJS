import CONFIG from '../config';

class NPC extends Phaser.Sprite{
  constructor(game, x, y, properties){
    super(game, x, y-16, properties.sprite);

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
    this.currentTile = {x:x/CONFIG.TILE_SIZE, y:y/CONFIG.TILE_SIZE};

    this.animations.add('down', [0, 1, 2, 3], this.animationSpeed,true);
		this.animations.add('left', [4, 5, 6, 7], this.animationSpeed,true);
		this.animations.add('right', [8, 9, 10, 11], this.animationSpeed,true);
		this.animations.add('up', [12, 13, 14, 15], this.animationSpeed,true);
    this.idleFrames = {
      "down":  0,
      "left":  4,
      "right": 8,
      "up":    12
    };

    this.properties = properties;


  }
}

export default NPC;
