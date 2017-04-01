class Title extends Phaser.State {
  preload() {
  }

  create() {
    // Step of the current Title screen
    this.step = 0;

    this.theme = this.game.add.audio('title_origin');
    this.theme.loopFull();

    this.masks = {};
    this.pokelogoIntro = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'custom_pokelogo_shine');
    this.pokelogoIntro.anchor.set(0.5, 0.5)
    this.masks.pokelogoIntro = this.game.add.graphics(0, 0);
    this.masks.pokelogoIntro.beginFill(0xffff00);
    this.masks.pokelogoIntro.drawRect(0, this.game.world.height/2 + 100, this.game.world.width, 16);
    this.pokelogoIntro.mask = this.masks.pokelogoIntro;
    this.pokelogoIntroY = this.game.world.height;

    this.timer = 64;

    this.barsIntro = this.game.add.sprite(0, 0, 'custom_bars_shine');
    this.masks.barsIntro = this.game.add.graphics(0, 0);
    this.masks.barsIntro.beginFill(0xffff00);
    this.masks.barsIntro.drawRect(-128, 0, 128, this.game.world.height);
    this.barsIntro.mask = this.masks.barsIntro;
    this.barsIntroUpx = 0;
    this.barsIntroDownx = this.game.world.width;
    this.linesShined = false;


    this.game.setCgo(this);

  }


  create2(){
    
    let bg = this.game.add.sprite(0, 0, 'custom_background');
    this.logo2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'custom_pokelogo'); 
    let bars = this.game.add.sprite(0, 0, 'custom_bars');
    bg.alpha = 0;
    this.logo2.alpha = 0;
    bars.alpha = 0;
    this.logo2.anchor.set(0.5,0.5)

    let bgTween = this.game.add.tween(bg).to( { alpha: 1 }, 3000, "Linear", true);
    this.game.add.tween(this.logo2).to( { alpha: 1 }, 2000, "Linear", true);
    this.game.add.tween(bars).to( { alpha: 1 }, 1000, "Linear", true);

    bgTween.onComplete.add(this.create3, this);
   
  }

  create3(){
    this.game.camera.flash();
    this.game.world.remove(this.logo2)
    this.bacground =  this.game.add.tileSprite(0, 0, 512, 384, 'custom_plane');
    this.effects =  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 102, 'custom_effect');
    this.effects2 =  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 102, 'gen_6_shine');
    this.effects3 =  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 102, 'gen_6_effect2');
    this.game.add.sprite(0, 0, 'custom_clouds_2');
    this.emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY + 102, 5);
    let pokelogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'pokemonjs');
    this.game.add.sprite(0, 0, 'custom_clouds_1');
    this.game.add.sprite(0, 0, 'custom_bars');
    
    this.effects.anchor.set(0.5,0.5)
    this.effects2.anchor.set(0.5,0.5)
    this.effects3.anchor.set(0.5,0.5)
    
    pokelogo.anchor.set(0.5,0.5)
    let logoTween = this.game.add.tween(pokelogo).from( { y: this.game.world.centerY   }, 1000, "Linear", true);

    // Start Blink
    let startBlink =  this.game.add.sprite(this.game.world.centerX, 368, 'pokestart')
    startBlink.anchor.set(0.5, 0.5)
    startBlink.alpha = 0;
    let tween = this.game.add.tween(startBlink).to( { alpha: 1 }, 1000, "Linear", true, 0, -1, true);
    tween.yoyoDelay(1000);    
    logoTween.chain(tween)


    this.emitter.makeParticles(['gen_6_particle', 'gen_6_particle2']);
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);
    this.emitter.gravity.set(0, 0);
    this.emitter.start(false, 1600, 5, 0);
    
    this.step = 3;
  }

  onkeydown(){}
  onkeyup(key){
    if(key == Phaser.Keyboard.ENTER) {
      this.theme.fadeOut(500)
      this.camera.fade()
      this.theme.onFadeComplete.add(() =>{
        this.state.start('Intro')
      }, this, 0);
    }
  }


  update(){

    if(this.step == 0){
      this.masks.pokelogoIntro.y -= 4;
      this.timer--;
      if(this.timer < 0){
        this.game.world.remove(this.pokelogoIntro)
        this.step = 1;
        this.timer = 60;
      }
    }

    if(this.step == 1){
      this.masks.barsIntro.x += 16;
      this.timer--;
      if(this.barsIntroDownx < 0){
        this.game.world.remove(this.barsIntro)
      }
      if(this.timer < 0){
       this.step = 2;
       this.create2()
      }
    }

    if(this.step == 3){
      this.bacground.tilePosition.x -= 0.5;
      this.effects.angle += 1;
      this.effects3.angle += 0.2;
    }

  }
}

export default Title;
