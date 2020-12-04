const fs=require('fs')

const rf=function (path) {
    console.log(path)
    fs.access(path,err=>{
        if (err){
            throw  err
        }
        fs.readFile(path,'utf8',(err,data)=>{
            console.log(data)
        })
    })
}

module.exports=rf
