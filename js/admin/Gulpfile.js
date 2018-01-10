var flarum = require('flarum-gulp');

flarum({
  modules: {
    'antoinefr/online': [
      'src/**/*.js'
    ]
  }
});