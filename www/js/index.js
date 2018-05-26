/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');



    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


        var errorCallback = function (message) {
            alert('Error: ' + message);
        };

        var strToUint8Array = function(str){
            var command = Uint8Array.from(
                str.split("").map(function(cha){
                  //console.log("cha", cha, "codePointAt", cha.codePointAt(0));
                  return cha.codePointAt(0);
              })
            );
            return command;
          }

        var configureMote = function (port, channel, num_pixels, flags) {
            var message = new Uint8Array(8);
            message.set(strToUint8Array("motec"), 0);
            var config = Uint8Array.of(channel, num_pixels, flags);
            message.set(config, 5);
            sendMessage(port, message);


        };

        var colourTheMote = function (port, r, g, b) {
            var numPixels = 16 * 4;
            var message = new Uint8Array(5 + (numPixels * 3));
            message.set(strToUint8Array("moteo"), 0);
            for (var i = 0; i < numPixels; i++) {
                var pixel = Uint8Array.from([b, g, r]);
                message.set(pixel, 5 + (3 * i));
            }
            sendMessage(port, message);
        };
        var sendMessage = function (port, message,callback) {
            var buffer = Buffer.from(message.buffer);
            port.write(
                buffer,
                callback,
                errorCallback
            );

            /*var buffer = Buffer.from(message.buffer);

            try {
                port.write(buffer, function (err) {
                    if (err) {
                        return console.log('Error on write: ', err.message);
                    }
                    console.log('message written');
                });

                // Open errors will be emitted as an error event
                port.on('error', function (err) {
                    console.log('Error: ', err.message);
                });
            } catch (err) {

                console.log('Error: ', err.message);

            }*/
        }


        serial.requestPermission({
                vid: '16d0',
                pid: '08c4'
            },
            function (successMessage) {
                serial.open({
                       // baudRate: 9600
                    },
                    function (successMessage) {
                        configureMote(serial, 1, 16, 0);
                        colourTheMote(serial, 255,0,0 );
                    },
                    errorCallback
                );
            },
            errorCallback
        );

    }
};

app.initialize();