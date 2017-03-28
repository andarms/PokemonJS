import CONFIG from './config'
import Bootstrap from './States/Bootstrap'

class Game extends Phaser.Game{
  constructor(){
    super(CONFIG.WIDTH, CONFIG.HEIGTH, Phaser.AUTO, null, null, false, false);

    this.state.add('Bootstrap', Bootstrap);

    // allias to the current game object that has control of the keyboard
    this.cgo = null;

    this.state.start('Bootstrap');
  }

  setCgo(gameObject){
    this.cgo = gameObject;
  }

  releaseCgo(){
    this.cgo = null;
  }
}

export default Game;
