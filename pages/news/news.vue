<template>
	<!-- 动态页面 -->
	<view>
		<!-- 自定义导航栏 -->
		<newsNavBar :tabBars="tabBars" :tabIndex="tabIndex" @change-tab="tabChange"></newsNavBar>

		<!-- 关注/话题子页面 -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex"
					@change="slideChange">
				<!--关注-->
				<swiper-item >
					<scroll-view class="list" scroll-y @scrolltolower="loadmore()">
						<block v-for="(item,index) in guanzhu.list" :key="index">
							<common-list :item="item" :index="index"></common-list>
						</block>
						<!--上拉加载-->
						<load-more :loadtext="guanzhu.loadtext"></load-more>
					</scroll-view>
				</swiper-item>
				<!--话题-->
				<swiper-item >
					<scroll-view class="list" scroll-y>
						<!--搜索框-->
						<view class="search-input">
							<input class="uni-input" placeholder-class="icon iconfont icon-sousuo topic-search" placeholder="搜索内容"/>
						</view>
						<!--轮播图-->
						<view>
							<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
								<block v-for="(item,index) in topic.swiper" :key="index">
									<swiper-item>
										<image :src="item.src" mode="widthFix" lazy-load></image>
									</swiper-item>
								</block>
							</swiper>
						</view>
						<!--热门分类-->
						<topic-nav :nav="topic.nav"></topic-nav>
						
						<!--最近更新-->
						<view class="topic-new">
							<view>最新更新</view>
							<block v-for="(item,index) in topic.list" :key="index">
								<topic-list :item="item" :index="index"></topic-list>
							</block>
						</view>
						
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import newsNavBar from "../../components/news/news-nav-bar.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from "../../components/common/load-more.vue";
	import topicNav from "../../components/news/topic-nav.vue";
	import topicList from "../../components/news/topic-list.vue";
	
	export default {
		components:{
			newsNavBar,
			commonList,
			loadMore,
			topicNav,
			topicList
		}, 
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
					{name: '关注',id: 'guanzhu'}, 
					{name: '话题',id: 'huati'}
				],
				guanzhu:{
					loadtext:"上拉加载更多...",
					list:[
						//文字
						{
							userpic:"../../static/demo/userpic/10.jpg",
							username:"我的昵称",
							sex:"0",	//0男，1女
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
							sex:"0",	//0男，1女
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
							sex:"0",	//0男，1女
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
					]
				},
				topic:{
					swiper:[
						{src:"../../static/demo/banner1.jpg"},
						{src:"../../static/demo/banner2.jpg"},
						{src:"../../static/demo/banner3.jpg"}
					],
					nav:[
						{name:"最新"},
						{name:"游戏"},
						{name:"打卡"},
						{name:"情感"},
						{name:"故事"},
						{name:"喜爱"}
					],
					list:[
						{
							titlepic:"../../static/demo/topicpic/13.jpeg",
							title:"#淘宝记录薄#",
							desc:"120斤到85斤 我的反转人生",
							totalnum:50,
							todaynum:10
						},
						{
							titlepic:"../../static/demo/topicpic/13.jpeg",
							title:"#淘宝记录薄#",
							desc:"120斤到85斤 我的反转人生",
							totalnum:50,
							todaynum:10
						}
					]
				}
			}
		},
		//页面加载时计算news页面导航栏高度
		onLoad() {
			uni.getSystemInfo({
			    success:(res)=> {
			        let height = res.screenHeight-uni.upx2px(100);
			        this.swiperheight = height;
			    }
			});
		},
		methods: {
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
				if(this.guanzhu.loadtext != "上拉加载更多..."){return;}
				//修改状态
				this.guanzhu.loadtext = "加载中...";
				//模拟获取数据
				setTimeout(()=>{
					//获取到数据
					let obj={
						userpic:"../../static/demo/userpic/10.jpg",
						username:"我的昵称",
						sex:"0",	//0男，1女
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
					this.guanzhu.list.push(obj);
					//获取数据完成
					this.guanzhu.loadtext = "上拉加载更多..."
				},1000);
				//this.guanzhu.loadtext = "没有更多数据了...";
			}
		}
	}
</script>

<style>
	.search-input{
		padding: 20upx;
	}
	.search-input>input{
		border-radius: 10upx;
		background: #F4F4F4;
	}
	.topic-search{
		display: flex;
		justify-content: center;
		font-size: 27upx;
	}
	.topic-swiper{
		padding:0 20upx 20upx 20upx;
	}
	.topic-swiper image{
		width: 100%;
		border-radius: 10upx;
	}
	.topic-new{
		padding:20upx;
	}
	.topic-new>view:first-child{
		font-size: 32upx;
		margin-bottom: 5upx;
	}
</style>
