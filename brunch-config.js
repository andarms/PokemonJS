// See http://brunch.io for documentation.

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'game.js':   /^src\/core/,
        'modules.js': /(^bower_components|node_modules)\//,
        'vendor.js': /^vendor\/libs/
      }
    }
  },
  npm: {
    static: [
      'node_modules/phaser-ce/build/phaser.js'
    ]
  },
  paths: {
    public: 'build',
    watched: ['src', 'vendor']
  },
  plugins: {
    babel: {
      ignore: /^(bower_components|node_modules|vendor)/
    }
  }
};
