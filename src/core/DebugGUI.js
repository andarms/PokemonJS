class DebugGUI extends dat.GUI {
  constructor() {
    super();
    this.value = 0;
    this.listen = 0;
  }

  setupGUI(that) {
    this.remember(that);
    this.debugFolder = this.addFolder('Debug');
    this.debugFolder.add(that, 'skipTitle').name('Skip Title Screen');
    this.debugFolder.open();
  }
}

export default DebugGUI;
