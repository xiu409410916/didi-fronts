(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/message_info/message_info"],{"369e":function(i,t,e){"use strict";e.r(t);var g=e("52ef"),a=e.n(g);for(var r in g)"default"!==r&&function(i){e.d(t,i,function(){return g[i]})}(r);t["default"]=a.a},"52ef":function(i,t,e){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var g=e("2495"),a=getApp(),r={data:function(){return{fromUser:"",toUser:"",textMsg:a.globalData.msg,scrollAnimation:!1,scrollTop:0,scrollToView:"",msgList:[],msgImgList:[],myuid:"",RECORDER:i.getRecorderManager(),isVoice:!1,voiceTis:"按住 说话",recordTis:"手指上滑 取消发送",recording:!1,willStop:!1,initPoint:{identifier:0,Y:0},recordTimer:null,recordLength:0,over:"1",AUDIO:i.createInnerAudioContext(),playMsgid:null,VoiceTimer:null,showEmji:"",info:i.getStorageSync("patientInfo"),emojiList:[[{url:"100.gif",alt:"[微笑]"},{url:"101.gif",alt:"[伤心]"},{url:"102.gif",alt:"[美女]"},{url:"103.gif",alt:"[发呆]"},{url:"104.gif",alt:"[墨镜]"},{url:"105.gif",alt:"[哭]"},{url:"106.gif",alt:"[羞]"},{url:"107.gif",alt:"[哑]"},{url:"108.gif",alt:"[睡]"},{url:"109.gif",alt:"[哭]"},{url:"110.gif",alt:"[囧]"},{url:"111.gif",alt:"[怒]"},{url:"112.gif",alt:"[调皮]"},{url:"113.gif",alt:"[笑]"},{url:"114.gif",alt:"[惊讶]"},{url:"115.gif",alt:"[难过]"},{url:"116.gif",alt:"[酷]"},{url:"117.gif",alt:"[汗]"},{url:"118.gif",alt:"[抓狂]"},{url:"119.gif",alt:"[吐]"},{url:"120.gif",alt:"[笑]"},{url:"121.gif",alt:"[快乐]"},{url:"122.gif",alt:"[奇]"},{url:"123.gif",alt:"[傲]"}],[{url:"124.gif",alt:"[饿]"},{url:"125.gif",alt:"[累]"},{url:"126.gif",alt:"[吓]"},{url:"127.gif",alt:"[汗]"},{url:"128.gif",alt:"[高兴]"},{url:"129.gif",alt:"[闲]"},{url:"130.gif",alt:"[努力]"},{url:"131.gif",alt:"[骂]"},{url:"132.gif",alt:"[疑问]"},{url:"133.gif",alt:"[秘密]"},{url:"134.gif",alt:"[乱]"},{url:"135.gif",alt:"[疯]"},{url:"136.gif",alt:"[哀]"},{url:"137.gif",alt:"[鬼]"},{url:"138.gif",alt:"[打击]"},{url:"139.gif",alt:"[bye]"},{url:"140.gif",alt:"[汗]"},{url:"141.gif",alt:"[抠]"},{url:"142.gif",alt:"[鼓掌]"},{url:"143.gif",alt:"[糟糕]"},{url:"144.gif",alt:"[恶搞]"},{url:"145.gif",alt:"[什么]"},{url:"146.gif",alt:"[什么]"},{url:"147.gif",alt:"[累]"}],[{url:"148.gif",alt:"[看]"},{url:"149.gif",alt:"[难过]"},{url:"150.gif",alt:"[难过]"},{url:"151.gif",alt:"[坏]"},{url:"152.gif",alt:"[亲]"},{url:"153.gif",alt:"[吓]"},{url:"154.gif",alt:"[可怜]"},{url:"155.gif",alt:"[刀]"},{url:"156.gif",alt:"[水果]"},{url:"157.gif",alt:"[酒]"},{url:"158.gif",alt:"[篮球]"},{url:"159.gif",alt:"[乒乓]"},{url:"160.gif",alt:"[咖啡]"},{url:"161.gif",alt:"[美食]"},{url:"162.gif",alt:"[动物]"},{url:"163.gif",alt:"[鲜花]"},{url:"164.gif",alt:"[枯]"},{url:"165.gif",alt:"[唇]"},{url:"166.gif",alt:"[爱]"},{url:"167.gif",alt:"[分手]"},{url:"168.gif",alt:"[生日]"},{url:"169.gif",alt:"[电]"},{url:"170.gif",alt:"[炸弹]"},{url:"171.gif",alt:"[刀子]"}],[{url:"172.gif",alt:"[足球]"},{url:"173.gif",alt:"[瓢虫]"},{url:"174.gif",alt:"[翔]"},{url:"175.gif",alt:"[月亮]"},{url:"176.gif",alt:"[太阳]"},{url:"177.gif",alt:"[礼物]"},{url:"178.gif",alt:"[抱抱]"},{url:"179.gif",alt:"[拇指]"},{url:"180.gif",alt:"[贬低]"},{url:"181.gif",alt:"[握手]"},{url:"182.gif",alt:"[剪刀手]"},{url:"183.gif",alt:"[抱拳]"},{url:"184.gif",alt:"[勾引]"},{url:"185.gif",alt:"[拳头]"},{url:"186.gif",alt:"[小拇指]"},{url:"187.gif",alt:"[拇指八]"},{url:"188.gif",alt:"[食指]"},{url:"189.gif",alt:"[ok]"},{url:"190.gif",alt:"[情侣]"},{url:"191.gif",alt:"[爱心]"},{url:"192.gif",alt:"[蹦哒]"},{url:"193.gif",alt:"[颤抖]"},{url:"194.gif",alt:"[怄气]"},{url:"195.gif",alt:"[跳舞]"}],[{url:"196.gif",alt:"[发呆]"},{url:"197.gif",alt:"[背着]"},{url:"198.gif",alt:"[伸手]"},{url:"199.gif",alt:"[耍帅]"},{url:"200.png",alt:"[微笑]"},{url:"201.png",alt:"[生病]"},{url:"202.png",alt:"[哭泣]"},{url:"203.png",alt:"[吐舌]"},{url:"204.png",alt:"[迷糊]"},{url:"205.png",alt:"[瞪眼]"},{url:"206.png",alt:"[恐怖]"},{url:"207.png",alt:"[忧愁]"},{url:"208.png",alt:"[眨眉]"},{url:"209.png",alt:"[闭眼]"},{url:"210.png",alt:"[鄙视]"},{url:"211.png",alt:"[阴暗]"},{url:"212.png",alt:"[小鬼]"},{url:"213.png",alt:"[礼物]"},{url:"214.png",alt:"[拜佛]"},{url:"215.png",alt:"[力量]"},{url:"216.png",alt:"[金钱]"},{url:"217.png",alt:"[蛋糕]"},{url:"218.png",alt:"[彩带]"},{url:"219.png",alt:"[礼物]"}]],onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"}}},onUnload:function(){clearInterval(this.interval)},onHide:function(){i.switchTab({url:"../message/index"})},onLoad:function(t){var e=this,g=this,r=t.toUser;this.orderId=t.orderId,this.toUser=r,this.socket=a.globalData.socket,this.over=t.over,this.myuid=i.getStorageSync("patientInfo").openId;var n=this.getLeftTime();i.setNavigationBarTitle({title:t.name+" "+n}),this.resetUnreadMsgList(),this.getMsgList(),this.interval=setInterval(function(){g.loadMessageDetail()},2e3),this.AUDIO.onEnded(function(i){e.playMsgid=null}),this.RECORDER.onStart(function(i){e.recordBegin(i)}),this.RECORDER.onStop(function(i){e.recordEnd(i)})},methods:{getLeftTime:function(){var i=this.messageListInfo.endTime;return null==i?"":new Date<=new Date(i)?this.$util.getFormatDate(new Date(i),"hh:mm"):"已结束"},loadMessageDetail:function(){var t=i.getStorageSync("messageDetail"),e=t["order"+this.orderId];if(null!=e)for(var g=0;g<e.length;g++)"0"==e[g].hasRead&&(this.screenMsg(e[g]),e[g].hasRead="1"),this.resetUnreadMsgCount();t["order"+this.orderId]=e,i.setStorageSync("messageDetail",t)},resetUnreadMsgCount:function(){for(var t=i.getStorageSync("messageList"),e=0;e<t.length;e++)t[e].orderId==this.orderId&&(t[e].count=0,this.messageListInfo=t[e]);i.setStorageSync("messageList",t)},resetUnreadMsgList:function(){var t=i.getStorageSync("messageDetail"),e=t["order"+this.orderId];if(null!=e){for(var g=0;g<e.length;g++)"0"==e[g].hasRead&&(e[g].hasRead="1");t["order"+this.orderId]=e}else t={},t["order"+this.orderId]=[];i.setStorageSync("messageDetail",t)},getMsgList:function(){var t=i.getStorageSync("messageDetail")["order"+this.orderId];if(null!=t){for(var e=0;e<t.length;e++)"img"==t[e].type&&(t[e]=this.setPicSize(t[e]),console.log("list[i]: "+JSON.stringify(t[e])),this.msgImgList.push(t[e].msg.url));this.msgList=t}this.$nextTick(function(){this.scrollTop=9999,this.scrollAnimation=!0})},setPicSize:function(t){var e=i.upx2px(350),g=i.upx2px(350);if(t.msg.w>e||t.msg.h>g){var a=t.msg.w/t.msg.h;t.msg.w>t.msg.h?(t.msg.w=e,t.msg.h=t.msg.w/a):(t.msg.h=g,t.msg.w=t.msg.h*a)}return t},screenMsg:function(i){switch(i.type){case"text":this.addTextMsg(i);break;case"voice":this.addVoiceMsg(i);break;case"img":this.addImgMsg(i);break}i.id&&this.$nextTick(function(){this.scrollToView="msg"+i.id})},chooseEmoji:function(){this.showEmji="showEmoji"==this.showEmji?"hideEmoji":"showEmoji"},hideEmoji:function(){this.showEmji="showEmoji"==this.showEmji?"hideEmoji":""},addEmoji:function(i){this.textMsg+=i.alt},sendText:function(){if(this.hideEmoji(),this.textMsg){var i=this.replaceEmoji(this.textMsg),t={content:i};this.sendMsg(t,"text"),this.textMsg=""}},replaceEmoji:function(i){var t=this,e=i.replace(/\[([^(\]|\[)]*)\]/g,function(i,e){console.log("item: "+i);for(var g=0;g<t.emojiList.length;g++)for(var a=t.emojiList[g],r=0;r<a.length;r++){var n=a[r];if(n.alt==i){var s="https://s2.ax1x.com/2019/04/12/",f='<img src="'+s+t.onlineEmoji[n.url]+'">';return console.log("imgstr: "+f),f}}});return e},chooseImage:function(){var t=this;this.hideEmoji(),i.chooseImage({sizeType:["original","compressed"],success:function(e){for(var a=0;a<e.tempFilePaths.length;a++){var r=e.tempFilePaths[a];console.log(e.tempFilePaths[a]),i.showLoading({mask:!0}),i.uploadFile({url:g.serverUrl+"/didi-patient/ossfile/fileUpload",filePath:r,name:"file",header:{"Content-Type":"multipart/form-data",partnerId:i.getStorageSync("channelId")?i.getStorageSync("channelId"):"1",token:i.getStorageSync("Token")?i.getStorageSync("Token"):""},success:function(e){var g=JSON.parse(e.data);i.getImageInfo({src:r,success:function(i){var e={content:"[图片]",url:g.data[0],w:i.width,h:i.height};t.sendMsg(e,"img")}})},fail:function(t){i.showToast({title:"发送失败，请重试",icon:"none",duration:2e3})},complete:function(t){i.hideLoading()}})}}})},sendMsg:function(t,e){var g=this,a=new Date;if(!this.checkSessionNotOuttime(a)){this.over="1",this.messageListInfo.over="1";for(var r=i.getStorageSync("messageList"),n=0;n<r.length;n++)r[n].orderId==this.orderId&&(r[n]=this.messageListInfo,this.messageListInfo=r[n]);return i.setStorageSync("messageList",r),void i.showToast({title:"此次订单已结束！",icon:"none",duration:2e3})}var s={orderId:this.orderId,id:g.$util.uuid(),username:this.info.nickName,face:this.info.avatarUrl,fromUid:g.myuid,toUid:g.toUser,time:this.$util.getFormatDate(new Date,"yyyy-MM-dd hh:mm:ss"),type:e,msg:t};console.log(s),this.socket.emit("chat",s,function(i){console.log("系统通知: 你刚刚和 "+g.toUser+" 说了句悄悄话"),i&&i.flag,console.log("系统通知: 悄悄话 "+i.message+" 说了句悄悄话")}),this.checkFistMsg(s),this.screenMsg(s),this.$util.updateMessage(s,"1")},checkFistMsg:function(t){var e=this,g=i.getStorageSync("messageDetail"),a=g["order"+this.orderId],r=a.filter(function(i){return i.fromUid===e.myuid});r.length<1&&e.$util.request({url:"/didi-patient/inquiryinfo/patientFirstSendMessage",param:{inquiryId:e.orderId},contentType:"application/x-www-form-urlencoded",success:function(t){var g=t.data.startTime,a=t.data.endTime,r=t.data.payType,n=e.$util.getInquiryTimeByType(r),s=e.messageListInfo;s.startTime=g,s.endTime=a,s.inquiryTime=n;for(var f=i.getStorageSync("messageList"),l=0;l<f.length;l++)f[l].orderId==e.orderId&&(f[l]=s,e.messageListInfo=f[l]);i.setStorageSync("messageList",f);var o=e.getLeftTime();i.setNavigationBarTitle({title:option.name+" "+o})},error:function(){}})},checkSessionNotOuttime:function(i){this.messageListInfo.startTime;var t=this.messageListInfo.endTime;this.messageListInfo.inquiryTime;return console.log(this.messageListInfo),null==t||i<=new Date(t)},addTextMsg:function(i){this.msgList.push(i)},addVoiceMsg:function(i){this.msgList.push(i)},addImgMsg:function(i){i=this.setPicSize(i),this.msgImgList.push(i.msg.url),this.msgList.push(i)},showPic:function(t){i.previewImage({indicator:"none",current:t.msg.url,urls:this.msgImgList})},playVoice:function(i){this.playMsgid=i.id,this.AUDIO.src=i.msg.url,console.log("msg.msg.url: "+i.msg.url),this.AUDIO.play()},voiceBegin:function(i){i.touches.length>1||(this.initPoint.Y=i.touches[0].clientY,this.initPoint.identifier=i.touches[0].identifier,this.RECORDER.start({format:"aac"}))},recordBegin:function(i){var t=this;this.recording=!0,this.voiceTis="松开 结束",this.recordLength=0,this.recordTimer=setInterval(function(){t.recordLength++},1e3)},voiceCancel:function(){this.recording=!1,this.voiceTis="按住 说话",this.recordTis="手指上滑 取消发送",this.willStop=!0,this.RECORDER.stop()},voiceIng:function(t){if(this.recording){var e=t.touches[0];this.initPoint.Y-e.clientY>=i.upx2px(100)?(this.willStop=!0,this.recordTis="松开手指 取消发送"):(this.willStop=!1,this.recordTis="手指上滑 取消发送")}},voiceEnd:function(i){this.recording&&(this.recording=!1,this.voiceTis="按住 说话",this.recordTis="手指上滑 取消发送",this.RECORDER.stop())},recordEnd:function(t){var e=this;if(clearInterval(this.recordTimer),this.willStop)console.log("取消发送录音");else{var a={content:"[语音]",length:0,url:t.tempFilePath},r=parseInt(this.recordLength/60),n=this.recordLength%60;r=r<10?"0"+r:r,n=n<10?"0"+n:n,a.length=r+":"+n,i.showLoading({mask:!0});var s=t.tempFilePath;i.uploadFile({url:g.serverUrl+"/didi-patient/ossfile/fileUpload",filePath:s,name:"file",header:{"Content-Type":"multipart/form-data",partnerId:i.getStorageSync("channelId")?i.getStorageSync("channelId"):"1",token:i.getStorageSync("Token")?i.getStorageSync("Token"):""},success:function(i){var t=JSON.parse(i.data);a.url=t.data[0],e.sendMsg(a,"voice")},fail:function(t){i.showToast({title:"发送失败，请重试",icon:"none",duration:2e3})},complete:function(t){i.hideLoading()}})}this.willStop=!1},switchVoice:function(){this.hideEmoji(),this.isVoice=!this.isVoice},discard:function(){}}};t.default=r}).call(this,e("543d")["default"])},"64b3":function(i,t,e){"use strict";var g=function(){var i=this,t=i.$createElement;i._self._c},a=[];e.d(t,"a",function(){return g}),e.d(t,"b",function(){return a})},aabb:function(i,t,e){"use strict";(function(i){e("ea37"),e("921b");g(e("66fd"));var t=g(e("f528"));function g(i){return i&&i.__esModule?i:{default:i}}i(t.default)}).call(this,e("543d")["createPage"])},d1a4:function(i,t,e){"use strict";var g=e("d570"),a=e.n(g);a.a},d570:function(i,t,e){},f528:function(i,t,e){"use strict";e.r(t);var g=e("64b3"),a=e("369e");for(var r in a)"default"!==r&&function(i){e.d(t,i,function(){return a[i]})}(r);e("d1a4");var n=e("2877"),s=Object(n["a"])(a["default"],g["a"],g["b"],!1,null,null,null);t["default"]=s.exports}},[["aabb","common/runtime","common/vendor"]]]);