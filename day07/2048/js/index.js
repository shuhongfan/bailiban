var game={
    score: 0,// 分数
    data: [], // 数据
    gameRunning: 1,// 游戏进行中的状态
    gameOver: 0,// 游戏结束状态
    status: 1, //游戏的状态，这个状态要时刻和上面的两个状态进行比较，并且判断出游戏目前处于什么状态
    // 游戏开始的函数
    start: function () {
        this.score=0 // 重置分数
        this.status=this.gameRunning //更改游戏状态
        // 初始化游戏数据
        // this.data=[
        //     [0,0,0,0],
        //     [0,0,0,0],
        //     [0,0,0,0],
        //     [0,0,0,0]
        // ]
        for (var r = 0; r < 4; r++) {
            this.data[r]=[] //创建4行
            for (var c = 0; c < 4; c++) {
                this.data[r][c]=0 //创建4列
            }
        }
        // 生成2个随机数
        this.randomNum()
        this.randomNum()
        // 更新显示数据
        this.dataView()
    },
    // 生成随机数的函数，随机生成2或者4,2比4的概率高
    randomNum: function () {
        // 1.生成随机数不能占数组中有数字的地方，生成随机数只能在数组为0的位置进行生成
        // 2.找数组存在0的位置
        // 通过循环不停地找0的位置，当找到数组中有0的位置，放置2或者4，结束循环
        while (true){ // 当
            // 生成0-3的随机整数
            var r=Math.floor(Math.random()*4)
            var c=Math.floor(Math.random()*4)
            if (this.data[r][c]==0){
                // 生成2或者4的随机数
                var num=Math.random() > 0.2 ? 2 : 4
                this.data[r][c]=num
                break
            }
        }
        // for (;;){}
    },
    // 数据更新
    dataView: function () {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                var div=document.getElementById('c'+r+c)
                if (this.data[r][c]!=0){
                    div.innerHTML=this.data[r][c]
                    div.className='cell n'+this.data[r][c]
                } else {
                    div.innerHTML=''
                    div.className='cell'
                }
            }
        }
        // 设置分数
        document.getElementById('score01').innerHTML=this.score
        // 视图更新 关注游戏是否结束
        // 直接根据状态判断游戏是否结束
        if (this.status==this.gameOver){
            document.getElementById('score02').innerHTML=this.score
            document.getElementById('gameover').style.display='block'
        } else {
            document.getElementById('gameover').style.display='none'
        }
    },
    // 判断游戏是否结束的方法
    isGameOver: function () {
        // 1.数组中还有0
        // 2.数组中已经占满，但是左右有相同
        // 3.数组中已经占满，但是上下有相同
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                if (this.data[r][c]==0){
                    return false
                }
                if (c<3){
                    if (this.data[r][c]==this.data[r][c+1]){
                        return false
                    }
                }
                if (r<3){
                    if (this.data[r][c]==this.data[r+1][c]){
                        return false
                    }
                }
            }
        }
        return true //上面三个条件不满足，结束游戏
    },


    // 左移动
    moveLeft: function () {
        // 移动之前 数组记录一次
        // console.log(this.data.toString())
        var before=this.data.toString()

        // 移动的逻辑部分
        // 4行 封装一个函数 循环执行4次即可
        for (var r = 0; r < 4; r++) {
            this.moveLeftInRow(r) //函数只需要管一行就ok，通过参数的形式就可以知道执行第几行
        }

        // 移动之后 数组记录一次
        var after=this.data.toString()

        // 当移动之前的数组不等于移动之后的数组,移动了
        if (before!=after){
            // 1.生成一个随机数
            this.randomNum()
            // 2.生成完了一个随机数,游戏可能结束. 调用判断游戏是否结束的方法
            if (this.isGameOver()){
                this.status=this.gameOver
            }
            // 3.更新视频,调用更新视图的函数
            this.dataView()
        }
    },
    // 处理每一行的逻辑函数
    moveLeftInRow: function (r) {
        // 找后面不为0的位置
        for (var c = 0; c < 3; c++) { // 最右边的不用考虑
            var nextc=this.getNextInRow(r,c)
            if (nextc!=-1){ // 表示当前位置的后面有数字
                console.log(this.data)
                if (this.data[r][c]==0){ // 自己的位置为0 交换
                    this.data[r][c]=this.data[r][nextc]
                    this.data[r][nextc]=0
                    c--;
                } else if (this.data[r][c]==this.data[r][nextc]){ // 两个数相等
                    this.data[r][c] *=2
                    this.data[r][nextc]=0
                    this.score+=this.data[r][c] // 加分
                }
            } else {
                break
            }
        }
    },
    // 查找同行下一个格子
    getNextInRow: function (r,c) {
        for (var i = c+1; i < 4; i++) {
            // 找到了就返回具体的位置
            if (this.data[r][i]!=0){
                return i
            }
        }
        return -1 //没找到就返回一个具体位置
    },



    // 右移动
    moveRight: function () {
        // 移动之前 数组记录一次
        // console.log(this.data.toString())
        var before=this.data.toString()

        // 移动的逻辑部分
        // 4行 封装一个函数 循环执行4次即可
        for (var r = 0; r < 4; r++) {
            this.moveRightInRow(r) //函数只需要管一行就ok，通过参数的形式就可以知道执行第几行
        }

        // 移动之后 数组记录一次
        var after=this.data.toString()

        // 当移动之前的数组不等于移动之后的数组,移动了
        if (before!=after){
            // 1.生成一个随机数
            this.randomNum()
            // 2.生成完了一个随机数,游戏可能结束. 调用判断游戏是否结束的方法
            if (this.isGameOver()){
                this.status=this.gameOver
            }
            // 3.更新视频,调用更新视图的函数
            this.dataView()
        }
    },
    // 处理每一行的逻辑函数
    moveRightInRow: function (r) {
        // 找后面不为0的位置
        for (var c = 3; c > 0; c--) { // 最右边的不用考虑
            var nextc=this.getNextInRowRight(r,c)
            if (nextc!=-1){ // 表示当前位置的后面有数字
                console.log(this.data)
                if (this.data[r][c]==0){ // 自己的位置为0 交换
                    this.data[r][c]=this.data[r][nextc]
                    this.data[r][nextc]=0
                    c++;
                } else if (this.data[r][c]==this.data[r][nextc]){ // 两个数相等
                    this.data[r][c] *=2
                    this.data[r][nextc]=0
                    this.score+=this.data[r][c] // 加分
                }
            } else {
                break
            }
        }
    },
    // 查找同行下一个格子
    getNextInRowRight: function (r,c) {
        for (var i = c-1; i >=0; i--) {
            // 找到了就返回具体的位置
            if (this.data[r][i]!=0){
                return i
            }
        }
        return -1 //没找到就返回一个具体位置
    },


    // 上移动
    moveTop: function () {
        // 移动之前 数组记录一次
        // console.log(this.data.toString())
        var before=this.data.toString()

        // 移动的逻辑部分
        // 4行 封装一个函数 循环执行4次即可
        for (var r = 0; r < 4; r++) {
            this.moveTopInRow(r) //函数只需要管一行就ok，通过参数的形式就可以知道执行第几行
        }

        // 移动之后 数组记录一次
        var after=this.data.toString()

        // 当移动之前的数组不等于移动之后的数组,移动了
        if (before!=after){
            // 1.生成一个随机数
            this.randomNum()
            // 2.生成完了一个随机数,游戏可能结束. 调用判断游戏是否结束的方法
            if (this.isGameOver()){
                this.status=this.gameOver
            }
            // 3.更新视频,调用更新视图的函数
            this.dataView()
        }
    },
    // 处理每一行的逻辑函数
    moveTopInRow: function (r) {
        // 找后面不为0的位置
        for (var c = 0; c < 3; c++) { // 最右边的不用考虑
            var nextc=this.getNextInRowTop(c,r)
            if (nextc!=-1){ // 表示当前位置的后面有数字
                console.log(this.data)
                if (this.data[c][r]==0){ // 自己的位置为0 交换
                    this.data[c][r]=this.data[nextc][r]
                    this.data[nextc][r]=0
                    c--;
                } else if (this.data[c][r]==this.data[nextc][r]){ // 两个数相等
                    this.data[c][r] *=2
                    this.data[nextc][r]=0
                    this.score+=this.data[c][r] // 加分
                }
            } else {
                break
            }
        }
    },
    // 查找同行下一个格子
    getNextInRowTop: function (c,r) {
        for (var i = c+1; i<4 ; i++) {
            // 找到了就返回具体的位置
            if (this.data[i][r]!=0){
                return i
            }
        }
        return -1 //没找到就返回一个具体位置
    },



    // 下移动
    moveDown: function () {
        // 移动之前 数组记录一次
        // console.log(this.data.toString())
        var before=this.data.toString()

        // 移动的逻辑部分
        // 4行 封装一个函数 循环执行4次即可
        for (var r = 0; r < 4; r++) {
            this.moveDownInRow(r) //函数只需要管一行就ok，通过参数的形式就可以知道执行第几行
        }

        // 移动之后 数组记录一次
        var after=this.data.toString()

        // 当移动之前的数组不等于移动之后的数组,移动了
        if (before!=after){
            // 1.生成一个随机数
            this.randomNum()
            // 2.生成完了一个随机数,游戏可能结束. 调用判断游戏是否结束的方法
            if (this.isGameOver()){
                this.status=this.gameOver
            }
            // 3.更新视频,调用更新视图的函数
            this.dataView()
        }
    },
    // 处理每一行的逻辑函数
    moveDownInRow: function (r) {
        // 找后面不为0的位置
        for (var c = 3; c > 0; c--) { // 最右边的不用考虑
            var nextc=this.getNextInRowDown(c,r)
            if (nextc!=-1){ // 表示当前位置的后面有数字
                console.log(this.data)
                if (this.data[c][r]==0){ // 自己的位置为0 交换
                    this.data[c][r]=this.data[nextc][r]
                    this.data[nextc][r]=0
                    c++;
                } else if (this.data[c][r]==this.data[nextc][r]){ // 两个数相等
                    this.data[c][r] *=2
                    this.data[nextc][r]=0
                    this.score+=this.data[c][r] // 加分
                }
            } else {
                break
            }
        }
    },
    // 查找同行下一个格子
    getNextInRowDown: function (c,r) {
        for (var i = c-1; i>=0 ; i--) {
            // 找到了就返回具体的位置
            if (this.data[i][r]!=0){
                return i
            }
        }
        return -1 //没找到就返回一个具体位置
    },
}

game.start()

console.log(game.data)

document.onkeydown=function (e) {
    // console.log(e.keyCode)
    if(event.keyCode==37)	//左
        game.moveLeft();
    if(event.keyCode==39)	//右
        game.moveRight();
    if(event.keyCode==38)	//上
        game.moveTop();
    if(event.keyCode==40)	//下
        game.moveDown();
}


//游戏结束后重新开始
function sta(){
    document.getElementById("gameover").style.display="none";
    game.start();
}
