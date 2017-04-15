class DebugGUI extends dat.GUI {
  constructor() {
    super();
    this.value = 0;
    this.listen = 0;
  }

  setupGUI(debug, game) {
    this.remember(debug);
    this.debugFolder = this.addFolder('Debug');
    this.musicFolder = this.addFolder('Music');

    this.debugFolder.add(debug, 'skipTitle').name('Skip Title Screen');

    this.remember(game.sound);
    this.musicFolder.add(game.sound, 'mute').name('Mute');
    this.musicFolder.add(game.sound, 'volume', 0, 1).name('Volumen');
    this.close();
  }
}

export default DebugGUI;
