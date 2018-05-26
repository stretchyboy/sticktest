cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-serial.Serial",
    "file": "plugins/cordova-plugin-serial/www/serial.js",
    "pluginId": "cordova-plugin-serial",
    "clobbers": [
      "window.serial"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-serial": "0.0.3"
};
// BOTTOM OF METADATA
});