<!-- 搜索页面 -->
<template>
	<view>
		<template v-if="list.length>0">
			<!--列表-->
			<block v-for="(item, index) in list" :key="index">
				<index-list :item="item" :index="index"></index-list>
			</block>  
			<!--上拉加载组件-->
			<load-more :loadtext="loadtext"></load-more>
		</template>
		<template v-else-if="isSearch && list.length<1">
			<!--无内容默认组件-->
			<noThing></noThing>
		</template>
	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue"
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		components:{
			indexList,
			loadMore,
			noThing
		},
		data() {
			return {
				isSearch:false,
				loadtext:"上拉加载更多...",
				list:[],
				searchText:""
			}
		},
		//监听原生标题栏按钮点击事件，参数为Object--取消按钮
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateBack({
				    delta: 1	//默认返回1级页面
				});
			}
		},
		//监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(e){
			this.searchText = e.text;
		},
		//监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed(e){
			if(e.text){
				this.isSearch = true;
				this.getData();
			};
		},
		//监听页面触底事件
		onReachBottom(){
			this.loadmore();
		},
		//监听下拉刷新
		onPullDownRefresh(){
			this.getData();
			uni.stopPullDownRefresh();
		},
		methods: {
			//搜索事件
			getData(text){
				uni.showLoading();
				//请求服务器 post 参数:keywords:this.searchText
				setTimeout(()=>{
					let arr = [
					{
						userpic:"../../static/demo/userpic/12.jpg",
						username:"搜索01",
						isgz:false,
						title:"搜索出来的数据1",
						type:"img",	//img:图文 video:视频
						titlepic:"../../static/demo/datapic/12.jpg",
						infonum:{
							index:2,	//0:没有操作， 1:顶，2:踩
							dingnum:11,
							cainum:11
						},
						plnum:10,
						zfnum:10
					},
					{
						userpic:"../../static/demo/userpic/12.jpg",
						username:"搜索2",
						isgz:true,
						title:"搜索出来的数据2",
						type:"video",	//img:图文 video:视频
						titlepic:"../../static/demo/datapic/13.jpg",
						playnum:"20W",
						long:"2:47",
						infonum:{
							index:1,	//0:没有操作， 1:顶，2:踩
							dingnum:11,
							cainum:11
						},
						plnum:10,
						zfnum:10
					}
				];
				this.list = arr;
				uni.hideLoading();
				},1000);
			},
			//上拉加载更多
			loadmore(){
				//如果不是"上拉加载"，证明已经在请求数据，所以直接return
				if(this.loadtext != "上拉加载更多..."){return;}
				//修改状态
				this.loadtext = "加载中...";
				//模拟获取数据
				setTimeout(()=>{
					//获取到数据
					let obj={
						userpic:"../../static/demo/userpic/12.jpg",
						username:"昵称",
						isgz:false,
						title:"我的标题",
						type:"img",	//img:图文 video:视频
						titlepic:"../../static/demo/datapic/11.jpg",
						infonum:{
							index:2,	//0:没有操作， 1:顶，2:踩
							dingnum:11,
							cainum:11
						},
						plnum:10,
						zfnum:10
					};
					this.list.push(obj);
					//获取数据完成
					this.loadtext = "上拉加载更多..."
				},1000);
				//this.newslist[index].loadtext = "没有更多数据了...";
			},
		}
	}
</script>

<style>

</style>
