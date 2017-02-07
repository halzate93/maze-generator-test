var http = require ('http');
var maze = require ('./maze');

var server = http.createServer (maze.generateMaze);
var port = process.env.PORT || 3000;

console.log ("Start listening");
server.listen (port);
