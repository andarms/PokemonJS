import CONFIG from '../config';
import DATA from '../Data';

import Message from './Message';

class Choice extends Phaser.Group{
  constructor(game, x, y, text, flag, options, defaultOption, optionsCtx){
    super(game);
    var windowSkin = new Phaser.NinePatchImage(this.game, x, y, 'choice_1');
    windowSkin.targetWidth = 48;
    windowSkin.targetHeight = 32;
    
    this.menu = new Phaser.Group(game);    
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

    this.options = options;
    this.optionsCtx = optionsCtx;
    this.optionsIndex = 0;
    this.selarrow.x = this.options[this.optionsIndex].x - 2;
    this.selarrow.y = this.options[this.optionsIndex].y + 2; 

    this.defaultOption = defaultOption;
    this.flag = flag;

    this.message = new Message(this.game, text, true);
    this.add(this.message);
    this.add(this.menu);
    this.menu.visible = false;

  }

  onkeyup(key){
    if(this.message.alive){
      this.message.onkeyup(key);
      if(!this.message.alive){
        this.menu.visible = true;
      }
      return;
    }
    if(key == Phaser.Keyboard.UP){
      this.optionsIndex--;
      if(this.optionsIndex < 0){
        this.optionsIndex = this.options.length - 1;
      }
      this.selarrow.x = this.options[this.optionsIndex].x - 2;
      this.selarrow.y = this.options[this.optionsIndex].y + 2; 
    }
    if(key == Phaser.Keyboard.DOWN){
      this.optionsIndex++;
      if(this.optionsIndex == this.options.length){
        this.optionsIndex = 0;
      }
      this.selarrow.x = this.options[this.optionsIndex].x - 2;
      this.selarrow.y = this.options[this.optionsIndex].y + 2; 
    }
    if(key == Phaser.Keyboard.X || key == Phaser.Keyboard.ENTER){
      DATA.FLAGS[this.flag] = this.options[this.optionsIndex].value != null ? this.options[this.optionsIndex].value :  this.optionsIndex + 1;
      this.options[this.optionsIndex].action.apply(this.optionsCtx);
      this.game.eventEndSignal.dispatch();
      this.destroy();      
    }
    
    // Select the deafult option based on this.defaultOption    
    // (or 0 if the player can't cancel or -1 to don't choice any)
    // this.defaultOption is in length language and dont in array index language
    if(key == Phaser.Keyboard.Z){
      if(this.defaultOption != 0 && this.defaultOption != -1){
        DATA.FLAGS[this.flag] = this.options[this.defaultOption - 1] != null ? this.options[this.defaultOption - 1].value : this.defaultOption;
        this.options[this.defaultOption - 1 ].action.apply(this.optionsCtx);
        this.game.eventEndSignal.dispatch();
        this.destroy();
      }else if(this.defaultOption == -1){
        DATA.FLAGS[this.flag] = this.defaultOption;
        this.game.eventEndSignal.dispatch();
        this.destroy();
      }
    }
  }

  update(){
  }
}
export default Choice;
