var http = require ('http');

var handle = function (request, response)
{
  response.write ("Hello");
  response.end ();
};

var server = http.createServer (handle);
var port = process.env.PORT || 3000;

console.log ("Start listening");
server.listen (port);
