const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const sql = require('../conf/mysql.js');
const crypto = require('crypto');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
// 使用jsonwebtoken
var jwt = require('jsonwebtoken');
var priavteKey = "ABCDEFGHTIJLASJDOQGG"
// 使用 Mockjs
var Mock = require('mockjs')

// token生成、校验
function create(username, mobile){
    let token = jwt.sign(
        { username, mobile },
        priavteKey,
        { expiresIn: '1h', noTimestamp: true }
    )
    return token
}
function vertify(token){
    try {
        let decoded = jwt.verify(token, priavteKey)
        return decoded
    } catch (error) {
        // console.log('[Token Error]:', error)
        return null
    }
}
// 拦截请求
var auth = async (req, res, next) => {
// 登录请求不需要拦截
    if (req.path == '/user/login' || req.path == '/user/register' || req.path == '/mock') {
        next();
        return;
    }
    // console.log( req.headers.token)
    let token = req.headers.token
    let decoded = vertify(token);
    // console.log(token,decoded)
    // tokn不合法时，直接返回错误值。
    if (!token || !decoded) {
        res.send({code:500,msg:'未登录或登录超时（为方便测试1小时token过期），请重新登录！！！'})
        return
    }
    //token合法时，保存数据，进入下一个中间件。
    // req.body.userId = decoded.userId
    // req.body.username = decoded.username
    next()
};
app.use(auth)


// 模拟用户数据
app.post("/mock",(req,res)=>{
    // 获取 mock.Random 对象
    const Random = Mock.Random;
    // 拓展mockjs
    Mock.Random.extend({
        phone: function () {
            var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
            return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
        }
    })
    var data = Mock.mock({
        data:{
            "list|5":[  //生成|5个如下格式名字的数据
                {
                    "id|+1":1,  //数字从当前数开始后续依次加一
                    "username": "@cname", //名字为随机中文名字
                    "password": "@protocol",
                    'mobile|1': ['@phone'],
                    "gender|1":[1,2,3],  //性别是数组中的一个，随机的
                    'email':"@email",  //随机邮箱
                    "status|1":[1,2],
                }
            ]
        }
    })
    // res.send(data)
    for (var i = 0; i < 5; i++) {
        const {username,password,mobile,gender,email,status} = data.data.list[i]
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(password).digest("hex");
        sql.query(`insert into user(username,password,mobile,gender,email,status) values('${username}','${newPas}','${mobile}','${gender}','${email}','${status}')`,function(err,result){
            // console.log(err)
            if(err){
                res.send({code:500,msg:'模拟数据失败'+err});
            } else {
                res.send({code:200,msg:'模拟数据成功'});
            }
        });
    }
})

// 用户登录
app.post("/user/login",(req,res)=>{
    // console.log(req)
    let username = req.body.username;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    sql.query(`select * from user where username ='${username}'`,(err,data)=>{
        if (err){
            res.send({code:500,msg:'发送错误',err})
        } else if (data[0]!=null){
            if (data[0].password === newPas){
                console.log(data[0])
                let token = create(data[0].username,data[0].mobile)
                // res.cookie("vueadmin",data[0],{maxAge: 1800, httpOnly: true});
                res.send({code:200,msg:'登录成功',id:data[0].id,token})
            } else {
                res.send({code:500,msg:'用户名或密码错误',username})
            }
        } else {
            res.send({code:500,msg:'用户名或密码错误',username})
        }
    })
})

// 用户登出
// app.post('/user/logout',function (req,res) {})

// 用户注册
app.post('/user/register',function(req,res){
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;
    var status = 1;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    sql.query(`insert into user(username,password,status) values('${username}','${newPas}','${status}')`,function(err,result){
        // console.log(err)
        if(err){
            res.send({code:500,msg:'注册失败'+err});
        }else {
            res.send({code:200,msg:'注册成功',id:result.insertId});
        }
    });
});

// 获取所有用户接口
app.post('/users',function(req,res){
    sql.query('select * from user',function(err,result){
        if (err) {
            res.send({code:500,title:"用户列表",datas:[]})
        }else{
            result.map(item => delete(item['password']))
            res.send({code:200,title:"用户列表",datas:result})
        }
    });
});

// 查询单个用户
app.post('/user/query',function(req,res){
    var id = req.body.id
    sql.query('select * from user where id='+id,function(err,result){
        if (err) {
            res.send({code:500,msg:'查询失败'+err})
        }else{
            let resData = JSON.parse(JSON.stringify(result))
            delete(resData[0].password)
            res.send({code:200,msg:'查询成功',datas:resData})
        }
    });
});

// 添加用户
app.post('/user/add',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var gender = req.body.gender;
    var email = req.body.email;
    var status = req.body.status;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    sql.query(`insert into user(username,password,mobile,gender,email,status) values('${username}','${newPas}','${mobile}','${gender}','${email}','${status}')`,function(err,result){
        // console.log(err)
        if(err){
            res.send({code:500,msg:'新增失败'+err});
        }else {
            res.send({code:200,msg:'新增成功',id:result.insertId});
        }
    });
});

// 修改用户信息
app.post('/user/edit',function(req,res){
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var gender = req.body.gender;
    var email = req.body.email;
    var status = req.body.status;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    sql.query(`update user set
                       username = '${username}',
                       password = '${newPas}',
                       mobile = '${mobile}',
                       gender = '${gender}',
                       email = '${email}',
                       status = '${status}'
                   where id = ${id}`,function(err,result){
        if (err) {
            res.send({code:500,msg:'更新失败'+err});
        }else{
            res.send({code:200,msg:'更新成功',id:id})
        }
    })
});


// 用户删除接口
app.post('/user/del',function(req,res){
    console.log(req.body)
    var id = req.body.id;
    sql.query('delete from user where id = '+id,function(err,result){
        // console.log(result)
        if(err){
            res.send({msg:'删除失败'+err,id:id});
        }else if (result.affectedRows!=0) {
            res.send({code:200,msg:'删除成功',id:id});
        } else {
            res.send({code:500,msg:'id不存在',id:id})
        }
    });
});


// 获取视频地址接口
app.post('/video',function(req,res){
    sql.query('select * from video',function(err,result){
        if (err) {
            res.send({code:500,title:"视频列表",datas:[]})
        }else{
            res.send({code:200,title:"视频列表",datas:result})
        }
    });
});

// 获取测试题目接口
app.post('/test',function(req,res){
    sql.query('select * from test',function(err,result){
        if (err) {
            res.send({code:500,title:"试题列表",datas:[]})
        }else{
            result.map(item => delete(item['password']))
            res.send({code:200,title:"试题列表",datas:result})
        }
    });
});
module.exports=app;
