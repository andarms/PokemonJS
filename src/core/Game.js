import CONFIG    from './config';
import Bootstrap from './States/Bootstrap';
import Intro     from './States/Intro';
import Overworld from './States/Overworld';
import Preload   from './States/Preload';

class Game extends Phaser.Game{
  constructor(){
    super(CONFIG.WIDTH, CONFIG.HEIGTH, Phaser.AUTO, null, null, false, false);

    this.state.add('Bootstrap', Bootstrap);
    this.state.add('Intro', Intro);
    this.state.add('Overworld', Overworld);
    this.state.add('Preload', Preload);

    // alias to the current game object that has control of the keyboard
    this.cgo = null;

    this.eventEndSignal = new Phaser.Signal();
    this.eventQueue = [];

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
