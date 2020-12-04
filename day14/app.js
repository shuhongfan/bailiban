const http=require('http')
const path=require("path")
const fs=require("fs")
const querystring=require("querystring")
const url=require('url')

const server=http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域
})

server.on("request",function (req,res) {
    let urlObj=url.parse(req.url,true) // 格式化编程对象
    let pathname=urlObj.pathname  // 获取路径
    let query=urlObj.query  // 获取参数
    // console.log(urlObj,pathname,query)

    // 显示页面
    if(pathname=='/register.html' && req.method=='GET'){ //注册
        fs.readFile('./register.html','utf8',(err,data)=>{
            res.end(data)
        })
    }
    if(pathname=='/login.html' && req.method=='GET'){ // 登录
        fs.readFile('./login.html','utf8',(err,data)=>{
            res.end(data)
        })
    }
    if(pathname=='/index_getdata.html' && req.method=='GET'){ // 登录
        fs.readFile('./index_getdata.html','utf8',(err,data)=>{
            res.end(data)
        })
    }
    if(pathname=='/add_data.html' && req.method=='GET'){ // 增加数据
        console.log(query)
        let add_dataID=query.uname
        fs.readFile('./add_data.html','utf8',(err,data)=>{
            res.end(data)
        })
    }

    // 服务器处理 返回数据
    if (pathname=='/register_validation' && req.method=='GET'){ // 用户名验证
        console.log(query)
        let reg_uname=/^[a-zA-Z]{4,20}$/
        if(reg_uname.test(query.uname)){
            fs.readFile("./data/data.json",'utf8',(err,data)=>{
                let result = JSON.parse(data).some(item=>{
                    if(item.uname==query.uname){
                        return true
                    }
                })
                console.log(result)
                res.end(result==true?'0':'1')
            })
        } else {
            res.end('3')
        }
    }
    if (pathname=='/register' && req.method=="POST"){ // 注册
        let data=''
        req.on("data",function (chunk) {
            console.log(chunk.toString()) // post提交的数据
            data=data+chunk
        })
        req.on('end',function () {
            let dataObj=querystring.parse(data) //格式化data数据
            let reg_uname=/^[a-zA-Z]{4,20}$/
            let reg_upassword=/^[a-zA-Z0-9]{6,12}$/
            // 判断是否符合规范
            console.log(reg_upassword.test(dataObj.upassword))
            if(!reg_uname.test(dataObj.uname) || !reg_upassword.test(dataObj.upassword)){
                console.log('aaa')
                res.end('3')
                return false
            } else {
                fs.readFile("./data/data.json",'utf8',(err,data)=>{
                    let dataObj1=JSON.parse(data) // 原始对象 字符串转对象

                    // 判断是否唯一
                    let result = dataObj1.some(item=>{
                        // console.log(item.uname,dataObj.uname)
                        if(item.uname==dataObj.uname){
                            return true
                        }
                    })
                    // console.log(result)
                    if (result){
                        return res.end('4')
                    }

                    dataObj1.push(dataObj)  // 添加最新data数据
                    let dataObjStr=JSON.stringify(dataObj1) //对象数组转字符串
                    fs.writeFile('./data/data.json',dataObjStr,err=>{ // 写入文件
                        res.end("1") // 返回成功
                    })
                })
            }
        })
    }
    if (pathname=='/login' && req.method=="POST") { //登录
        let data = ''
        req.on("data", function (chunk) {
            console.log(chunk.toString()) // post提交的数据
            data = data + chunk
        })
        req.on('end', function () {
            let dataObj = querystring.parse(data) //格式化data数据
            let reg_uname = /^[a-zA-Z]{4,20}$/
            let reg_upassword = /^[a-zA-Z0-9]{6,12}$/
            // 判断是否符合规范
            console.log(reg_upassword.test(dataObj.upassword))
            if (!reg_uname.test(dataObj.uname) || !reg_upassword.test(dataObj.upassword)) {
                res.end('3')
                return false
            } else {
                fs.readFile("./data/data.json", 'utf8', (err, data) => {
                    let dataObj1 = JSON.parse(data) // 原始对象 字符串转对象
                    let index=dataObj1.findIndex(item=>item.uname==dataObj.uname)
                    // console.log(index)
                    let result=dataObj1[index]
                    // console.log(result)
                    if (result.upassword==dataObj.upassword){
                        return res.end('1')
                    } else {
                        return res.end('2')
                    }
                })
            }
        })
    }
    if (pathname=='/index_getdata' && req.method=='GET'){ // 主页获取数据
        console.log(query)
        let reg_uname=/^[a-zA-Z]{4,20}$/
        if(reg_uname.test(query.uname)){
            fs.readFile("./data/data.json", 'utf8', (err, data) => {
                if (err){
                    return res.end('6')
                }
                let dataObj1 = JSON.parse(data) // 原始对象 字符串转对象
                let index=dataObj1.findIndex(item=>item.uname==query.uname)
                // console.log(index)
                if (index==-1){
                    res.end('5')
                    return false
                }
                let result=dataObj1[index]
                console.log(result)
                return res.end(JSON.stringify(result))
            })
        } else {
            return res.end('404')
        }

    }
    if (pathname=='/add_data' && req.method=="POST") { //增加
        let data = ''
        req.on("data", function (chunk) {
            console.log(chunk.toString()) // post提交的数据
            data = data + chunk
        })
        req.on('end', function () {
            let data = ''
            req.on("data", function (chunk) {
                console.log(chunk.toString()) // post提交的数据
                data = data + chunk
            })
            let dataObj = querystring.parse(data) //格式化data数据
            let reg_uname = /^[a-zA-Z]{4,20}$/
            let reg_name = /^[\u4e00-\u9fa5]{2,6}$/
            let reg_sex = /^0$|^1&/
            let reg_age = /^\d{1,3}$/
            let reg_mail = /^\w{3,12}@\w{1,5}\.[a-z]{2,3}$/;
            let reg_phone = /^1[3456789]d{9}$/
            // 判断是否符合规范
            if (!reg_uname.test(dataObj.uname)) {
                res.end('3')
                return false
            } else if (!reg_name.test(dataObj.name)){
                res.end('5')
                return false
            }else if (!reg_mail.test(dataObj.mail)){
                res.end('7')
                return false
            }else if (!reg_age.test(dataObj.age)){
                res.end('6')
                return false
            }else if (!reg_phone.test(dataObj.phone)){
                res.end('8')
                return false
            } else {
                fs.readFile("./data/data.json", 'utf8', (err, data) => {
                    if (err){
                        return res.end('4')
                    }
                    let dataObj1 = JSON.parse(data) // 原始对象 字符串转对象
                    let index=dataObj1.findIndex(item=>item.uname==dataObj.uname)
                    console.log(index)
                    // if (index==-1){
                    //     res.end('3')
                    //     return false
                    // }
                    // let result=dataObj1[index]
                    // console.log(result)
                    // return res.end(JSON.stringify(result))
                })
            }
        })
    }
})
server.listen(3000)
