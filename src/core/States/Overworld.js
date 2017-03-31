import DATA       from '../Data';
import * as utils from '../utils';

class Overwolrd extends Phaser.State{

  create(){
    this.player = DATA.player;
    this.game.setCgo(this.player);
    this.createmap();
    this.player.setMapPosition(DATA.start.x, DATA.start.y);
  }

  createmap(){
    this.map = this.game.add.tilemap(DATA.start.map, 32, 32);
    this.game.map = this.map;
    this.map.addTilesetImage('Outside', 'Outside');
    this.map.addTilesetImage('Interior general', 'Interior general');
    this.map.addTilesetImage('movement_permissions', 'movement_permissions');

    this.collisions = this.map.createLayer('Collisions');
    this.map.createLayer('1');
    this.map.createLayer('2');
    this.game.world.add(this.player);
    this.map.createLayer('3');

    this.collisions.resizeWorld();
    this.player.setCollisions(this.collisions);
    this.game.camera.follow(this.player);

    // Automatics script, no action button needed
    DATA.map.script = new Phaser.Group(this.game);
    DATA.map.script.enableBody = true;
    let scriptsTiles = utils.findObjectsByType('Script', this.map, 'Events');    
    for(var i of scriptsTiles){
      let s = DATA.map.script.add(this.game.add.sprite(i.x, i.y));
      console.log(i.x, i.y, s.width)      
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

  }

}

export default Overwolrd;
