var generator = require('generate-maze');
var body_parser = require ('body/json');
var url_parser = require ('querystring');

var generateMaze = function (request, response)
{
  var query = request.url.split ("?")[1];
  var data = url_parser.parse (query);
  var x = data.x;
  var y = data.y;

  var maze = getMaze (x, y);
  maze.render = toAscii (maze);
  console.log (maze.render);
  response.write (maze.render);
  response.end ();
};

function getMaze (x, y)
{
  var maze = generator(x, y);
  return maze;
}

function toAscii (maze)
{
  var render = "";
  for (var y=0; y<maze.length; y++)
  {
    render += drawTop (maze[y]) + "\n";
    render += drawSides (maze[y]) + "\n";
  }
  render += drawBottom (maze[maze.length - 1]) + "\n";
  return render;
}

function drawTop (row)
{
  var top = "";
  for (x=0; x<row.length; x++)
  {
    top += "+";
    top += row[x].top? "---" : "   ";
  }
  top += "+";
  return top;
}

function drawSides (row)
{
  var sides = "";
  for (var x=0; x<row.length; x++)
  {
    sides += row[x].left? "|" : " ";
    sides += "   ";
  }
  sides += row[row.length - 1].right? "|" : " ";
  return sides;
}

function drawBottom (row)
{
  var bottom = "";
  for (var x=0; x<row.length; x++)
  {
    bottom += "+";
    bottom += row[x].bottom? "---" : "   ";
  }
  bottom += "+";
  return bottom;
}
exports.generateMaze = generateMaze;
