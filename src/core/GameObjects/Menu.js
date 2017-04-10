import CONFIG      from '../config';
import DATA        from '../Data';
import {GFX, PKMN} from '../main';
import Message     from './Message';

class Menu extends Phaser.Group{
  constructor(game){
    super(game);
    let x = this.game.camera.view.x;
    let y = this.game.camera.view.y;
    let options = [
      {text: 'Pokédex', action:        this.pokedex},
      {text: 'Pokémon', action:        this.pokemons},
      {text: 'Bag', action:            this.bag},
      {text: DATA.player.name, action: this.playerInfo},
      {text: 'Save', action:           this.save},
      {text: 'Options', action:        this.options},
      {text: 'Exit', action:           this.exit},
    ];
    
    this.menu = new Phaser.Group(game);

    var windowSkin = new Phaser.NinePatchImage(this.game, x, y, 'choice_1');
    windowSkin.targetWidth = 48;
    windowSkin.targetHeight = 32;
    this.menu.add(windowSkin);

    this.selarrow = this.menu.add(this.game.add.sprite(x, y, 'selarrow'));
    this.selarrow.anchor.set(1, 0);




    let paddingTop = 16;
    let paddingLeft = 32;
    let maxLength = 0;
    for(let o of options){
      o.x = x+paddingLeft
      o.y = y+paddingTop
      let line =  this.game.add.text(o.x, o.y, o.text, CONFIG.FONT_STYLE);
      y += line.height
      if(o.text.length > maxLength) maxLength = o.text.length
      windowSkin.targetHeight += line.height;
      this.menu.add(line)
    }
    windowSkin.targetWidth += maxLength*16


    this.menu.x += this.game.width - windowSkin.targetWidth;
    // this.menu.y = this.message.roof - windowSkin.targetHeight;

    this.options = options;
    this.optionsIndex = 0;
    this.selarrow.x = this.options[this.optionsIndex].x - 2;
    this.selarrow.y = this.options[this.optionsIndex].y + 2; 
    this.add(this.menu);

  }

  onkeydown(){
  }
  onkeyup(key){
    if(!this.alive) return;
    if(key == Phaser.Keyboard.UP){
      this.optionsIndex--;
      if(this.optionsIndex < 0){
        this.optionsIndex = this.options.length - 1;
      }
      this.selarrow.x = this.options[this.optionsIndex].x - 2;
      this.selarrow.y = this.options[this.optionsIndex].y + 2;
      GFX.choose.play();
    }
    if(key == Phaser.Keyboard.DOWN){
      this.optionsIndex++;
      if(this.optionsIndex == this.options.length){
        this.optionsIndex = 0;
      }
      this.selarrow.x = this.options[this.optionsIndex].x - 2;
      this.selarrow.y = this.options[this.optionsIndex].y + 2; 
      GFX.choose.play();
    }
    if(key == Phaser.Keyboard.X || key == Phaser.Keyboard.ENTER){
      this.options[this.optionsIndex].action.apply(this);
      this.game.eventEndSignal.dispatch();
      this.alive = false;
      this.destroy();      
    }
  }

  pokedex(){
    PKMN.release();
  }
  pokemons(){
    PKMN.release();
  }
  bag(){
    PKMN.release();
  }
  save(){
    PKMN.release();
  }
  playerInfo(){
    PKMN.release();
  }
  options(){
    PKMN.release();
  }
  exit(){
    PKMN.release();
  }
}

export default Menu;
