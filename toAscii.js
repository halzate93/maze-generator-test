var toAscii = function toAscii (maze)
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

module.exports = toAscii;
