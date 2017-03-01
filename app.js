const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end(fs.readFileSync(__dirname + '/client/index.html', 'utf-8'));
	}).listen(3000);
 
 const io = socketio.listen(server);

 io.sockets.on('connection', function(socket) {
 	socket.on('message', function(data){
 		console.log(data.value);
 		//サーバーからクライアントへのメッセージ折り返し
 		io.sockets.emit('stoc_mes', {value : data.value});
 	});
 });