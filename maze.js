var generator = require('generate-maze');
var url_parser = require ('querystring');
var toAscii = require ('./toAscii.js');

var generateMaze = function (request, response)
{
  var query = request.url.split ("?")[1];
  var data = url_parser.parse (query);
  var x = data.x || 5;
  var y = data.y || 5;

  var maze = getMaze (x, y);
  console.log (maze.render);

  var isRender = data.render || false;

  if (isRender)
    response.end (maze.render);
  else
  {
    response.setHeader ("Content-Type", "application/json");
    response.end (JSON.stringify(maze));
  }
};

function getMaze (x, y)
{
  var grid = generator(x, y);
  var maze = {
    data: grid,
    render: toAscii (grid)
  };
  return maze;
}

exports.generateMaze = generateMaze;
