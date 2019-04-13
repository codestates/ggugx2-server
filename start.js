require('babel-register')({
  presets: ['env']
});
require('babel-polyfill'); // for async/await

module.exports = require('./server.js');
