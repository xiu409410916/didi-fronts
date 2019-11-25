(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/inquiry/inquiryDetail"],{4655:function(e,t,i){"use strict";(function(e){i("6024"),i("921b");n(i("66fd"));var t=n(i("a5da"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},"6b9a":function(e,t,i){"use strict";var n=i("c8b3"),r=i.n(n);r.a},8448:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return i.e("components/button").then(i.bind(null,"462a"))},r=getApp(),a={components:{PageButton:n},data:function(){return{temp:{inquiryId:"",detail:"",picUrl:"",realName:"",idCard:"",gender:"",weight:"",allergic:"",conceive:"",liver:"",kidney:"",medicalHistory:"",states:"",de:""},picUrls:[],geneList:[]}},onLoad:function(e){this.temp.inquiryId=e.inquiryId,this.socket=r.globalData.socket,this.getInquiryDetail(),this.getGeneList()},onShow:function(){},methods:{getInquiryDetail:function(){var e=this,t={inquiryId:e.temp.inquiryId};e.$util.request({url:"/didi-doctor/inquiryinfo/getOneByEntity",param:t,contentType:"application/x-www-form-urlencoded",success:function(t){e.temp=t.data,e.picUrls=e.temp.picUrl.split(","),e.temp.de="",e.$util.isEmpty(t.data.allergic)&&(e.temp.de=e.temp.de+e.$json.allergic[t.data.allergic]+"过敏史/"),e.$util.isEmpty(t.data.conceive)&&(e.temp.de=e.temp.de+e.$json.conceive[t.data.conceive]+"/"),e.$util.isEmpty(t.data.liver)&&(e.temp.de=e.temp.de+"肝功能"+e.$json.liver[t.data.liver]+"/"),e.$util.isEmpty(t.data.kidney)&&(e.temp.de=e.temp.de+"肾功能"+e.$json.liver[t.data.kidney]),console.log(e.temp)},error:function(){}})},receptInquiry:function(){var t=this,i={inquiryId:t.temp.inquiryId};t.$util.request({url:"/didi-doctor/inquiryreceptinfo/receptInquiry",param:i,contentType:"application/x-www-form-urlencoded",success:function(i){var n=i.data.patientInfo,r=i.data.inquiryInfo;e.showToast({title:"接单成功",icon:"success",duration:2e3});var a=e.getStorageSync("doctorInfo"),o="你好,我是"+e.getStorageSync("doctorInfo").doctorName+"医生。",u=t.$util.getFormatDate(new Date,"yyyy-MM-dd hh:mm:ss"),c={title:n.nickName,orderId:r.inquiryId,openId:n.openId,avatarUrl:n.avatarUrl,message:o,time:u,count:1,inquiryTime:t.$util.getInquiryTimeByType(r.payType),over:0,type:2},d={orderId:r.inquiryId,id:t.$util.uuid(),username:a.doctorName,face:a.avatarUrl,fromUid:a.openId,toUid:n.openId,time:u,firstMsg:!1,type:"text",msg:{content:o}};t.socket.emit("chat",d,function(e){console.log("系统通知: 你刚刚和 "+t.toUser+" 说了句悄悄话"),e&&e.flag,console.log("系统通知: 悄悄话 "+e.message+" 说了句悄悄话")}),t.$util.createMsgSession(c,d),e.navigateTo({url:"/pages/message_info/message_info?msg="+o+"&orderId="+r.inquiryId+"&toUser="+n.openId+"&name="+n.nickName+"&over=0"})},error:function(){}})},getGeneList:function(){var e=this,t={inquiryId:e.temp.inquiryId};e.$util.request({url:"/didi-doctor/inquirygeneinfo/findList",param:t,contentType:"application/x-www-form-urlencoded",success:function(t){e.geneList=t.data},error:function(){}})},toMessage:function(){e.switchTab({url:"../message/index"})}}};t.default=a}).call(this,i("543d")["default"])},a5da:function(e,t,i){"use strict";i.r(t);var n=i("bac9"),r=i("dca8");for(var a in r)"default"!==a&&function(e){i.d(t,e,function(){return r[e]})}(a);i("6b9a");var o=i("2877"),u=Object(o["a"])(r["default"],n["a"],n["b"],!1,null,"c83348ee",null);t["default"]=u.exports},bac9:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},r=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return r})},c8b3:function(e,t,i){},dca8:function(e,t,i){"use strict";i.r(t);var n=i("8448"),r=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t["default"]=r.a}},[["4655","common/runtime","common/vendor"]]]);