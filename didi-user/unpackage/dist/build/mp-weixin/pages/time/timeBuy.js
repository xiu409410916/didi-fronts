(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/time/timeBuy"],{1707:function(t,n,e){"use strict";(function(t){e("ea37"),e("921b");a(e("66fd"));var n=a(e("2569"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},2569:function(t,n,e){"use strict";e.r(n);var a=e("34eb"),u=e("4956");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("2635");var o=e("2877"),c=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,"77f29b34",null);n["default"]=c.exports},2635:function(t,n,e){"use strict";var a=e("dca3"),u=e.n(a);u.a},"34eb":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})},4956:function(t,n,e){"use strict";e.r(n);var a=e("9ad1"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=u.a},"9ad1":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/button").then(e.bind(null,"5b65"))},u={components:{PageButton:a},data:function(){return{}},onShow:function(){},methods:{timeBuy:function(n){var e=this,a={};a.time=n,e.$util.request({url:"/didi-patient/patientpayinfo/unifiedOrder",param:a,contentType:"application/x-www-form-urlencoded",success:function(n){var e=n.data;t.requestPayment({appId:e.appId,timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(n){util.showSuccessToast("支付成功"),setTimeout(function(){t.navigateTo({url:"/pages/my/index"})},1e3)},fail:function(n){t.showToast({title:n.message,icon:"none"})}})},error:function(){}})}}};n.default=u}).call(this,e("543d")["default"])},dca3:function(t,n,e){}},[["1707","common/runtime","common/vendor"]]]);