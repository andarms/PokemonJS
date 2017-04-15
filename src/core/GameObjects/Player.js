import CONFIG from '../config';
import DATA   from '../Data';
import EVENTS from '../Events';
import {PKMN} from '../main';
import Menu   from './Menu';

let DIR_VECTORS = {
  "left":  [-1, 0], 
  "right": [1, 0],
  "up":    [0, -1], 
  "down":  [0, 1] 
}

class Player extends Phaser.Sprite{
  constructor(game, data){
    let spritesheet = 'trchar00' + data.gender;
    super(game, 0, 0, spritesheet);

    this.data = data;
    
    this.normalSpritesheet = spritesheet;
    this.runSpritesheet = data.gender == 0 ? 'boy_run': 'girl_run';
    this.textureChanged = false;

    this.game.physics.arcade.enable(this);
		// this.body.collideWorldBounds = true;
    this.body.setSize(32, 32, 0, 16);
    

    
    this.oldDirection = '';
    this.data.direction = this.data.direction || 'down';
    this.data.gender = data.gender;
    this.moving = false;
    this.changedTile = true;
    this.speed = 1;
    this.animationSpeed = 8;
    this.data.currTile = this.data.currTile  || {x:0, y:0};
    


    
    if(this.data.gender == 0){
      this.frontSprite = 'introBoy';
    }else{
      this.frontSprite = 'introGirl';
    }

    this.animations.add('down', [0, 1, 2, 3], this.animationSpeed,true);
		this.animations.add('left', [4, 5, 6, 7], this.animationSpeed,true);
		this.animations.add('right', [8, 9, 10, 11], this.animationSpeed,true);
		this.animations.add('up', [12, 13, 14, 15], this.animationSpeed,true);
    this.idleFrames = {
      "down":  0,
      "left":  4,
      "right": 8,
      "up":    12
    };

    this.frame = this.idleFrames[this.data.direction];


  }

  onkeydown(key){        
  }

  onkeyup(key){
    if(key == Phaser.Keyboard.Z){
      this.speed = 1;
      this.loadTexture(this.normalSpritesheet);
      this.textureChanged = false;
    }

    if(key == Phaser.Keyboard.ENTER && !this.moving){
      //Open menu;    
      let m = new Menu(this.game);
      this.game.setCgo(m);
    }

    if(key == Phaser.Keyboard.X && !this.moving){
      let vector = DIR_VECTORS[this.data.direction];
      let x = (this.data.currTile.x + vector[0]) * CONFIG.TILE_SIZE;
      let y = (this.data.currTile.y + vector[1]) * CONFIG.TILE_SIZE;
      this.action = this.game.add.sprite(x, y);
      this.game.physics.arcade.enable(this.action);
      this.game.physics.arcade.overlap(this.action, DATA.map.actionscripts, this.runScript, null, this);
      this.game.physics.arcade.overlap(this.action, DATA.map.entities, this.runScript, null, this);
    }
  }

  setMapPosition(x, y){
    this.moving = false;
    this.x = CONFIG.TILE_SIZE * x;
    this.y = CONFIG.TILE_SIZE * y - 16;
    this.targetX = this.x;
    this.targetY = this.y + 16;
    this.data.currTile.x = x;
    this.data.currTile.y = y;
  }

  setCollisions(collisions){
    DATA.map.collisions = collisions;
  }

  runScript(player, obj){    
    let index = obj.properties.script;
    let flag = obj.properties.flag;
    if(flag){
      if(!DATA.FLAGS[flag]){
        if(EVENTS[index]){
          EVENTS[index]();
        }
        PKMN.setFlag(obj.properties.flag);
      }
    }else{
      if(EVENTS[index]){
        EVENTS[index]();
      }
    }
  }

  teleport(player, warp){
    this.game.state.restart(true, false, warp.properties.map, warp.properties.x, warp.properties.y)
  }

