var http = require('http');
const fs = require('fs');



const server = http.createServer(function(request, response)
{
    console.log(request.method);

    fs.readFile('index.html', function (err, data) 
    {
        if (err) 
        {
            // response.writeHead(404, {'Content-Type': 'text'});
            return response.end("404 Not Found");
        }
        
        // response.writeHead(200, { 'Content-Type': 'text' });
        return response.end(data);
    });
    
});

server.on('listening', () => 
{
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.listen(8080);