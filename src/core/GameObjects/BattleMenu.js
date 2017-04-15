import CONFIG from '../config';
import DATA   from '../Data';
import {GFX}  from '../main';

class BattleMenu extends Phaser.Group{
  constructor(game, pokemon){
    super(game);

    let cmd_bg = this.game.add.sprite(0, 384, 'command_menu');
    cmd_bg.anchor.set(0, 1);
    this.add(cmd_bg);
    let pokename = this.game.add.text(8, 344, `What will ${pokemon.name} do?`, CONFIG.FONT.WHITE_SM)
    this.add(pokename);

    let x = (this.game.width - 16) - 96;
    let y = this.game.height - 96;
    this.opts = [
      {
        name:        'FIGTH', 
        activeFrame: 0, 
        frame:       1, 
        x:           x,
        y:           y,
        action:      this.fight
      },
      {
        name:        'PARTY', 
        activeFrame: 2, 
        frame:       3, 
        x:           x + 96, 
        y:           y,
        action:      this.test
      },
      {
        name:        'BAG',   
        activeFrame: 4, 
        frame:       5, 
        x:           x,    
        y:           y + 48,
        action:      this.test
      },
      {
        name:        'RUN',  
        activeFrame: 6, 
        frame:       7, 
        x:           x + 96, 
        y:           y + 48,
        action:      this.run
      },
    ];
    this.optInx = 0;

    for(var o of this.opts){
      o.btn = this.game.add.sprite(o.x, o.y, 'cmd_buttons', o.frame);
      o.btn.anchor.set(1, .5);
      o.text = this.game.add.text(o.btn.centerX, o.btn.centerY, o.name, CONFIG.FONT.WHITE_XS);
      o.text.anchor.set(.5, .4)
      this.add(o.btn);
      this.add(o.text);
    }

    this.opts[this.optInx].btn.frame = this.opts[this.optInx].activeFrame;

  }

  onkeydown(){}
  onkeyup(key){
    if(key == Phaser.Keyboard.RIGHT){
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].frame;
      this.optInx++;
      if(this.optInx == this.opts.length){
        this.optInx = 0;
      }
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].activeFrame;
      GFX.select.play();
    }
    if(key == Phaser.Keyboard.LEFT){
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].frame;
      this.optInx--;
      if(this.optInx < 0){
        this.optInx = this.opts.length -1;
      }
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].activeFrame;
      GFX.select.play();
    }
    if(key == Phaser.Keyboard.DOWN){
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].frame;
      this.optInx += 2;
      if(this.optInx >= this.opts.length){
        this.optInx = Math.abs(this.opts.length - this.optInx);
      }
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].activeFrame;
      GFX.select.play();
    }
    if(key == Phaser.Keyboard.UP){
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].frame;
      this.optInx -= 2;
      if(this.optInx < 0){
        this.optInx = this.opts.length - Math.abs(this.optInx);
      }
      this.opts[this.optInx].btn.frame = this.opts[this.optInx].activeFrame;
      GFX.select.play();
    }
    if(key == Phaser.Keyboard.ENTER){
      this.opts[this.optInx].action.apply(this);
    }
  }

  fight(){
    this.game.add.tween(this).to({alpha: 0, y: 120 }, 300, Phaser.Easing.Linear.None, true);
  }

  test(){
    console.log("not yet")
  }

  run(){
    this.game.state.start('Overworld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y)
  }

}
export default BattleMenu;
