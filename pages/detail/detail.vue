<template>
	<view>
		<detail-info :item="detail"></detail-info>
		<!-- 标题 -->
		<view class="u-comment-title">最新评论 {{comment.count}}</view>
		<!--评论区-->
		<view class="uni-comment u-comment">
			<block v-for="(item,index) in comment.list" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</view>
		
		<!--输入框占位符-->
		<view style="height:120upx"></view>
		<!--输入框-->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
		
		<!--分享窗口-->
		<more-share :show="shareShow" @togle="togle"></more-share>
		
	</view>
</template>

<script>
	import detailInfo from "../../components/detail/detail-info.vue";
	import commentList from "../../components/detail/comment-list.vue";
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue";
	import moreShare from "../../components/common/more-share.vue";
	import time from "../../common/time.js";
	export default {
		components:{
			detailInfo,
			commentList,
			userChatBottom,
			moreShare
		},
		data() {
			return {
				shareShow:false,
				comment:{
					count:20,
					list:[]
				},
				detail:{
							userpic:"../../static/demo/userpic/10.jpg",
							username:"我的昵称",
							sex:0,	//0男，1女
							age:25,
							isgz:false,
							title:"我是标题",
							titlepic:"../../static/demo/datapic/2.jpg",
							morepic:["../../static/demo/datapic/1.jpg","../../static/demo/datapic/2.jpg"],
							video:false,
							share:false,
							path:"深圳龙岗",
							sharenum:20,
							commentnum:30,
							goodnum:20
						}
			}
		},
		onLoad(option){
			//获取上个页面传递过来的数据
			let item = JSON.parse(decodeURIComponent(option.detailData));
			this.initData(item);
			this.getComment();
		},
		//监听导航右边按钮
		onNavigationBarButtonTap(e){
			if(e.index==0){
				this.togle();
			}
		},
		methods: {
			//分享弹层显示/隐藏
			togle(){
				this.shareShow = !this.shareShow
			},
			//提交数据
			submit(data){
				let obj = {
					id:1,
					fid:0,
					userpic:"../../static/demo/userpic/11.jpg",
					username:"小猫咪",
					time:time.gettime.gettime(new Date().getTime()),
					data:data
				}
				this.comment.list.push(obj);
			},
			//初始化	数据
			initData(obj){
				//修改标题：
				uni.setNavigationBarTitle({title: obj.title});
			},
			//获取评论数据
			getComment(){
				let arr = [
					//一级评论
					{
						id:1,
						fid:0,
						userpic:"../../static/demo/userpic/11.jpg",
						username:"小猫咪",
						time:"1555400035",
						data:"支持国产，支持DCloud!"
						
					},
					//子	级评论
					{
						id:2,
						fid:1,
						userpic:"../../static/demo/userpic/11.jpg",
						username:"小猫咪",
						time:"1555400035",
						data:"支持国产，支持DCloud!"
						
					},
					//子	级评论
					{
						id:3,
						fid:1,
						userpic:"../../static/demo/userpic/11.jpg",
						username:"小猫咪",
						time:"1555400035",
						data:"支持国产，支持DCloud!"
						
					},
					//一	级评论
					{
						id:4,
						fid:0,
						userpic:"../../static/demo/userpic/11.jpg",
						username:"小猫咪",
						time:"1555400035",
						data:"支持国产，支持DCloud!"
						
					}
				];
				for (let i = 0; i < arr.length; i++) {
					arr[i].time = time.gettime.gettime(arr[i].time);
					this.comment.list = arr;
				}
			}
		}
	}
</script>

<style>
	.u-comment-title{
		padding: 20upx;
		font-size: 30upx;
		font-weight: bold;
	}
	.u-comment{
		padding: 0 20upx;
	}
	
	.more-share{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 400upx;
		background: #FFFFFF;
		z-index: 10000;
	}
	.more-share-title,.more-share-title{
		padding: 25upx;
		font-size: 32upx;
	}
	.more-share-body{
		width: 100%;
		height: 200upx;
		white-space: nowrap;/*不进行换行*/
		border-bottom: 1upx solid #EEEEEE;
		display: flex!important;
		line-height:200upx;
	}
	.more-share-item{
		width: 25%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%!important;
	}
	.more-share-item>view:first-child{
		width: 100upx;
		height: 100upx;
		font-size:55upx;
		color: #FFFFFF;
		border-radius: 100%;
	}
	.more-share-item>view:last-child{
		color: #7A7A7A;
	}
	.more-share-hover{background: #CCCCCC;}
	.more-share-1{background: #514D4C;}
	.more-share-2{background: #2AD19B;}
	.more-share-3{background: #EE5E5E;}
	.more-share-4{background: #4A73BA;}
	.more-share-5{background: #FF9619;}
	.more-share-model{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(51, 51, 51, 0.61);
		z-index:99;
	}
</style>
