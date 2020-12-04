// java 服务容器 tomcat
// .net 服务容器 IIS
// php 服务容器 apache

// nodeJS 没有服务容器，手写服务容器

// 服务器  电脑  
// 应用服务器
// web服务器

const http = require("http");
const server = http.createServer();
server.on("request",function(request,response){
    // console.log("hello")
    // 1.判断路径，访问index.html路径
    // 2.读index.html文件
    // 3.把对应的index.html文件的内容做展示
})
//服务器代码只要改动，就一定要重启服务器
server.listen(3000)