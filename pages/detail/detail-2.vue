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
		
		<!-- 底部分享弹窗 -->
		<uni-popup ref="share" type="bottom" :custom="true" @change="change" v-show="show">
			<view class="uni-share">
				<view class="uni-share-title">分享到</view>
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image" hover-class="more-share-hover">
							<image :src="item.icon" class="image" />
						</view>
						<view class="uni-share-content-text">{{ item.text }}</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('share')">取消分享</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import detailInfo from "../../components/detail/detail-info.vue";
	import commentList from "../../components/detail/comment-list.vue";
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue";
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniIcon from '../../components/uni-icon/uni-icon.vue'
	import time from "../../common/time.js";
	export default {
		components:{
			detailInfo,
			commentList,
			userChatBottom,
			uniPopup,
			uniIcon
		},
		data() {
			return {
				show: false,
				type: '',
				bottomData: [{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						name: 'qq'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '百度',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},
					{
						text: '其他',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				],
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
				this.togglePopup('bottom', 'share');
			}
		},
		methods: {
			togglePopup(type, open) {
				this.$refs['share'].open()
			},
			cancel(type) {
				this.$refs['share'].close()
			},
			change(e) {
				console.log(e.show)
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
	
/* 底部分享 */
	.uni-share {
		background: #fff;
	}

	.uni-share-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
		text-align: center;
	}

	.uni-share-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
	}

	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
	}

	.uni-share-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		border-radius: 10upx;
	}

	.uni-share-content-image .image {
		width: 100%;
		height: 100%;
	}

	.uni-share-content-text {
		font-size: 26upx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}

	.uni-share-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
		text-align: center;
		color: #666;
	}
	.more-share-hover{background: #CCCCCC;}
</style>
