import CONFIG from '../config';


class Bootstrap extends Phaser.State{
  create(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.stage.smoothed = false;
    this.game.antialias = false;

    // This state and only this state is in charge of handling user inputs. 
    // This way I can avoid the overload of keyboard events and make things a bit more organized.
    // The idea is to have an alias "this.game.cgo" (Current Game Object)
    // which refers to the current object that has control of the keyboard, 
    // it can be from a state to a custom object, 
    // the only thing they should have are the onkeydown and onkeyup methods
    this.game.input.keyboard.addCallbacks(this, this.onkeydown, this.onkeyup);
    this.state.start('Preload');
  }

  onkeydown(){}
  onkeyup(event){
    // Only calls the onkeyup method of the cgo when the key pressed is in the keyboard control list.
    if(CONFIG.KEYBAORD_CONTROLS.includes(event.keyCode)){
      this.game.cgo.onkeyup(event.keyCode);
    }
  }
}

export default Bootstrap;
