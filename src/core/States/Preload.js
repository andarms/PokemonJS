import CONFIG from '../config';
import {GFX} from '../main';

class Preload extends Phaser.State{
  preload() {
    let style = { font: "32px power_clearregular", fill: "#fff"}
    this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", style);
    this.loading.anchor.set(.5, .5);
    this.bar = this.game.add.sprite(16, this.game.world.centerY + 50,"loading");
    this.load.setPreloadSprite(this.bar);


    // Trainers Sprites and Animated Tiles
    this.game.load.spritesheet('trchar000', 'Resources/Graphics/Characters/trchar000.png', 32, 48)
    this.game.load.spritesheet('trchar001', 'Resources/Graphics/Characters/trchar001.png', 32, 48)
    this.game.load.spritesheet('boy_run', 'Resources/Graphics/Characters/boy_run.png', 32, 48)
    this.game.load.spritesheet('girl_run', 'Resources/Graphics/Characters/girl_run.png', 32, 48)
    this.game.load.spritesheet('doors5', 'Resources/Graphics/Characters/doors5.png', 32, 32)
    this.game.load.spritesheet('Flowers1', 'Resources/Graphics/Autotiles/Flowers1.png', 32, 32)
    this.game.load.spritesheet('WaterCurrentSouth', 'Resources/Graphics/Autotiles/Water current south.png', 32, 32)
    this.game.load.spritesheet('DustandGrass', 'Resources/Graphics/Animations/DustandGrass.png', 32, 32)

    // Pokemon 3d prerendered Sprites
    this.game.load.spritesheet('383', 'Resources/Graphics/Battlers/383.png', 107, 94)
    this.game.load.spritesheet('460_1', 'Resources/Graphics/Battlers/460_1.png', 125, 110)
    this.game.load.spritesheet('460b_1', 'Resources/Graphics/Battlers/460b_1.png', 124, 118)
    this.game.load.spritesheet('504', 'Resources/Graphics/Battlers/504.png', 46, 55)
    this.game.load.spritesheet('727', 'Resources/Graphics/Battlers/727.png', 131, 96)
    this.game.load.spritesheet('pikachu', 'Resources/Graphics/Battlers/pikachu.png', 60, 60)

    // Tilesets
    this.game.load.image('Outside', 'Resources/Graphics/Tilesets/Outside.png')
    this.game.load.image('battlebgField', 'Resources/Graphics/Battlebacks/battlebgField.png')
    this.game.load.image('playerbaseCityGrass', 'Resources/Graphics/Battlebacks/playerbaseCityGrass.png')
    this.game.load.image('enemybaseCityGrass', 'Resources/Graphics/Battlebacks/enemybaseCityGrass.png')
    this.game.load.image('interior_general', 'Resources/Graphics/Tilesets/Interior_general.png')
    this.game.load.image('movement_permissions', 'Resources/Graphics/Tilesets/movement_permissions.png')

    // General Pictures
    this.game.load.image('shadeFull', 'Resources/Graphics/Pictures/shadeFull.png')
    this.game.load.image('newBattleMessageBox', 'Resources/Graphics/Pictures/newBattleMessageBox.png')
    this.game.load.image('loadbg', 'Resources/Graphics/Pictures/loadbg.png')
    this.game.load.image('bg', 'Resources/Graphics/Pictures/bg.png')
    this.game.load.image('bg1', 'Resources/Graphics/Pictures/bg1.png')
    this.game.load.image('white_bg', 'Resources/Graphics/Pictures/white_bg.png')
    this.game.load.image('moving_bg', 'Resources/Graphics/Pictures/moving_bg.png')
    this.game.load.image('introbg', 'Resources/Graphics/Pictures/introbg.png')
    this.game.load.image('introBoy', 'Resources/Graphics/Pictures/introBoy.png')
    this.game.load.image('introGirl', 'Resources/Graphics/Pictures/introGirl.png')
    this.game.load.image('introOak', 'Resources/Graphics/Pictures/introOak.png')
    this.game.load.image('introProf', 'Resources/Graphics/Pictures/introProf.png')
    this.game.load.image('introbase', 'Resources/Graphics/Pictures/introbase.png')
    this.game.load.image('selarrow', 'Resources/Graphics/Pictures/selarrow.png')
    this.game.load.spritesheet('load_button', 'Resources/Graphics/Pictures/load_button.png', 384, 45)
    
    // Title assets
    this.game.load.image('pokestart', 'Resources/Graphics/Titles/pokestart.png')
    this.game.load.image('custom_background', 'Resources/Graphics/Titles/custom_background.png')
    this.game.load.image('custom_clouds_1', 'Resources/Graphics/Titles/custom_clouds_1.png')
    this.game.load.image('custom_clouds_2', 'Resources/Graphics/Titles/custom_clouds_2.png')
    this.game.load.image('custom_effect', 'Resources/Graphics/Titles/custom_effect.png')
    this.game.load.image('custom_plane', 'Resources/Graphics/Titles/custom_plane.png')
    this.game.load.image('custom_bars', 'Resources/Graphics/Titles/custom_bars.png')
    this.game.load.image('custom_bars_shine', 'Resources/Graphics/Titles/custom_bars_shine.png')
    this.game.load.image('gen_6_shine', 'Resources/Graphics/Titles/gen_6_shine.png')
    this.game.load.image('gen_6_effect2', 'Resources/Graphics/Titles/gen_6_effect2.png')
    this.game.load.image('pokemonjs', 'Resources/Graphics/Titles/pokemonjs.png')
    this.game.load.image('custom_pokelogo', 'Resources/Graphics/Titles/custom_pokelogo.png')
    this.game.load.image('custom_pokelogo_shine', 'Resources/Graphics/Titles/custom_pokelogo_shine.png')
    this.game.load.image('gen_5_bg', 'Resources/Graphics/Titles/gen_5_bg.png')
    this.game.load.image('gen_6_particle', 'Resources/Graphics/Titles/gen_6_particle.png')
    this.game.load.image('gen_6_particle', 'Resources/Graphics/Titles/gen_6_particle.png')
    this.game.load.image('gen_6_particle2', 'Resources/Graphics/Titles/gen_6_particle2.png')


    
    this.game.load.image('choice_1', 'Resources/Graphics/Windowskins/choice 1.png')
    this.game.load.image('speech_hgss_1', 'Resources/Graphics/Windowskins/speech hgss 1.png')
    
    
    
    this.game.load.audio('title_origin', 'Resources/Audio/BGM/title_origin.ogg')
    this.game.load.audio('select', 'Resources/Audio/BGS/select.ogg')
    this.game.load.audio('Choose', 'Resources/Audio/BGS/Choose.ogg')

    this.game.load.tilemap('Pallet_Town/pallet_town_01', 'Resources/Maps/Pallet_Town/pallet_town_01.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.tilemap('Pallet_Town/pallet_town_02', 'Resources/Maps/Pallet_Town/pallet_town_02.json', null, Phaser.Tilemap.TILED_JSON)    
    this.game.load.tilemap('Route_1/route_1', 'Resources/Maps/Route_1/route_1.json', null, Phaser.Tilemap.TILED_JSON)


  }

  create() {
    this.game.add.plugin(PhaserInput.Plugin);

    GFX.choose = this.game.add.audio('Choose');
    
    //Windows skins
    this.game.cache.addNinePatch('choice_1', 'choice_1', null, 16, 16, 16, 16)
    this.game.cache.addNinePatch('speech_hgss_1', 'speech_hgss_1', null, 32, 48, 16, 16)    
    
    let t = this.state.start('Title');
  }
}
export default Preload;
