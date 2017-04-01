import CONFIG from '../config';
import DATA from '../Data';
import Message from './Message';

class NameScreen extends Phaser.Group{
  constructor(game){
    super(game);
    let x = 0;
    let y = 0;
    this.game = game;
    this.bgani =  this.game.add.tileSprite(0, 0, 1024, 764, 'moving_bg');
    var windowSkin = new Phaser.NinePatchImage(this.game, x, y, 'speech_hgss_1');
    windowSkin.targetWidth = 512;
    windowSkin.targetHeight = 96;
    this.add(this.bgani)
    this.add(windowSkin)

    let text = this.game.add.text(x+96, y+10, "What's your name?", CONFIG.FONT_STYLE);

    let config = {
      font: '32px power_clearregular',
      fill: '#000',
      cursorColor: '#000',
      borderColor: '#f8f8f8',
      backgroundColor: '#f8f8f8',
      width: 312,
      borderWidth: 0,
      max: 10,
      alpha: .5
    }
    this.input = this.game.add.inputField(x+96, y+48, config);
    this.input.startFocus();
    let m = new Message(this.game, "Enter text using keyboard. Press ESC to cancel or ENTER to confirm.");
    this.addMultiple([m, text])

  }

  onkeydown(){}
  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER){
      this.object.name = this.input.value;
      if (this.object.name.trim() == ""){
        this.getDefaultName()
      }
      this.game.eventEndSignal.dispatch();
      this.input.destroy();
      this.object.animations.stop();
      this.object.frame = 0;
      this.remove(this.object);
      this.destroy();
    }
  }

  update(){
    this.bgani.tilePosition.x += 0.5;
    // this.bgani.tilePosition.y -= 0.2;
  }
}

export class PlayerNameScreen extends NameScreen{
  constructor(game){
    super(game);
    this.object = DATA.player;
    this.add(this.object);
    this.object.x = this.x+32;
    this.object.y = this.y+24;
    this.object.animations.play('down');
  }

  getDefaultName(){
    this.object.name = DATA.defaultName[DATA.player.gender];
  }
}
