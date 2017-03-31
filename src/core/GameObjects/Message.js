import CONFIG from '../config';

class Message extends Phaser.Group{
  constructor(game, text, keep){
    super(game);
    let y = this.game.camera.view.y + 288
    let x = this.game.camera.view.x
    let paddingTop = 10;
    let paddingLeft = 25;

    // set the messagebox at the top when overloap the player.
    if(this.game.player && y - this.game.player.y < 64) y = this.game.camera.view.y;
    
    var windowSkin = new Phaser.NinePatchImage(this.game, x, y, 'speech_hgss_1');
    windowSkin.targetWidth = 512;
    windowSkin.targetHeight = 96;

    this.paragraphs = this.generateLines(text);
    this.paragraphsIndex = 0;
    this.linesIndex = 0;
    
    this.line1 =  this.game.add.text(x+paddingLeft, y+paddingTop, "", CONFIG.FONT_STYLE);
    this.line2 =  this.game.add.text(x+paddingLeft, y+paddingTop+40, "", CONFIG.FONT_STYLE);
    
    this.keep = keep || false;
    // this.game.player.lock()
    // this.game.GFX.select.play();

    this.addMultiple([windowSkin, this.line1, this.line2])
    this.showNextLine()
  }

  generateLines(text){
    let paras = text.split('[/p]');
    let paragraphs = [];
    let charsXLine = 35;
    
    for (var p of paras){
      let paragraph = [];
      let lines = p.split('[/n]');
      for (var line of lines){
        if(line.length < charsXLine){
          paragraph.push(line)
          continue;
        }
        let done = false;
        do{
          let found =  false;
          for (var i = charsXLine - 1; i >= 0; i--) {
            if (this.checkWhitespace(line[i])) {
              paragraph.push(line.slice(0, i))
              line = line.slice(i + 1);
              found = true;
              break;
            }
          }
          if (!found) {
            paragraph.push(line.slice(0, charsXLine))
            line = line.slice(charsXLine);
          }
          if (line.length < charsXLine) {
            paragraph.push(line)
            done = true;
          }
        }while(!done);
      }
      paragraphs.push(paragraph)
    }
    return paragraphs;
  }

  checkWhitespace(char){
    var whitespace = new RegExp(/^\s$/);
    return whitespace.test(char);
  }

  showNextLine(){        
    if(!this.alive) return;
    if(this.paragraphsIndex == this.paragraphs.length){
        this.alive = false;
        if(!this.keep){
          this.game.eventEndSignal.dispatch();
          this.destroy();
        }
        return;
    }
    // this.game.GFX.select.play();
    this.line1.text = this.paragraphs[this.paragraphsIndex][this.linesIndex];
    this.line2.text = "";
    this.linesIndex++;
    if(this.linesIndex < this.paragraphs[this.paragraphsIndex].length - 1){
      this.line2.text = this.paragraphs[this.paragraphsIndex][this.linesIndex];
    }else if(this.linesIndex < this.paragraphs[this.paragraphsIndex].length){
      this.line2.text = this.paragraphs[this.paragraphsIndex][this.linesIndex];
      this.linesIndex = 0;
      this.paragraphsIndex++;
    }else{
      this.linesIndex = 0;
      this.paragraphsIndex++;
    }
    this.formatMessage()
  }

  formatMessage(){
    this.line1.text = this.line1.text.replace("[player]", "PLAYERNAME")
  }


  onkeyup(key){
    if(key == Phaser.Keyboard.X || key == Phaser.Keyboard.Z || key == Phaser.Keyboard.ENTER){
      this.showNextLine();
    }
  }

  update(){
  }
}
export default Message;
