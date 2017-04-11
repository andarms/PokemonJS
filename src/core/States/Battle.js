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

    
    this.game.add.sprite(0,288, 'newBattleMessageBox')

    var hpBarConfig = {
      x: 504, 
      y: 250, 
      width: 200,
      height: 8,
      flipped: true,
      bg: {
        color: '#333'
      },
      bar: {
        color: '#33ff33'
      },
    };
    var expBarConfig = {
      x: 504, 
      y: 260, 
      width: 100,
      height: 4,
      bg: {
        color: '#333'
      },
      bar: {
        color: '#3333ff'
      },
    };
	  this.myHealthBar = new HealthBar(this.game, hpBarConfig);
	  this.expBar = new HealthBar(this.game, expBarConfig);
    this.myHealthBar.setAnchor(1, 0);
    this.expBar.setAnchor(1, 0);

    this.name =  this.game.add.text(304, 255, 'Abomasnow', CONFIG.FONT.WHITE);
    this.level =  this.game.add.text(504, 255, 'Lv. 55', CONFIG.FONT.WHITE_XS);
    this.hppoint =  this.game.add.text(304, 260, '75/130', CONFIG.FONT.WHITE_XS);
    this.name.anchor.set(0, 1);
    this.level.anchor.set(1);


    this.game.setCgo(this)
    
  }

  onkeydown(){
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER){
      // this.game.state.start('OverWorld', true, false, DATA.mapFilename, DATA.player.data.currTile.x, DATA.player.data.currTile.y)
      this.myHealthBar.setPercent(50);
      this.expBar.setPercent(50);
    }
  }
}

export default Battle;
