<template>
	<view class="body">
		<!--左侧操作菜单-->
		<paper-left-popup :popupShow="popupShow"
			@hide="hidePopup"
			@addFriends="addFriends"
			@clearCache="clearCache"
			></paper-left-popup>
		<!--
		小纸条列表
		<block v-for="(item,index) in list" :key="index">
			<paper-list :item="item" :index="index"></paper-list>
		</block>
		上拉加载
		<load-more :loadtext="loadtext"></load-more>
		-->
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange">
		</swiper-tab-head>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" @change="slideChange"
					:style="{height:swiperheight+'px'}" :current="tabIndex">
				<swiper-item v-for="(items,index) in mylist" :key="index">
					<scroll-view scroll-y @scrolltolower="loadmore(index)" style="height:100%;">
						<template v-if="items.list.length>0">
							<block v-for="(item, index1) in items.list" :key="index1">
								<paper-list :item="item" :index="index"></paper-list>
							</block> 
							<!--上拉加载组件-->
							<load-more :loadtext="items.loadtext"></load-more>
						</template>
						<template v-else>
							<!--无内容默认组件-->
							<noThing></noThing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue";
	import loadMore from "../../components/common/load-more.vue";
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		components: {
			paperList,
			loadMore,
			paperLeftPopup,
			swiperTabHead,
			noThing
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
					{name: '我的好友',id: 'haoyou'}, 
					{name: '我的群组',id: 'qunzu'},
					{name: '所有用户',id: 'yonghu'}
				],
				popupShow:false,
				loadtext: "上拉加载更多...",
				mylist:[
					{
						loadtext:"上拉加载更多...",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称一号",
								time:"10:21",
								data:"我是第一条信息",
								noreadnum:"10"
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"群组一号",
								time:"10:21",
								data:"我是第一条信息",
								noreadnum:8
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"群组一号",
								time:"10:21",
								data:"我是第一条信息",
								noreadnum:8
							}
						]
					}
				]
			}
		},
		onLoad(){
			let _this = this;
			uni.getSystemInfo({
			    success:(res)=> {
			        let height = res.screenHeight-uni.upx2px(100);
			        _this.swiperheight = height;
			    }
			});
			//加载全部用户信息
			this.iGlobal.request({
			    url:'/chat/user/list', method:'GPOST'
			}).then((res)=>{
				console.log(JSON.stringify(res));
			});
			//加载我的好友信息
			this.iGlobal.request({
			    url:'/chat/friend/list', method:'GPOST'
			}).then((res)=>{
				console.log(JSON.stringify(res));
			});
			
		},
		//页面滚动到底部的事件(不是scroll-view滚到底)常用于下拉下一页数据
		onReachBottom(){
			this.loadmore();
		},
		//监听该页面用户下拉刷新事件
		onPullDownRefresh(){
			this.getData();
			uni.stopPullDownRefresh();
		},
		//监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url: '../user-list/user-list'
				});
			}
			if(e.index==1){
				this.showPopup();
			}
		},
		methods: {
			addFriends(){
				console.log("添加好友");this.hidePopup();
			},
			clearCache(){
				console.log("清除缓存");this.hidePopup();
			},
			showPopup(){this.popupShow=true;},		//显示菜单
			hidePopup(){this.popupShow=false;},		//隐藏菜单
			getData(){
				setTimeout(()=> {
					let arr = [
						{
							userpic:"../../static/demo/userpic/12.jpg",
							username:"下拉刷新1",
							time:"10:21",
							data:"我是第一条信息",
							noreadnum:0
						},
						{
							userpic:"../../static/demo/userpic/12.jpg",
							username:"下拉刷新2",
							time:"10:21",
							data:"我是第二条信息",
							noreadnum:5
						}
					];
					this.list = arr;
					uni.stopPullDownRefresh();
				}, 2000);
			},
			//上拉加载更多：如果不是"上拉加载"，证明已经在请求数据，所以直接return
			loadmore(){
				if(this.loadtext != "上拉加载更多..."){return;}
				this.loadtext = "加载中...";
				//模拟获取数据
				setTimeout(()=>{
					let obj={
						userpic:"../../static/demo/userpic/12.jpg",
						username:"上拉继续加载",
						time:"10:21",
						data:"我是第三条信息",
						noreadnum:9
					};
					this.list.push(obj);				//将获取的数据添加到集合中
					this.loadtext = "上拉加载更多..."	//获取数据完成
				},1000);
				//this.tablist[this.tabIndex].loadtext = "没有更多数据了...";
			},
			//点击切换子页面
			tabChange(index){this.tabIndex = index;},
			//滑动切换子页面
			slideChange(e){this.tabIndex = e.detail.current ;}
		}
	}
</script>

<style>
	.body{
		padding: 0 20upx;
	}
</style>
