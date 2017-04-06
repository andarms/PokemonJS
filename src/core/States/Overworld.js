import DATA       from '../Data';
import * as utils from '../utils';

import NPC from '../GameObjects/NPC';

class Overwolrd extends Phaser.State{

  init(mapFilename, tileX, tileY){
    this.mapFilename = mapFilename;
    this.tileX = parseInt(tileX);
    this.tileY = parseInt(tileY);
  }

  create(){
    this.player = DATA.player;
    this.game.setCgo(this.player);
    this.createmap();
    this.player.setMapPosition(this.tileX, this.tileY);

    if(this.map.properties.bgm){
      this.bgm = this.game.add.audio(this.map.properties.bgm);
      this.bgm.loopFull();
    }

    let npc = new NPC(this.game, 128, 128, 'trchar001');
    DATA.map.entities.add(npc);
  }

  createmap(){
    this.map = this.game.add.tilemap(this.mapFilename, 32, 32);
    this.map.addTilesetImage('Outside', 'Outside');
    this.map.addTilesetImage('interior_general', 'interior_general');
    this.map.addTilesetImage('movement_permissions', 'movement_permissions');

    this.collisions = this.map.createLayer('Collisions');
    this.map.createLayer('1');
    this.map.createLayer('2');
    

    this.collisions.resizeWorld();
    this.game.camera.follow(this.player);
    DATA.map.collisions = this.collisions;

    // This group is used to sort the z deep of the sprites
    DATA.map.entities = new Phaser.Group(this.game);
    DATA.map.entities.enableBody = true;

    // Group used to handle tall grass collisions
    DATA.map.grass = new Phaser.Group(this.game);



    let animatedTiles = utils.findObjectsByType('AnimatedTile', this.map, 'Events', true)
    let animatedGroup = this.game.add.group()
    for(var tile of animatedTiles){
      animatedGroup.create(tile.x, tile.y, tile.properties.sprite)
      animatedGroup.callAll(
        'animations.add', 
        'animations', 
        'initial', 
        utils.range(parseInt(tile.properties.frames)), 
        parseInt(tile.properties.fps), 
        true);
      animatedGroup.callAll('animations.play', 'animations', 'initial');
    }
    
    DATA.map.entities.add(this.player);

    let tallGrassTiles = utils.findObjectsByType('TallGrass', this.map, 'Events', true)
    for(var tile of tallGrassTiles){
      let sprite = DATA.map.entities.create(tile.x, tile.y, 'DustandGrass')
      DATA.map.entities.callAll('animations.add', 'animations', 'rustling', [1 ,2, 3, 0], 10, false);
      DATA.map.grass.add(sprite);
    }


    this.map.createLayer('3');

    // Automatics script, no action button needed
    DATA.map.triggerscripts = new Phaser.Group(this.game);
    DATA.map.triggerscripts.enableBody = true;
    let triggerscripts = utils.findObjectsByType('TriggerScript', this.map, 'Events');    
    for(var i of triggerscripts){
      let s = DATA.map.triggerscripts.add(this.game.add.sprite(i.x, i.y));    
      s.properties = i.properties;
    }

    // 
    DATA.map.actionscripts = new Phaser.Group(this.game);
    DATA.map.actionscripts.enableBody = true;
    let EventsTiles = utils.findObjectsByType('ActionScript', this.map, 'Events');    
    for(var i of EventsTiles){
      let s = DATA.map.actionscripts.add(this.game.add.sprite(i.x, i.y));    
      s.properties = i.properties;
    }


    DATA.map.warps = new Phaser.Group(this.game);
    DATA.map.warps.enableBody = true;
    let warps = utils.findObjectsByType('Warp', this.map, 'Events');    
    for(var i of warps){
      let s = DATA.map.warps.add(this.game.add.sprite(i.x, i.y));    
      s.properties = i.properties;
    }
    DATA.map.entities.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  shutdown(){
    DATA.map.entities.remove(this.player);
    DATA.map.entities.destroy(true);
    this.bgm.stop();
  }

}

export default Overwolrd;
