/**
 * Created by zhaoce on 16/8/15.
 */
/*
* options = [
*   [top,left,time],
*   [top,left,time],
*   ...
* ]
*
* 注意: 本插件 依赖jquery插件  请把该引入放在jquery的下面
*
* */

function Chemicalelement(father,options,callback) {
    this.box = $(father);
    this.parentHeight = this.box.innerHeight();
    this.parentWidth = this.box.innerWidth();
    this.callback = callback;
    this.count = 0;
    this.arr = options;
    this.line();
}
Chemicalelement.prototype.show = function () {

    var len = this.arr.length;
};
Chemicalelement.prototype.call = function () {
    //this.callback();
};
Chemicalelement.prototype.line = function () {
    var this1 = this;
    var count = this1.count;
    var prev = this1.arr[count];
    var nextCount = count + 1;
    var next = this1.arr[nextCount];
    var w = this._toPx(next[1],1) - this._toPx(prev[1],1);
    var h = this._toPx(next[0],0) - this._toPx(prev[0],0);
    var div = $("<line class='animate-line'></line>");
    var rot = Math.atan2(h,w);
    var allAnd = (w*w) + (h*h);
    var changDeg = rot * 180 /Math.PI;
    var leng = Math.sqrt(allAnd);
    div.css({
        top:this1._toPx(prev[0],0),
        left:this1._toPx(prev[1],1),
        transform:"rotate("+changDeg+"deg)"
    });
    this.box.append(div);
    console.log(leng,changDeg);
    div.animate({
        width:leng
    },prev[2],function () {
        this1.circle(this1._toPx(next[0],0),this1._toPx(next[1],1));
        if(this1.count < this1.arr.length - 1){
            this1.line();
        }
    });
    this1.count = count + 1;

};
Chemicalelement.prototype.circle = function (top,left) {
    var circle = $("<sircle class='animate-circle'></sircle>");
    circle.css({
        top:top - 5,
        left:left - 5
    });
    this.box.append(circle);

};
Chemicalelement.prototype._toPx = function (str,num) {
    if(typeof str == "number"){
        return str;
    }else if(typeof str == "string"){
        if(str.indexOf("%") !== -1){
            if(num == 0){
                return (parseFloat(str)/100) * this.parentHeight;
            }else if(num == 1){
                return (parseFloat(str)/100) * this.parentWidth;
            }

        }else if(str.indexOf("px")){
            return parseFloat(str);
        }
    }
};