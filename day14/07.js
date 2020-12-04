const http=require('http')
const fs=require('fs')

const server=http.createServer()

server.on('request',function (req,res) {
    if (req.url=='/index'){
        res.end('index')
    } else if (req.url=='/login'){
        res.end('login')
    } else if (req.url='/rf'){
        fs.readFile('./test.txt','utf8',(err,data)=>{
            res.end(data)
        })
    }
})

server.listen(3000)
