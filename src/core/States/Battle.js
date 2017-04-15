import CONFIG from '../config';
import BattleMenu from '../GameObjects/BattleMenu';

class Battle extends Phaser.State {
  preload() {
  }

  create() {
    this.stage.backgroundColor = "#890045"

    // this.battleMessage = new Phaser.Group(this.game)
    let bg = this.game.add.sprite(this.game.camera.view.x + this.game.width/2, this.game.camera.view.y+this.game.height/2, 'bg-meadow');
    bg.anchor.set(.5);
    
    let playerBass = this.game.add.sprite(-150,234, 'playerbaseCityGrass')
    let fronBass = this.game.add.sprite(250, 260, 'enemybaseCityGrass')
    let back =  this.game.add.sprite(100, 250, '460b_1', 0)
    let  front = this.game.add.sprite(380, 210, '727', 0)

    back.scale.set(2)
    back.anchor.set(.5, .5)
    front.anchor.set(.5, 1)
    fronBass.anchor.set(0, 1)

    let frames = [];
    for(var i = 0; i < 71; i++){
      frames.push(i);
    }
    back.animations.add('front', frames, 30, true);
    back.animations.play('front');


    let frames2 = [];
    for(var i = 0; i < 39; i++){
      frames2.push(i);
    }
    front.animations.add('front', frames2, 30, true);
    front.animations.play('front');  

    this.menu = new BattleMenu(this.game, {name: 'Abomasnow'});

    
    this.a = this.game.add.sprite(16, 300, 'hp_bar_bg')
    this.b = this.game.add.sprite(16, 300, 'hp_bar')
    this.c = this.game.add.sprite(32, 312,'exp_bar_bg')
    this.d = this.game.add.tileSprite(32, 312, 120, 16, 'exp_bar')
    this.a.anchor.set(0, .5)
    this.b.anchor.set(0, .5);

    this.b_mask = this.game.add.graphics(this.b.left, this.b.top);
    this.b_mask.beginFill(0xffffff);
    this.b_mask.drawRect(0, 0, this.b.width, this.b.height);
    this.b.mask = this.b_mask;


    this.name =  this.game.add.text(32, 300, '♀ Abomasnow', CONFIG.FONT.WHITE_SM);
    this.hpPoint =  this.game.add.text(this.a.right, this.a.bottom, '75 / 130', CONFIG.FONT.WHITE_XS);
    this.level =  this.game.add.text(this.a.right, this.a.top, 'Lv. 55', CONFIG.FONT.WHITE_XS);
    
    this.name.anchor.set(0, .5)
    this.level.anchor.set(1.2, 0)
    this.hpPoint.anchor.set(1.2, .9)

    this.name.addColor('#ff3142', 0)
    this.name.addColor('#ffffff', 2)
    this.level.addColor("#ffff00", 0);
    this.level.addColor("#ffffff", 3);



    this.e = this.game.add.sprite(498, 64, 'foe_hp_bar_bg')
    this.f = this.game.add.sprite(498, 64, 'foe_hp_bar')
    this.e.anchor.set(1, .5)
    this.f.anchor.set(1, .5)
    this.foeName =  this.game.add.text(this.e.left, this.e.bottom, '♂ Incineroar', CONFIG.FONT.WHITE_SM);
    this.foeLevel =  this.game.add.text(this.e.right, this.e.bottom, 'Lv. 56', CONFIG.FONT.WHITE_XS);
    
    this.foeName.anchor.set(-.1, .9);
    this.foeLevel.anchor.set(1.2, .9);

    this.foeName.addColor('#00bdf7', 0)
    this.foeName.addColor('#ffffff', 2)
    this.foeLevel.addColor("#ffff00", 0);
    this.foeLevel.addColor("#ffffff", 3);

    


    this.game.setCgo(this.menu);
    
  }

  onkeydown(){
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER){
      // this.game.state.start('OverWorld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y)
      this.game.add.tween(this.b_mask).to( { width: 50 }, 1000, Phaser.Easing.Linear.None, true);      
      this.game.add.tween(this.d).to( { width: 50 }, 1000, Phaser.Easing.Linear.None, true);
      this.b.frame = 2;
    }
  }

  update(){
  }
}

export default Battle;
