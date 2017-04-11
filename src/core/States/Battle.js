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
    front.scale.set(1)
    back.anchor.set(.5, .5)
    front.anchor.set(0.5, 1)
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

    
    // this.game.add.sprite(0,288, 'newBattleMessageBox')
    // let b = this.game.add.sprite(512, 200, 'bar_bg')
    // b.anchor.set(1, 0)

    var hpBarConfig = {
      x: 16, 
      y: 300, 
      width: 216,
      height: 32,
      bg:{
        color: '#333'
      },
      bar: {
        color: '#00b034'
      },
    };
    var expBarConfig = {
      x: 16, 
      y: 324, 
      width: 120,
      height: 18,
      bg: {
        color: '#555'
      },
      bar: {
        color: '#00a8ec'
      },
    };
	  this.myHealthBar = new HealthBar(this.game, hpBarConfig);
	  this.expBar = new HealthBar(this.game, expBarConfig);
    this.myHealthBar.setAnchor(0, 1);
    this.expBar.setAnchor(0, 1);

    this.name =  this.game.add.text(24, 308, 'Abomasnow', CONFIG.FONT.WHITE);
    this.hppoint =  this.game.add.text(220, 308, '75 / 130', CONFIG.FONT.WHITE_XS);
    this.level =  this.game.add.text(24, 328, 'Lv. 55', CONFIG.FONT.WHITE_XS);
    this.level.anchor.set(0, 1);
    this.name.anchor.set(0, 1)
    this.hppoint.anchor.set(1)

    this.game.setCgo(this)
    
  }

  onkeydown(){
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER){
      // this.game.state.start('OverWorld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y)
      this.myHealthBar.setPercent(25);
      this.myHealthBar.setBarColor(0xffff00);
      this.expBar.setPercent(50);
    }
  }
}

export default Battle;
