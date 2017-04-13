import CONFIG from '../config';
class Battle extends Phaser.State {
  preload() {
  }

  create() {
    this.stage.backgroundColor = "#890045"

    // this.battleMessage = new Phaser.Group(this.game)
    let bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg-meadow');
    bg.anchor.set(.5,.5)
    
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

    let a = this.game.add.sprite(16, 300, 'hp_bar_bg')
    this.b = this.game.add.sprite(16, 300, 'hp_bar')
    this.c = this.game.add.sprite(32, 312,'exp_bar_bg')
    this.d = this.game.add.tileSprite(32, 312, 120, 16, 'exp_bar')

    this.bRect = new Phaser.Rectangle(0, 0, this.b.width, this.b.height);
    this.b.crop(this.bRect)


    this.name =  this.game.add.text(32, 300, 'Abomasnow', CONFIG.FONT.WHITE_SM);
    this.hpPoint =  this.game.add.text(232, 300, '75 / 130', CONFIG.FONT.WHITE_XS);
    this.level =  this.game.add.text(232, 304, '♂ Lv. 55', CONFIG.FONT.WHITE_XS);
    this.level.anchor.set(1)

    a.anchor.set(0, .5)
    this.b.anchor.set(0, .5)
    this.name.anchor.set(0, .5)
    this.hpPoint.anchor.set(1, 0)



    this.e = this.game.add.sprite(498, 64, 'hp_bar_bg')
    this.f = this.game.add.sprite(498, 64, 'hp_bar')
    this.e.anchor.set(1, .5)
    this.f.anchor.set(1, .5)
    this.e.height = 32;
    this.f.height = 32;
    this.foeName =  this.game.add.text(290, 66, 'Incineroar', CONFIG.FONT.WHITE_SM);
    this.foeLevel =  this.game.add.text(482, 68, '♀ Lv. 56', CONFIG.FONT.WHITE_XS);
    this.foeName.anchor.set(0, .5);
    this.foeLevel.anchor.set(1, .5);


    // b.width = 100;
    // 

    // var hpBarConfig = {
    //   x: 16, 
    //   y: 300, 
    //   width: 216,
    //   height: 36,
    //   bg:{
    //     color: '#333'
    //   },
    //   bar: {
    //     color: '#00b034'
    //   },
    // };
    // var expBarConfig = {
    //   x: 20, 
    //   y: 324, 
    //   width: 120,
    //   height: 18,
    //   bg: {
    //     color: '#555'
    //   },
    //   bar: {
    //     color: '#00a8ec'
    //   },
    // };
	  // this.myHealthBar = new HealthBar(this.game, hpBarConfig);
	  // this.expBar = new HealthBar(this.game, expBarConfig);
    // this.myHealthBar.setAnchor(0, .5);
    // this.expBar.setAnchor(0, .5);

    // this.name =  this.game.add.text(24, 300, 'Feraligatr', CONFIG.FONT.WHITE);
    // this.hppoint =  this.game.add.text(220, 310, '75 / 130', CONFIG.FONT.WHITE_XS);
    // this.level =  this.game.add.text(24, 324, 'Lv. 55', CONFIG.FONT.WHITE_XS);
    // this.level.anchor.set(0, .5);
    // this.name.anchor.set(0, .5)
    // this.hppoint.anchor.set(1, .5)



    // var foeBar = {
    //   x: 496, 
    //   y: 16, 
    //   width: 224,
    //   height: 32,
    //   bg: {
    //     color: '#333'
    //   },
    //   bar: {
    //     color: '#00b034'
    //   },
    // };
	  // this.foeBar = new HealthBar(this.game, foeBar);
    // this.foeBar.setAnchor(1, 0);
    // this.game.add.text(272, 12, 'Icineroar', CONFIG.FONT.WHITE);


    this.game.setCgo(this)
    
  }

  onkeydown(){
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER){
      // this.game.state.start('OverWorld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y)
      // this.myHealthBar.setPercent(25);
      // this.expBar.setPercent(50);
      // this.foeBar.setPercent(47);
      this.game.add.tween(this.bRect).to( { width: 120 }, 1000, Phaser.Easing.Linear.None, true);      
      this.game.add.tween(this.d).to( { width: 50 }, 1000, Phaser.Easing.Linear.None, true);
      this.b.frame = 1;
    }
  }

  update(){
    this.b.updateCrop();
  }
}

export default Battle;
