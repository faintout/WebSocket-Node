// const http = require('http');
const WebSocket = require('ws');
const fs = require('fs')
// const buffer = require('buffer');

//创建服务器
const server = require("http").createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200; 
    fs.readFile("index.html", (err, data) => {
        if(err){
            res.end("error");
            return
        }
        res.end(data)
    })
})
//使用websocket
const ws = new WebSocket.Server({port:8080});
ws.on("connection", (ws,req) => {
    console.log('ws._socket.remoteAddress',req.connection.remoteAddress);
    //发送消息给客户端
    ws.send("已连接客户端"+ws._socket.remoteAddress)
    //监听客户端发来的消息
    ws.on("message", e => {
        //接收到的是一个buffer类型的数据，如<Buffer 68 65 6c 6c 6f 20 73 65 72 76 65 72>
        console.log(e.toString())   //将buffer转为字符串
        //传递给web
        ws.send(e.toString())
    })
})

//添加监听
server.listen(3001, () => {
    console.log("localhost:3001")
})