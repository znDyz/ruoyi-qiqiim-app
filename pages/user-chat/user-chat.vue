<template>
	<view>
		
		<!--聊天内容-->
		<scroll-view id="scrollview" scroll-y="true"
			:scroll-top="scrollTop" 
			:scroll-with-animation="true"
			:style="{height:style.contentHight+'px'}">
			<block v-for="(item,index) in list" :key="index">
				<user-chat-list :item="item" :index="index"></user-chat-list>
			</block>
		</scroll-view>
		
		<!--输入框-->
		<user-chat-bottom @submit="chatSubmit"></user-chat-bottom>
	</view>
</template>

<script>
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue";
	import userChatList from "../../components/user-chat/user-chat-list.vue";
	import time from "../../common/time.js";
	export default {
		components:{
			userChatBottom,
			userChatList
		},
		data() {
			return {
				scrollTop:0,
				style:{
					contentHight:0,
					itemHight:0
				},
				list:[]
			}
		},
		onLoad() {
			this.getData();
			this.initdata();
		},
		onReady(){
			this.pageToBottom();
		},		
		methods: {
			//初始化参数
			initdata(){
				try {
				    const res = uni.getSystemInfoSync();
				    this.style.contentHight = res.windowHeight-uni.upx2px(120);
				} catch (e) {}
			},
			//页面至底方法(此处存在问题)
			pageToBottom(){
				let query = uni.createSelectorQuery();
				query.select("#scrollview").boundingClientRect();
				query.select(".user-chat-item").boundingClientRect();
				query.exec((resArr)=>{
					resArr[1].forEach((ret)=> {
						this.style.itemHight+=ret.height;
					});
					if(this.style.itemHight>this.style.contentHight){
						this.scrollTop = this.style.itemHight;
					}
				})
			},
			//获取聊天数据
			getData(){
				let arr = [
					{
						isme:false,
						userpic:"../../static/demo/userpic/6.jpg",
						type:"text",
						data:"哈哈哈哈",
						time:"1554970014",//php的时间戳,
						formattime:""
					},
					{
						isme:true,
						userpic:"../../static/demo/userpic/10.jpg",
						type:"img",
						data:"../../static/demo/2.jpg",
						time:"1554970814",	//php的时间戳
						formattime:""
					}
				];
				for (let i = 0; i < arr.length; i++) {
					if(i>0){
						arr[i].formattime = time.gettime.getChatTime(arr[i].time,arr[i-1].time)
					}else{
						arr[i].formattime = time.gettime.getChatTime(arr[i].time,0)
					}
				}
				this.list = arr;
			},
			chatSubmit(data){
				//构建发送数据
				let now = new Date().getTime();
				let obj = {
						isme:false,
						userpic:"../../static/demo/userpic/6.jpg",
						type:"text",
						data:data,
						time:now,
						formattime:time.gettime.getChatTime(now, this.list[this.list.length-1].time)
					}
				//发送逻辑
				this.list.push(obj);
				//页面至于底部
				this.pageToBottom();
			}
		}
	}
</script>

<style>

</style>
