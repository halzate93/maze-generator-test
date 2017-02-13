var generator = require('generate-maze');
var url_parser = require ('querystring');
var toAscii = require ('./toAscii.js');
var fs = require ('fs');

var generateMaze = function (request, response)
{
  var query = request.url.split ("?")[1];
  var data = url_parser.parse (query);
  var x = data.x || 5;
  var y = data.y || 5;

  getMaze (x, y, function (maze) {
    console.log (maze.render);
    if (data.render)
      response.end (maze.render);
    else
    {
      response.setHeader ("Content-Type", "application/json");
      response.end (JSON.stringify(maze));
    }
  });
};

function getMaze (x, y, onFinished)
{
  loadMaze (function (maze, date) {
    if (!maze || checkExpiration (date))
    {
      maze = buildNewMaze (x, y);
      saveMaze (maze);
    }
    onFinished (maze);
  });
}

function loadMaze (onLoaded)
{
  fs.readFile('/tmp/maze', (err, data) => {
    if (err)
      console.log ("Couldn't load maze");
    else
      console.log ("Loaded maze");
      var stats = fs.statSync("/tmp/maze");
      var mtime = new Date(stats.mtime);
    onLoaded (JSON.parse (data), mtime);
  });
}

function checkExpiration (date)
{
  return date.getDate () != new Date ().getDate ();
}

function saveMaze (maze)
{
  console.log (maze.render);
  fs.writeFile("/tmp/maze", JSON.stringify (maze), function(err) {
      if(err)
      {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}

function buildNewMaze (x, y)
{
  var grid = generator(x, y);
  var maze = {
    data: grid,
    render: toAscii (grid)
  };
  return maze;
}

exports.generateMaze = generateMaze;
