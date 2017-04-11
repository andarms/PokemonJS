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
      WHITE: { font: "32px power_clearregular", fill: "#fff", stroke: "#000", strokeThickness:2},
      BLACK_SM: { font: "24px power_clearregular", fill: "#000"},
      WHITE_SM: { font: "24px power_clearregular", fill: "#fff", stroke: "#000", strokeThickness:2},
      BLACK_XS: { font: "18px power_clearregular", fill: "#000"},
      WHITE_XS: { font: "18px power_clearregular", fill: "#fff", stroke: "#000", strokeThickness:1},
    }
};
export default CONFIG;
