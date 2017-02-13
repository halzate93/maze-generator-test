var generator = require('generate-maze');
var body_parser = require ('body/json');
var url_parser = require ('querystring');

var generateMaze = function (request, response)
{
  var query = request.url.split ("?")[1];
  var data = url_parser.parse (query);
  var x = data.x | 5;
  var y = data.y | 5;

  var maze = getMaze (x, y);
  response.write (toString (maze));
  response.end ();
};

function toString (maze)
{
  return JSON.stringify (maze);
}

function getMaze (x, y)
{
  var maze = generator(x, y);
  return maze;
}

exports.generateMaze = generateMaze;
