const fs=require('fs')

fs.readFile('./011.js','utf8',function (err,data) {
    if (err){
        console.log('文件或者文件夹不存在')
        console.log(err)
        return
    }
    console.log(data)
})

const data=fs.readFileSync('./01.js','utf8')
console.log(data)
