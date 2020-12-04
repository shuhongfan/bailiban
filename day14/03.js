const fs=require('fs')

fs.access('./01.js',err=>{
    if (err){
        throw  err
    }
    fs.readFile('./01.js','utf8',(err,data)=>{
        console.log(data)
    })
})
