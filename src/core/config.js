const CONFIG = {
  WIDTH: 512,
  HEIGTH: 384,
  TILE_SIZE: 32,
  KEYBAORD_CONTROLS: [
      Phaser.Keyboard.Z, 
      Phaser.Keyboard.X, 
      Phaser.Keyboard.ENTER,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.LEFT,
    ],
    FONT: {
      BLACK: { font: "32px power_clearregular", fill: "#000"},
      WHITE: { font: "32px power_clearregular", fill: "#fff", strokeThickness:3, stoke: "#000"},
      BLACK_SM: { font: "24px power_clearregular", fill: "#000"},
      WHITE_SM: { font: "24px power_clearregular", fill: "#fff", strokeThickness:3, stoke: "#000"},
      BLACK_XS: { font: "18px power_clearregular", fill: "#000"},
      WHITE_XS: { font: "18px power_clearregular", fill: "#fff", strokeThickness:3, stoke: "#000"},
    }
};
export default CONFIG;
