(function () {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector)
    }
    // 原型 构造函数
    jQuery.prototype.init=function(selector){ // id class dom对象 包含dom对象的数组
        // 选择元素的时候，只需要去考拉id和class
        // document.getElementById()   直接是一个dom元素
        // document.getElementsByClassName()  包含dom元素的类数组对象
        // indexof字符串方法，检索子串首次出现的位置 如果没有检测到 出现-1

        this.length=0 // 初始化length长度

        if (selector==null){
            return this
        }
        if (typeof(selector)=="string" && selector.indexOf('.') != -1){
            var dom=document.getElementsByClassName(selector.slice(1)) // 包含dom元素的类数组对象
        } else if (typeof(selector)=="string" && selector.indexOf('#') != -1) {
            var dom=document.getElementById(selector.slice(1)) // dom对象
        }
        // 判断dom变量到底为类数组还是dom对象
        console.log(dom)
        if (selector instanceof Element || dom.length == undefined){ // dom对象
            this[0]=dom || selector
            this.length++
        } else { // 类数组
            for (var i = 0; i < dom.length; i++) {
                this[i]=dom[i]
                this.length++
            }
        }
    }
    jQuery.prototype.css=function (config) { // config是一个对象
        for (var i = 0; i < this.length; i++) {
            for (var attr in config) {
                this[i].style[attr]=config[attr]
            }
        }
        // 返回jQuery对象 进行链式调用
        return this
    }
    // 扩展get方法
    jQuery.prototype.get=function (num) {
        // if (num==null) {
        //     // 类数组转换成数组
        //     console.log(Array.prototype.slice.call(this,0))
        //     return [].slice.call(this,0)
        // } else {
        //     if (num>=0){
        //         return this[num]
        //     } else {
        //         return this[num+this.length]
        //     }
        // }
        return num==null?([].slice.call(this,0)):(num>=0?this[num]:this[num+this.length])
    }
    // 扩展eq方法
    jQuery.prototype.eq=function (num) {
        var dom = num == null ? ([].slice.call(this,0)):(num>=0?this[num]:this[num+this.length])
        // 给dom对象进行包装 包装成jQuery对象
        return jQuery(dom)  // 不管这个dom是dom对象还是包含dom的jQuery对象
    }
    // 独立封装prevObject
    jQuery.prototype.pushStack=function(dom){
        if (dom.constructor!=jQuery){ // 判断是否是jQuery对象，如果不是jQuery对象，进行包装成jQuery对象
            dom=jQuery(dom)
        }
        dom.prevObject=this
        return dom
    }
    // 扩展add方法
    jQuery.prototype.add=function(selector){
        var curObj=jQuery(selector)  // add传递的jQuery对象
        var baseObj=this //  原始的jQuery对象
        var newObj=jQuery() // 新的jQuery对象
        for (var i = 0; i < curObj.length; i++) {
            newObj[newObj.length++]=curObj[i]
        }
        for (var i = 0; i < baseObj.length; i++) {
            newObj[newObj.length++]=baseObj[i]
        }
        this.pushStack(newObj)
        return newObj
    }
    // 扩展end方法
    jQuery.prototype.end=function(){
        return this.prevObject
    }
    // 原型共享 不然jQuery出来的实例地下没有办法使用css
    jQuery.prototype.init.prototype=jQuery.prototype
    // 函数里面的函数 外面可以访问
    // 简单闭包
    return window.$=window.jQuery=jQuery
})()
