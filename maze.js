var generator = require('generate-maze');
var url_parser = require ('querystring');

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
