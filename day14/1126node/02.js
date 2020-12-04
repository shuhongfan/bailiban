const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

const server = http.createServer();
server.on("request",function(req,res){   //req表示请求，res表示响应
    let urlObj = url.parse(req.url,true);   //格式化url地址编程对象
    let pathname = urlObj.pathname;   //获取路径
    let query = urlObj.query;     //获取get参数
    // 静态伺服   专门去配置前端界面用的
    if(pathname == "/reg.html" && req.method == "GET"){
        fs.readFile("./reg.html","utf8",(err,data) => {
            res.end(data);
        })
    }


    // 写接口
    else if(pathname == "/register_validation" && req.method == "GET"){
        console.log(query)
        res.end("123")
    }else if(pathname == "/register" && req.method == "POST"){
        let data = "";
        req.on("data",function(chunk){
            data = data + chunk
        })
        req.on("end",function(){
            let dataObj = querystring.parse(data);
            fs.readFile("./data/data.json","utf8",(err,data) => {
                let dataObj1 = JSON.parse(data);
                dataObj1.push(dataObj);
                let dataObjStr = JSON.stringify(dataObj1)
                console.log(dataObjStr)
                fs.writeFile("./data/data.json",dataObjStr,err => {
                    res.end("1")  //表示成功
                })
            })
        })
    }



})
server.listen(3000)