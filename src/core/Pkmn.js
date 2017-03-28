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
