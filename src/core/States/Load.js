import CONFIG from '../config';
import DATA   from '../Data';
import {GFX}  from '../main';
import Player  from '../GameObjects/Player';

class LoadState extends Phaser.State {
  preload() {
  }

  create() {
    this.game.add.sprite(0, 0, 'loadbg')

    this.menu = [
      {
        name: 'New Game',
        action: this.newGame
      },
      {
        name: 'Options',
        action: this.openOptions
      },
      {
        name: 'Exit',
        action: this.openOptions
      }
    ];  

    // Add the load Button
    if(localStorage.getItem('DATA')){
      this.menu.unshift({
        name: 'Continue',
        action: this.loadGame
      });
    }

    let x = 64;
    let y = 50;
    let h = 45;
    let paddingTop = 6;
    let paddingLeft = 20;
    let marginY = 5;
    for (var option of this.menu){
      option.sprite = this.game.add.sprite(x, y, 'load_button')
      var text = this.game.add.text(x+paddingLeft, y+paddingTop, option.name, CONFIG.FONT.WHITE);
      y += h + marginY;
    }
    
    
    this.menuIndex = 0;
    this.menu[this.menuIndex].sprite.frame = 1;

    this.game.setCgo(this);

  }

  onkeydown(){}
  onkeyup(key){
    if (key == Phaser.Keyboard.ENTER){
      this.menu[this.menuIndex].action.apply(this);
    }

    if (key == Phaser.Keyboard.UP){
      this.menu[this.menuIndex].sprite.frame = 0;
      this.menuIndex--;
      GFX.choose.play();
      if(this.menuIndex < 0) this.menuIndex = this.menu.length -1;
      this.menu[this.menuIndex].sprite.frame = 1;
    }

    if (key == Phaser.Keyboard.DOWN){
      this.menu[this.menuIndex].sprite.frame = 0;
      this.menuIndex++;
      GFX.choose.play();
      if(this.menuIndex == this.menu.length) this.menuIndex =  0;
      this.menu[this.menuIndex].sprite.frame = 1;
    }
  }

  loadGame(){
    let a = localStorage.getItem('DATA');
    let b = localStorage.getItem('PLAYER_DATA');
    Object.assign(DATA, JSON.parse(a));
    DATA.player = new Player(this.game, JSON.parse(b));
    this.state.start('Overworld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y);
  }

  newGame(){    
    // ctx.state.start('OverWorld', true, false, 'Pallet_Town/pallet_town_01', 8, 10);
    this.state.start('Intro');
  }

  openOptions(){    
    console.log("Not yet")
  }
}

export default LoadState;
