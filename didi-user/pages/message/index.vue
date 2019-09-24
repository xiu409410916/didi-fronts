<template>
	<view class="content">
		<view class="message-list">
		  <wkiwi-swipe-action :options="options" :messagesList="messages"></wkiwi-swipe-action>
		</view>
	</view>
</template>

<script>
	import wkiwiSwipeAction from "../../components/wkiwi-swipe-action.vue";
	export default {
	  components: { wkiwiSwipeAction },
	  data() {
	    return {
	      focus: false,
	      isShowView: true,
		  loadData:false,
	      options: [
	        {
	          text: "置顶",
	          style: {
	            backgroundColor: "#C7C6CD"
	          }
	        },
	        {
	          text: "删除",
	          style: {
	            backgroundColor: "#dd524d"
	          }
	        }
	      ],
	      messages: []
	    };
	  },
	  onLoad() {
	  },
	  onShow() {
		var that = this;
		this.loadMessageList();
		this.interval = setInterval(function() {
		      that.loadMessageList()
		}, 3000)
	  },
	  onHide() {
		clearInterval(this.interval);
	  },
	  
	  methods: {
		loadMessageList(){ 
			this.messages = this.formatMessage(uni.getStorageSync("messageList"));
		},
		formatMessage(messagesList){
			for(var i=0;i<messagesList.length;i++){
				messagesList[i].time = this.$util.beautyTime(messagesList[i].time)
			}
			return messagesList;
		}
	  },
	  onNavigationBarButtonTap(e) {
	    if (e.index == 0) {
	      this.floatingMenuShow = !this.floatingMenuShow;
	    }
	  }
	};
</script>

<style lang="scss">
	.search-box {
	  height: 100upx;
	  width: 100%;
	  background: #4191ea;
	  display: flex;
	  flex-flow: nowrap;
	  .search-bg {
	    box-sizing: border-box;
	    height: 80upx;
	    padding: 0 30upx;
	    line-height: 80upx;
	    width: 710upx;
	    margin: auto;
	    background: rgba(255, 255, 255, 1);
	    border-radius: 40upx;
	    color: #999;
	    display: flex;
	    flex-flow: nowrap;
	    .search {
	      flex: 1;
	      height: 80upx;
	      line-height: 80upx;
	    }
	    .iconfont {
	      margin-left: 15upx;
	    }
	  }
	}
	.floating-menus {
	  position: fixed;
	  top: 0;
	  right: 20upx;
	  z-index: 10;
	  opacity: 0;
	  transition: all 0.4s;
	  height: 0;
	  overflow: hidden;
	}
	.floating-menus {
	  &.show {
	    opacity: 1;
	    height: auto;
	  }
	  &.hidden {
	    opacity: 0;
	    height: 0;
	  }
	}
</style>
