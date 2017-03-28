import {PKMN} from '../main';
class Intro extends Phaser.State{
  create(){
    this.game.add.sprite(0, 0, 'introbg');
    
    this.professor = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-30, 'introOak');
    this.professor.anchor.set(.5, .5);

    PKMN.msgbox("Hola");
    PKMN.msgbox("Este es un texto más grande y espero que ocupe mas de dos lieneas");
    PKMN.msgbox("Otro", this.intro1);
    PKMN.start();

  }

  intro1(){
    console.log("hola")
  }
}

export default Intro;
