import CONFIG from './config';
import Bootstrap from './States/Bootstrap';
import Intro from './States/Intro';
import Preload from './States/Preload';

class Game extends Phaser.Game{
  constructor(){
    super(CONFIG.WIDTH, CONFIG.HEIGTH, Phaser.AUTO, null, null, false, false);

    this.state.add('Bootstrap', Bootstrap);
    this.state.add('Intro', Intro);
    this.state.add('Preload', Preload);

    // alias to the current game object that has control of the keyboard
    this.cgo = null;

    this.eventEndSignal = new Phaser.Signal();
    this.eventQueue = [];

    this.state.start('Bootstrap');
  }

  setCgo(gameObject){
    this.cgo = gameObject;
    console.log(gameObject)
  }

  releaseCgo(){
    this.cgo = null;
  }
}

export default Game;
