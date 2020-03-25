<template>
	<view class="body">
		<!--tab切换-->
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange"
			scrollStyle="border-bottom:none"
			tabBarStyle="width:33.3%">
		</swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" @change="slideChange"
					:style="{height:swiperheight+'px'}" :current="tabIndex">
				<swiper-item v-for="(items,index) in tablist" :key="index">
					<scroll-view class="list" scroll-y @scrolltolower="loadmore(index)">
						<template v-if="items.list.length>0">
							<!--图文列表-->
							<block v-for="(item, index1) in items.list" :key="index1">
								<user-list :item="item" :index="listIndex"></user-list>
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
		
		<!--
		好友列表
		<block v-for="(item,index) in tablist" :key="index">
			<template v-if="tabIndex==index">
				列表内容
				<block v-for="(item,listIndex) in item.list" :key="listIndex">
					<user-list :item="item" :index="listIndex"></user-list>
				</block>
				上拉加载
				<load-more :loadtext="item.loadtext"></load-more>
			</template>
		</block>
		-->
	</view>
</template>

<script>
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	import userList from "../../components/user-list/user-list.vue";
	export default {
		components:{
			swiperTabHead,
			loadMore,
			noThing,
			userList
		},
		onLoad() {
			uni.getSystemInfo({
			    success:(res)=> {
			        let height = res.screenHeight-uni.upx2px(100);
			        this.swiperheight = height;
			    }
			});
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
					{name:'互关', id:'huguan',num:10},
					{name:'关注', id:'guanzhu',num:20},
					{name:'粉丝', id:'fensi',num:30} 
				],
				tablist:[
					{
						loadtext:"上拉加载更多...",
						list:[
							{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:1,
								age:20,
								isgz:false
							},
							{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:0,
								age:20,
								isgz:true
							},
							{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:0,
								age:20,
								isgz:true
							},{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:1,
								age:20,
								isgz:false
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[
							{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:1,
								age:20,
								isgz:false
							},
							{
								userpic:"../../static/demo/userpic/6.jpg",
								username:"昵称",
								sex:1,
								age:20,
								isgz:false
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[]
					}
				]
			}
		},
		//监听导航按钮事件
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateBack({
					delta: 1
				});
			}
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
		methods: {
			//上拉刷新，获取数据
			getData(){
				setTimeout(()=> {
					let arr = [
						{
							userpic:"../../static/demo/userpic/6.jpg",
							username:"用户下拉刷新",
							sex:1,
							age:20,
							isgz:false,
						},
						{
							userpic:"../../static/demo/userpic/6.jpg",
							username:"用户下拉刷新",
							sex:0,
							age:20,
							isgz:true,
						},
						{
							userpic:"../../static/demo/userpic/6.jpg",
							username:"用户下拉刷新",
							sex:1,
							age:20,
							isgz:false,
						},{
							userpic:"../../static/demo/userpic/6.jpg",
							username:"用户下拉刷新",
							sex:0,
							age:29,
							isgz:true,
						}
					];
					//赋值
					this.tablist[this.tabIndex].list = arr;
				}, 2000);
			},
			//点击切换子页面
			tabChange(index){
				this.tabIndex = index;
			},
			//滑动切换子页面
			slideChange(e){
				this.tabIndex = e.detail.current ;
			},
			//上拉加载更多
			loadmore(){
				//如果不是"上拉加载"，证明已经在请求数据，所以直接return
				if(this.tablist[this.tabIndex].loadtext != "上拉加载更多..."){return;}
				//修改状态
				this.tablist[this.tabIndex].loadtext = "加载中...";
				//模拟获取数据
				setTimeout(()=>{
					//获取到数据
					let obj={
						userpic:"../../static/demo/userpic/6.jpg",
						username:"上拉加载的数据",
						sex:1,
						age:20,
						isgz:false
					};
					this.tablist[this.tabIndex].list.push(obj);				//将获取的数据添加到集合中
					this.tablist[this.tabIndex].loadtext = "上拉加载更多..."	//获取数据完成
				},1000);
				//this.tablist[this.tabIndex].loadtext = "没有更多数据了...";
			}
		}
	}
</script>

<style>
</style>
