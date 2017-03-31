import DATA from '../Data';

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
  }

}

export default Overwolrd;
