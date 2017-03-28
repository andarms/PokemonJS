class Player extends Phaser.Sprite{
  constructor(game, gender){
    let sprite = 'trchar00' + gender;
    super(game, 0, 0, sprite);
  }

  onkeydown(key){
  }

  onkeyup(key){
    console.log(`player ${key}`);
  }
}

export default Player;
