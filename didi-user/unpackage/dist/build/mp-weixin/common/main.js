(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{3396:function(e,t,n){"use strict";(function(e){n("ea37"),n("921b");var t=i(n("66fd")),o=i(n("e328")),a=i(n("3de1")),c=i(n("5529")),r=i(n("2495"));function i(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){s(e,t,n[t])})}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default.config.productionTip=!1,t.default.prototype.$util=a.default,t.default.prototype.$config=r.default,t.default.prototype.$json=c.default,o.default.mpType="app";var l=new t.default(u({},o.default));e(l).$mount()}).call(this,n("543d")["createApp"])},"63ec":function(e,t,n){"use strict";n.r(t);var o=n("c9e7"),a=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,function(){return o[e]})}(c);t["default"]=a.a},c43c:function(e,t,n){},c9e7:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("5af2"),a={globalData:{socket:""},onLaunch:function(t){var n=decodeURIComponent(t.scene);console.log("App Launch"),console.log("scene-----------"+n);var o=this;e.login({provider:"weixin",success:function(e){var t=e.code;o.loginByCode(t,n)}});var a=[];if(!e.getStorageSync("messageList")){a=[];e.setStorageSync("messageList",a)}},onShow:function(){var t=this;console.log("App Show"),e.removeStorageSync("updateCart"),this.getHistoryMessage(),this.interval=setInterval(function(){t.checkOuttimeMsg()},1e4)},onHide:function(){console.log("App Hide"),clearInterval(this.interval)},methods:{checkOuttimeMsg:function(){var t=e.getStorageSync("messageList");if(null!=t&&t.length>0){for(var n=0;n<t.length;n++){var o=t[n];"0"==o.over&&null!=o.endTime&&""!=o.endTime&&new Date(o.endTime)>new Date&&(o.over,t[n]=o)}e.setStorageSync("messageList",t)}},getHistoryMessage:function(){var t=this,n=e.getStorageSync("patientInfo");null!=n&&(e.showToast({icon:"none",title:"加载消息中...",mask:!0}),this.$util.request({url:"/didi-patient/message/getUserUnreadedMessage",param:{userId:n.openId},contentType:"application/x-www-form-urlencoded",success:function(e){var n=e.data;if(null!=n&&n.length>0)for(var o=0;o<n.length;o++){var a=n[o];console.log(a),t.$util.updateMessage(a,"0")}},error:function(){}}))},loginByCode:function(t,n){var o=this,a={};a.code=t,a.scene=n,o.$util.request({url:"/didi-patient/ex/login_by_weixin",param:a,contentType:"application/x-www-form-urlencoded",success:function(t){e.setStorageSync("Token",t.data.openId),e.setStorageSync("patientInfo",t.data),o.connectMsgServer(t.data)},error:function(){}})},connectMsgServer:function(t){var n=this,a=t.openId,c="https://ws.dididoctor.cn?token="+a,r=o.connect(c);getApp().globalData.socket=r,r.on("connect",function(){console.log("系统通知: "+a+"成功连接至websocket服务器")}),r.on("disconnect",function(){console.log("系统通知: "+a+"已从websocket服务器断开连接")}),r.on("chat",function(t){var o=t;n.$util.updateMessage(o,"0"),e.vibrateLong(),console.log("系统通知: 收到来自"+t.username+"的悄悄话:"+t.msg.content)})}}};t.default=a}).call(this,n("543d")["default"])},e328:function(e,t,n){"use strict";n.r(t);var o=n("63ec");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("f663");var c,r,i=n("2877"),u=Object(i["a"])(o["default"],c,r,!1,null,null,null);t["default"]=u.exports},f663:function(e,t,n){"use strict";var o=n("c43c"),a=n.n(o);a.a}},[["3396","common/runtime","common/vendor"]]]);