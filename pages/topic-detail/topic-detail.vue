<template>
	<view>
		<!--话题介绍-->
		<topic-info :item="topicInfo"></topic-info>
		<!--tabbar切换-->
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange"
			scrollStyle="border-bottom:none"
			tabBarStyle="width:50%">
		</swiper-tab-head>
		
		<!--列表-->
		<view class="topic-detail-list">
			<block v-for="(item,index) in tablist" :key="index">
				<template v-if="tabIndex==index">
					<!--列表内容-->
					<block v-for="(list,listIndex) in item.list" :key="listIndex">
						<common-list :item="list" :index="listIndex"></common-list>
					</block>
					<!--上拉加载-->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	import topicInfo from '../../components/topic/topic-info.vue';
	import commonList from '../../components/common/common-list.vue';
	export default {
		components:{
			indexList,
			swiperTabHead,
			loadMore,
			noThing,
			topicInfo,
			commonList
		},
		data() {
			return {
				topicInfo:{
					titlepic:"../../static/demo/topicpic/13.jpeg",
					title:"#忆往事，敬余生#",
					desc:"我是描述信息，这是我第一个App",
					totalnum:1000,
					todaynum:1000
				},
				tabIndex:0,
				tabBars: [
					{name:'默认', id:'moren'},
					{name:'最新', id:'zuixin'} 
				],
				tablist:[
					{
						loadtext:"上拉加载更多...",
						list:[
							//文字
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"",
								video:false,
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//图文
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"../../static/demo/datapic/2.jpg",
								video:false,
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//视频
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"../../static/demo/datapic/2.jpg",
								video:{
									looknum:'20w',
									long:'2:47'
								},
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//分享
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"",
								video:false,
								share:{
									title:"我是分享的标题",
									titlepic:"../../static/demo/datapic/2.jpg",
								},
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[
							//文字
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"",
								video:false,
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//图文
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"../../static/demo/datapic/2.jpg",
								video:false,
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//视频
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"../../static/demo/datapic/2.jpg",
								video:{
									looknum:'20w',
									long:'2:47'
								},
								share:false,
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							},
							//分享
							{
								userpic:"../../static/demo/userpic/10.jpg",
								username:"我的昵称",
								sex:0,	//0男，1女
								age:25,
								isgz:false,
								title:"我是标题",
								titlepic:"",
								video:false,
								share:{
									title:"我是分享的标题",
									titlepic:"../../static/demo/datapic/2.jpg",
								},
								path:"深圳龙岗",
								sharenum:20,
								commentnum:30,
								goodnum:20
							}
						]
					}
				]
			}
		},
		//上拉触底事件
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
							userpic:"../../static/demo/userpic/12.jpg",
							username:"下拉刷新，获取的数据",
							sex:"1",	//0男，1女
							age:29,
							isgz:false,
							title:"标题标题 ",
							titlepic:"",
							video:false,
							share:false,
							path:"深圳南山区",
							sharenum:20,
							commentnum:30,
							goodnum:20
						},
						{
							userpic:"../../static/demo/userpic/13.jpg",
							username:"下拉刷新获取的数据2",
							sex:"0",	//0男，1女
							age:21,
							isgz:false,
							title:"我是标题",
							titlepic:"../../static/demo/datapic/3.jpg",
							video:false,
							share:false,
							path:"深圳龙华区",
							sharenum:20,
							commentnum:30,
							goodnum:20
						},
						//视频
						{
							userpic:"../../static/demo/userpic/14.jpg",
							username:"我的昵称",
							sex:"0",	//0男，1女
							age:25,
							isgz:false,
							title:"我是标题",
							titlepic:"../../static/demo/datapic/4.jpg",
							video:{
								looknum:'20w',
								long:'2:47'
							},
							share:false,
							path:"深圳龙岗",
							sharenum:20,
							commentnum:30,
							goodnum:20
						},
						//分享
						{
							userpic:"../../static/demo/userpic/10.jpg",
							username:"我的昵称",
							sex:"0",	//0男，1女
							age:25,
							isgz:false,
							title:"我是标题",
							titlepic:"",
							video:false,
							share:{
								title:"我是分享的标题",
								titlepic:"../../static/demo/datapic/2.jpg",
							},
							path:"深圳龙岗",
							sharenum:20,
							commentnum:30,
							goodnum:20
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
						userpic:"../../static/demo/userpic/10.jpg",
						username:"我的昵称",
						sex:0,	//0男，1女
						age:25,
						isgz:false,
						title:"我是标题",
						titlepic:"../../static/demo/datapic/2.jpg",
						video:false,
						share:false,
						path:"深圳龙岗",
						sharenum:20,
						commentnum:30,
						goodnum:20
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
