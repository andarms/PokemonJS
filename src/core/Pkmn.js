import Choice from './GameObjects/Choice';
import Message from './GameObjects/Message';

class Pkmn{
  constructor(game){
    this.game = game;
  }

  msgbox(text, callback){
    this.game.eventQueue.push({
      func: ()=>{
        let m = new Message(this.game, text);
        this.game.setCgo(m);
      },
      scope: this
    });
    if(callback){
      this.game.eventQueue.push({
        func: ()=>{
          callback.apply(this.scope);
        },
        scope: this.scope
      });
    }
  }

/**
* @function choice
* @param  string text                                       Message to show
* @param  string flag                                       Flag name to store selected value e.g DATA.FLAGS[flag]
* @param  Array[{string text, function action, any value}]  Options List of options to choice, text is the text of the choice
*                                                             action is the function to execute.
* @param  int defaultOption                                 Is the choice used when the player cancels 
*                                                             (or 0 if the player can't cancel or -1 to don't choice any)
* @example
* // let text = "Text to show before choice";
* // let options = [
* //  {text: "choice 1", action: choice1},
* //  {text: "choice 2", action: choice2}
* // ];
* // PKMN.choice(text, options, 0);
* // function choice1(){
* //  ...
* // }
* // function choice2(){
* //  ...
* // }
* @return  Set them DATA.FLAGS[flag] var with the index of the selected option
*/
  choice(text, flag, options, defaultOption){
    // Posible add the value attr to the option object to set the flag with that value.
    this.game.eventQueue.push({
      func: ()=>{
        let c = new Choice(this.game, 0, 0, text, flag, options, defaultOption, this.scope);
        this.game.setCgo(c);
      },
      scope: this.scope
    });
  }

  end(){
    this.game.eventEndSignal.dispatch();
  }

  continue(){
    this.game.eventEndSignal.dispatch();
  }

  start(scope){
    this.scope = scope;
  }
}

export default Pkmn;
