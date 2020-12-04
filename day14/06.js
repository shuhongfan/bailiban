const fs=require('fs')

fs.writeFile('./test.txt','hello world ~~~','utf8',err=>console.log(err))

fs.writeFileSync('./test.txt','hahahahah','utf8')

fs.appendFile('./test.txt','hello world ~~~','utf8',err=>console.log(err))
