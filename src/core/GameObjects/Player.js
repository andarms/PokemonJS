import CONFIG from '../config';
import {PKMN} from '../main';

class Player extends Phaser.Sprite{
  constructor(game, gender){
    let sprite = 'trchar00' + gender;
    super(game, 0, 0, sprite);

    this.game.physics.arcade.enable(this);
		this.body.collideWorldBounds = true;
    this.body.setSize(32, 32, 0, 16);
    
    this.gender = gender;
    this.moving = false;
    this.speed = 1;
    this.animationSpeed = 8;
    
    
    if(this.gender == 0){
      this.frontSprite = 'introBoy';
    }else{
      this.frontSprite = 'introGirl';
    }

    this.animations.add('down', [0, 1, 2, 3], this.animationSpeed, true);
		this.animations.add('left', [4, 5, 6, 7], this.animationSpeed, true);
		this.animations.add('right', [8, 9, 10, 11], this.animationSpeed, true);
		this.animations.add('up', [12, 13, 14, 15], this.animationSpeed, true);
    this.idleFrames = {
      "down":  0,
      "left":  4,
      "right": 8,
      "up":    12
    };


  }

  onkeydown(key){        
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER && !this.moving){
      PKMN.start(this);
      PKMN.msgbox("hello world, mi name is [PLAYER]");
      PKMN.release(this);
      PKMN.end();
      
    }
  }

  setMapPosition(x, y){
    this.x = CONFIG.TILE_SIZE * x;
    this.y = CONFIG.TILE_SIZE * y - 16;
    this.targetX = this.x;
    this.targetY = this.y;
  }

  update(){
    if(!this.moving && this.game.cgo == this){
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.targetX += CONFIG.TILE_SIZE;
        this.animations.play("right");
        this.moving = true;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.targetX -= CONFIG.TILE_SIZE;
        this.animations.play("left");
        this.moving = true;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        this.targetY += CONFIG.TILE_SIZE;
        this.animations.play("down");
        this.moving = true;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.targetY -= CONFIG.TILE_SIZE;
        this.animations.play("up");
        this.moving = true;
      }
    }

    if(this.targetX > this.x) this.x += this.speed;
    if(this.targetX < this.x) this.x -= this.speed;
    if(this.targetY > this.y) this.y += this.speed;
    if(this.targetY < this.y) this.y -= this.speed;

    if(this.targetX == this.x && this.targetY == this.y){
      this.moving = false;
    }
  }

}

export default Player;
