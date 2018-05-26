cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-serial/www/serial.js",
        "id": "cordova-plugin-serial.Serial",
        "pluginId": "cordova-plugin-serial",
        "clobbers": [
            "window.serial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-serial": "0.0.3"
}
// BOTTOM OF METADATA
});