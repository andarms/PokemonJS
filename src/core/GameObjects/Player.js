import CONFIG from '../config';
import DATA   from '../Data';
import EVENTS from '../Events';
import {PKMN} from '../main';

let DIR_VECTORS = {
  "left":  [-1, 0], 
  "right": [1, 0],
  "up":    [0, -1], 
  "down":  [0, 1] 
}

class Player extends Phaser.Sprite{
  constructor(game, gender){
    let spritesheet = 'trchar00' + gender;
    super(game, 0, 0, spritesheet);
    
    this.normalSpritesheet = spritesheet;
    this.runSpritesheet = gender == 0 ? 'boy_run': 'girl_run';
    this.textureChanged = false;

    this.game.physics.arcade.enable(this);    
		// this.body.collideWorldBounds = true;
    this.body.setSize(32, 32, 0, 16);
    

    
    this.oldDirection = '';
    this.direction = 'down';
    this.gender = gender;
    this.moving = false;
    this.changedTile = true;
    this.speed = 1;
    this.animationSpeed = 8;
    this.currentTile = {x:0, y:0};
    


    
    if(this.gender == 0){
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
    }

    if(key == Phaser.Keyboard.X && !this.moving){
      let vector = DIR_VECTORS[this.direction];
      let x = (this.currentTile.x + vector[0]) * CONFIG.TILE_SIZE;
      let y = (this.currentTile.y + vector[1]) * CONFIG.TILE_SIZE;
      this.action = this.game.add.sprite(x, y);
      this.game.physics.arcade.enable(this.action);
      this.game.physics.arcade.overlap(this.action, DATA.map.actionscripts, this.runScript, null, this);
    }
  }

  setMapPosition(x, y){
    this.moving = false;
    this.x = CONFIG.TILE_SIZE * x;
    this.y = CONFIG.TILE_SIZE * y - 16;
    this.targetX = this.x;
    this.targetY = this.y + 16;
    this.currentTile.x = x;
    this.currentTile.y = y;
  }

  setCollisions(collisions){
    DATA.map.collisions = collisions;
  }

  runScript(player, tile){    
    let index = tile.properties.name;
    let flag = tile.properties.flag;
    if(flag){
      if(!DATA.FLAGS[flag]){
        if(EVENTS[index]){
          EVENTS[index]();
        }
        PKMN.setFlag(tile.properties.flag);
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
      PKMN.start(this);
      let randPokemon = Math.random();
      if(randPokemon < .20 ){
        PKMN.msgbox("Pokemon #1 has appear");        
      }else if(randPokemon > .20 && randPokemon < .40  ){        
        PKMN.msgbox("Pokemon #2 has appear");                
      }else if(randPokemon > .40 && randPokemon < .50  ){        
        PKMN.msgbox("Pokemon #3 has appear");                
      }else if(randPokemon > .50 && randPokemon < .60  ){        
        PKMN.msgbox("Pokemon #4 has appear");                
      }else if(randPokemon > .60 && randPokemon < .70  ){        
        PKMN.msgbox("Pokemon #5 has appear");                
      }else if(randPokemon > .70 && randPokemon < .80  ){        
        PKMN.msgbox("Pokemon #6 has appear");                
      }else if(randPokemon > .80 && randPokemon < .85  ){        
        PKMN.msgbox("Pokemon #7 has appear");                
      }else if(randPokemon > .85 && randPokemon < .90  ){        
        PKMN.msgbox("Pokemon #8 has appear");                
      }else if(randPokemon > .90 && randPokemon < .94  ){        
        PKMN.msgbox("Pokemon #9 has appear");                
      }else if(randPokemon > .94 && randPokemon < .98  ){        
        PKMN.msgbox("Pokemon #10 has appear");                
      }else if(randPokemon > .98 && randPokemon < .99  ){        
        PKMN.msgbox("Pokemon #11 has appear");                
      }else if(randPokemon > .99 && randPokemon < 1  ){        
        PKMN.msgbox("Pokemon #12 has appear");                
      }
      PKMN.release();
      PKMN.end();
    }

  }

  update(){  
    // Check for collisions
    let vector = DIR_VECTORS[this.direction];
    if(this.moving && this.changedTile){
      let nextX = this.currentTile.x + vector[0];          
      let nextY = this.currentTile.y + vector[1];
      // Keep the player in the wolrd bounds
      if(nextX < 0 || nextY < 0 || nextY > DATA.map.collisions.layer.data.length-1 || nextX > DATA.map.collisions.layer.data[0].length-1){
        this.moving = false;
        this.targetX = this.currentTile.x * CONFIG.TILE_SIZE;
        this.targetY = this.currentTile.y * CONFIG.TILE_SIZE;
        this.frame = this.idleFrames[this.direction];
      }else{
        let nextTile = DATA.map.collisions.layer.data[nextY][nextX];
        if(nextTile.properties.collide){
            this.moving = false;
            this.targetX = this.currentTile.x * CONFIG.TILE_SIZE;
            this.targetY = this.currentTile.y * CONFIG.TILE_SIZE;
            this.frame = this.idleFrames[this.direction];
            // pLay collision sound
        }else{
          this.currentTile.x = nextX;
          this.currentTile.y = nextY;
          this.changedTile = false;          
        }
      }
    }

    if(this.moving){
      this.animations.play(this.direction);
      this.body.x += vector[0] * this.speed;
      this.body.y += vector[1] * this.speed;
      DATA.map.entities.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    if(this.targetX == this.body.x && this.targetY == this.body.y && !this.changedTile){
      this.moving = false;
      this.frame = this.idleFrames[this.direction];
      this.changedTile = true;
      this.game.physics.arcade.overlap(this, DATA.map.triggerscripts, this.runScript, null, this);      
      this.game.physics.arcade.overlap(this, DATA.map.warps, this.teleport, null, this);
      this.game.physics.arcade.overlap(this, DATA.map.entities, this.encounter, null, this)
    }


    if(!this.moving && this.game.cgo == this){
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.targetY -= CONFIG.TILE_SIZE;
        this.oldDirection = this.direction;
        this.direction = "up";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        this.targetY += CONFIG.TILE_SIZE;
        this.oldDirection = this.direction;
        this.direction = "down";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.targetX -= CONFIG.TILE_SIZE;
        this.oldDirection = this.direction;
        this.direction = "left";
        this.moving = true;
      }
      else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.targetX += CONFIG.TILE_SIZE;
        this.oldDirection = this.direction;
        this.direction = "right";
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
