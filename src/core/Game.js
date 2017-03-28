import CONFIG from './config'
class Game extends Phaser.Game{
  constructor(){
    super(CONFIG.width, CONFIG.heigth, Phaser.AUTO, null, null, false, false);
  }
}

export default Game;
