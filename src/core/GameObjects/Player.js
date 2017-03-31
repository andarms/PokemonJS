class Player extends Phaser.Sprite{
  constructor(game, gender){
    let sprite = 'trchar00' + gender;
    super(game, 0, 0, sprite);
    
    this.gender = gender;
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
    console.log(`player ${key}`);
  }
}

export default Player;
