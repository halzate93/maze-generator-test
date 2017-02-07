var http = require ('http');

var handle = function (request, response)
{
  response.write ("Hello");
  response.end ();
};

var server = http.createServer (handle);

console.log ("Start listening");
server.listen (8080);