  encounter(player, grass){
    grass.animations.play('rustling')
    // 25% Probability of wild pokemon encounter
    let encounterProbability = Math.random();    
    if(encounterProbability < 0.25){
      // Worst Probability script ever.
      // Base in http://pokemonessentials.wikia.com/wiki/Wild_encounters
      // I will have 12 lines to write pokemons that can appear, 
      // each line has a specific probability (20, 20, 10, 10, 10, 10, 5, 5, 4, 4, 1, 1) respectively
      let randPokemon = Math.random();
      if(randPokemon < .20 ){
        console.log('Pokemon1')
      }else if(randPokemon > .20 && randPokemon < .40  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .40 && randPokemon < .50  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .50 && randPokemon < .60  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .60 && randPokemon < .70  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .70 && randPokemon < .80  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .80 && randPokemon < .85  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .85 && randPokemon < .90  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .90 && randPokemon < .94  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .94 && randPokemon < .98  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .98 && randPokemon < .99  ){        
        console.log('Pokemon1')
      }else if(randPokemon > .99 && randPokemon < 1  ){        
        console.log('Pokemon1')
      }
      this.game.state.start('Battle');
    }

  }

  update(){  
    // Check for collisions
    let vector = DIR_VECTORS[this.data.direction];
    if(this.moving && this.changedTile){
      let nextX = this.data.currTile.x + vector[0];          
      let nextY = this.data.currTile.y + vector[1];
      // Keep the player in the wolrd bounds
      if(nextX < 0 || nextY < 0 || nextY > DATA.map.collisions.layer.data.length-1 || nextX > DATA.map.collisions.layer.data[0].length-1){
        this.moving = false;
        this.targetX = this.data.currTile.x * CONFIG.TILE_SIZE;
        this.targetY = this.data.currTile.y * CONFIG.TILE_SIZE;
        this.frame = this.idleFrames[this.data.direction];
      }else{
        let nextTile = DATA.map.collisions.layer.data[nextY][nextX];
        if(nextTile.properties.collide){
            this.moving = false;
            this.targetX = this.data.currTile.x * CONFIG.TILE_SIZE;
            this.targetY = this.data.currTile.y * CONFIG.TILE_SIZE;
            this.frame = this.idleFrames[this.data.direction];
            // pLay collision sound
        }else{
          this.data.currTile.x = nextX;
          this.data.currTile.y = nextY;
          this.changedTile = false;          
        }
      }
    }

    if(this.moving){
      
      this.animations.play(this.data.direction);
      this.body.x += vector[0] * this.speed;
      this.body.y += vector[1] * this.speed;
      DATA.map.entities.sort('y', Phaser.Group.SORT_DECSENDING);
      
      // collision with NPCs and Objects
      let collide = this.game.physics.arcade.collide(this, DATA.map.entities);
      if(collide){
        this.moving = false;
        this.data.currTile.x -= vector[0];
        this.data.currTile.y -= vector[1];
        this.targetX = this.data.currTile.x * CONFIG.TILE_SIZE;
        this.targetY = this.data.currTile.y * CONFIG.TILE_SIZE;
        this.frame = this.idleFrames[this.data.direction];
      }
    }

    if(this.targetX == this.body.x && this.targetY == this.body.y && !this.changedTile){
      this.moving = false;
      this.frame = this.idleFrames[this.data.direction];
      this.changedTile = true;
      DATA.map.entities.sort('y', Phaser.Group.SORT_DECSENDING);
      this.game.physics.arcade.overlap(this, DATA.map.triggerscripts, this.runScript, null, this);      
      this.game.physics.arcade.overlap(this, DATA.map.warps, this.teleport, null, this);
      this.game.physics.arcade.overlap(this, DATA.map.grass, this.encounter, null, this);
    }


    if(!this.moving && this.game.cgo == this){
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.targetY -= CONFIG.TILE_SIZE;
        this.oldDirection = this.data.direction;
        this.data.direction = "up";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        this.targetY += CONFIG.TILE_SIZE;
        this.oldDirection = this.data.direction;
        this.data.direction = "down";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.targetX -= CONFIG.TILE_SIZE;
        this.oldDirection = this.data.direction;
        this.data.direction = "left";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.targetX += CONFIG.TILE_SIZE;
        this.oldDirection = this.data.direction;
        this.data.direction = "right";
        this.moving = true;
      }

      if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
        if(!this.textureChanged){
          this.speed = 2;
          this.loadTexture(this.runSpritesheet);
          this.textureChanged = true;
        }
      }
    }

    if(!this.moving){      
      this.animations.stop();
    }

    

  }

}

export default Player;
