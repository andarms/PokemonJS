import CONFIG from '../config';
import DATA from '../Data';
import DebugGUI from '../DebugGUI';


class Bootstrap extends Phaser.State{
  preload(){
    this.game.load.image('loading', 'Resources/Graphics/Pictures/loading.png')
  }
  
  create(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.stage.smoothed = false;
    this.game.antialias = false;


    // Force to load font
    var text = this.game.add.text(0, 0, "Force to load Font", CONFIG.FONT.BLACK);

    // This state and only this state is in charge of handling user inputs. 
    // This way I can avoid the overload of keyboard events and make things a bit more organized.
    // The idea is to have an alias "this.game.cgo" (Current Game Object)
    // which refers to the current object that has control of the keyboard, 
    // it can be from a state to a custom object, 
    // the only thing they should have are the onkeydown and onkeyup methods
    this.game.input.keyboard.addCallbacks(this, this.onkeydown, this.onkeyup);

    this.game.eventEndSignal.add(this.eventEndListener, this);


    let debugPanel = new DebugGUI();
    debugPanel.setupGUI(DATA.debug, this.game);

    this.state.start('Preload');
  }

  onkeydown(event){
    // Only calls the onkeyup method of the cgo when the key pressed is in the keyboard control list.
    if(CONFIG.KEYBAORD_CONTROLS.includes(event.keyCode)){
      if(this.game.cgo){
        this.game.cgo.onkeydown(event.keyCode);
      }
    }
  }
  
  onkeyup(event){
    // Only calls the onkeyup method of the cgo when the key pressed is in the keyboard control list.
    if(CONFIG.KEYBAORD_CONTROLS.includes(event.keyCode)){
      if(this.game.cgo){
        this.game.cgo.onkeyup(event.keyCode);
      }
    }
  }

  eventEndListener(){
    let event = this.game.eventQueue.shift();
    if(event){
      event.func.apply(event.scope);
    }else{
      this.game.releaseCgo();
    }
  }


  test(data){
    console.log(data)
  }

}

export default Bootstrap;
