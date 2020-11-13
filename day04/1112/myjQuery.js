(function(){
    function jQuery(selector){
       return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function(selector){   //id class dom对象 包含dom对象的数组
        this.length = 0;  

        if(selector == null){
            return this;
        }

        if(typeof(selector) == 'string' && selector.indexOf(".") != -1){  
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if(typeof(selector) == 'string' && selector.indexOf("#") != -1){  
            var dom = document.getElementById( selector.slice(1) );   
        }
        // Element
        if(selector instanceof Element || dom.length == undefined){  
            this[0] = dom || selector;
            this.length ++;
        }else{    //传递进来的类数组或者数组都有length属性
            for(var i = 0; i < dom.length;i++){
                this[i] = dom[i];
                this.length ++;
            }
        }
    }
    jQuery.prototype.css = function(config){  
        for(var i = 0;i < this.length;i++){  
            for(var attr in config){
                this[i].style[attr] = config[attr];
            }
        }
        return this;    
    }
    // 扩展的get方法
    jQuery.prototype.get = function(num){
        // if(num == null){
        //     // 类数组转换成数组就OK了
        //     // console.log(Array.prototype.slice.call(this,0))
        //     return [].slice.call(this,0)
        // }else{   //具体的数字-1 -2 -3 0 1 2 3 
        //     if(num >= 0){
        //         return this[num];
        //     }else{
        //         return this[num + this.length];
        //     }
        // }

        return num == null ? ([].slice.call(this,0)) : (num >= 0 ? this[num] : this[num + this.length])
    }
    // 扩展eq方法
    jQuery.prototype.eq = function(num){
       var dom =  num == null ? ([].slice.call(this,0)) : (num >= 0 ? this[num] : this[num + this.length])
    //    给dom对象进行包装，包装成jquery对象
        // return jQuery(dom);    //不管这个dom是dom对象还是包含dom对象的数组，最后都会转换成jquery对象 

        return this.pushStack(dom);
    }
    // 独立封装prevObject
    jQuery.prototype.pushStack = function(dom){
        if(dom.constructor != jQuery){   //判断是否是jquery对象，如果不是jquery对象，进行包装成jquery对象
            dom = jQuery(dom)
        }
        dom.prevObject = this;
        return dom;

    }

    // 扩展add方法
    jQuery.prototype.add = function(selector){
        var curObj = jQuery(selector)   //add传递的jquery对象
        var baseObj = this;     //原始的jquery对象
        var newObj = jQuery();   //新的jquery对象，把上面两个jquery对象放进来就成新的
    
        for(var i = 0;i < curObj.length;i++){
           newObj[newObj.length ++] = curObj[i]
        }
        for(var i = 0;i < baseObj.length;i++){
            newObj[newObj.length ++] = baseObj[i]
        }


        this.pushStack(newObj);
        return newObj;

    }

    // 扩展end方法
    jQuery.prototype.end = function(){
        return this.prevObject;
    }

    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery;
})()