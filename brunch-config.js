// See http://brunch.io for documentation.

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'game.js':   /^src\/core/,
        'vendor.js': /(^bower_components|node_modules|vendor)\//
      }
    }
  },
  npm: {
    static: [
      'node_modules/phaser-ce/build/phaser.js',
    ]
  },
  paths: {
    public: 'build',
    watched: ['src']
  },
  plugins: {
    babel: {
      ignore: /^(bower_components|node_modules|vendor)/
    }
  }
};
