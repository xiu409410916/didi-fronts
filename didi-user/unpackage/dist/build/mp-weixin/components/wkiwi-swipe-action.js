(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wkiwi-swipe-action"],{"1cd4":function(t,e,i){"use strict";i.r(e);var n=i("476a"),s=i("fe7a");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("9b5d");var a=i("2877"),r=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"476a":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},"9b5d":function(t,e,i){"use strict";var n=i("f823"),s=i.n(n);s.a},c9b6:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return i.e("components/avator-group").then(i.bind(null,"5a4c"))},s={name:"wkiwi-swipe-action",props:{options:Array,messagesList:Array},components:{avatorGroup:n},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{elId:t,transformX:"translateX(0px)",messageIndex:-1}},created:function(){this.direction="",this.startX=0,this.startY=0,this.btnGroupWidth=0,this.isMoving=!1},onReady:function(){},methods:{toMessageDetail:function(e,i){2==i.type?(console.log(i),t.navigateTo({url:"../message_info/message_info?name="+i.title+"&toUser="+i.openId+"&orderId="+i.orderId+"&over="+i.over})):1==type&&console.log("进入系统消息界面")},getSize:function(){var e=this;t.createSelectorQuery().in(this).select("#".concat(this.elId)).boundingClientRect().exec(function(t){t[0]&&(e.btnGroupWidth=t[0].width)})},bindClickBtn:function(t,e){this.messageIndex=-1,console.log(t.text+"message第"+e+"项")},touchStart:function(t){},touchMove:function(t){if("Y"!==this.direction&&!0!==t.currentTarget.dataset.disabled){var e=t.touches[0].pageY-this.startY,i=t.touches[0].pageX-this.startX;!this.isMoving&&Math.abs(e)>Math.abs(i)||Math.abs(e)>100||Math.abs(i)<50?this.direction="Y":(this.direction=i>0?"right":"left",this.messageIndex=i<0?t.currentTarget.dataset.index:-1,this.isMoving=!0)}else this.direction=""},touchEnd:function(t){this.isMoving=!1,"right"===this.direction||"left"===this.direction?("right"==this.direction&&(this.messageIndex=-1),this.endMove(t)):this.direction=""},endMove:function(t){"Y"!==this.direction&&!0!==t.currentTarget.dataset.disabled?(-1!==this.messageIndex?(this.transformX="translateX(".concat(-this.btnGroupWidth,"px)"),this.$emit("opened")):(this.transformX="translateX(0px)",this.$emit("closed")),this.direction=""):this.direction=""}}};e.default=s}).call(this,i("543d")["default"])},f823:function(t,e,i){},fe7a:function(t,e,i){"use strict";i.r(e);var n=i("c9b6"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wkiwi-swipe-action-create-component',
    {
        'components/wkiwi-swipe-action-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1cd4"))
        })
    },
    [['components/wkiwi-swipe-action-create-component']]
]);                
