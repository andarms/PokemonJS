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

  choice(text, options){
    // this.game.eventQueue.push({
    //   func: ()=>{
    //     let m = new Message(this.game, text, true);
    //     this.game.setCgo(m);
    //   },
    //   scope: this
    // });
    this.game.eventQueue.push({
      func: ()=>{
        let c = new Choice(this.game, 0, 0, text, options, this.scope);
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
