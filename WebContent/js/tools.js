/**
 * 创建一个可以执行简单动画的函数
 * @param obj：要执行动画的对象
 * @param attr：要执行动画的样式，例如left，top，width
 * @param speed：速度
 * @param target：移动目标
 * @param callback：回调函数，将会在动画执行完毕后执行
 */
function move(obj, attr, speed, target, callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);

    //判断速度的正负值
    var currValue = parseInt(getStyle(obj,attr));
    if (currValue > target){
        speed = -speed;
    }

    //开启定时器，向执行动画的对象中添加一个timer属性，用来保存自己的定时器标识
    obj.timer = setInterval(function () {

        //获取box1原来left值
        var oldValue = parseInt(getStyle(obj,attr));

        //在旧值的基础上修改
        var newValue = oldValue + speed;

        //向左移动时，需要判断newValue是否小于target
        //向右移动时，需要判断newValue是否大于target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
            newValue = target;
        }

        //将新值设置给box1
        obj.style[attr] = newValue + "px";

        //当移动到800px时，停止
        if (newValue == target){
            clearInterval(obj.timer);
            callback && callback();
        }
    },30)
};

/**
 * 定义一个函数，获取指定元素的当前样式
 * @param obj 要获取样式的元素
 * @param name 要获取的样式名
 */
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        //正常浏览器，具有getComputedStyle()方法
        return getComputedStyle(obj, null)[name];
    }else {
        //IE8，没有getComputedStyle()方法
        return obj.currentStyle[name];
    }
};

/**
 * 定义一个函数来向一个元素中添加指定的class属性值
 * @param obj：要添加class属性的元素
 * @param cn：要添加的class值
 */
function addClass(obj, cn) {
    if (!hasClass(obj, cn)){
        obj.className += " " + cn;
    }
}

/**
 * 判断一个元素中是否含有指定的class属性值
 * @param obj
 * @param cn
 */
function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn +  "\\b");
    return reg.test(obj.className);
}

/**
 * 移除元素中指定的class属性
 * @param obj
 * @param cn
 */
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn +  "\\b");
    obj.className = obj.className.replace(reg, "");
}

/**
 * 切换类，有就删除，没有就添加
 * @param obj
 * @param cn
 */
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)){
        removeClass(obj, cn);
    }else {
        addClass(obj, cn);
    }
}