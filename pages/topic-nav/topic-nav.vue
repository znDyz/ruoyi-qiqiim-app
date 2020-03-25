<template>
	<view>
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange">
		</swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" @change="slideChange"
					:style="{height:swiperheight+'px'}" :current="tabIndex">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view class="list" scroll-y @scrolltolower="loadmore(index)">
						<template v-if="items.list.length>0">
							<!--话题列表-->
							<view class="topic-view">
								<block v-for="(item, index1) in items.list" :key="index1">
									<topic-list :item="item" :index="index1"></topic-list>
								</block> 
							</view>
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
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	import topicList from "../../components/news/topic-list.vue";
	export default {
		components:{
			swiperTabHead,
			loadMore,
			noThing,
			topicList
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
					{name: '关注',id: 'guanzhu'}, 
					{name: '推荐',id: 'tuijian'}, 
					{name: '体育',id: 'tiyu'}, 
					{name: '热点',id: 'redian'}, 
					{name: '财经',id: 'caijing'},
					{name: '娱乐',id: 'yule'}
				],
				newslist:[
					{
						loadtext:"上拉加载更多...",
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
							},{
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
							},
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
							},
							{
								titlepic:"../../static/demo/topicpic/13.jpeg",
								title:"#淘宝记录薄#",
								desc:"120斤到85斤 我的反转人生",
								totalnum:50,
								todaynum:10
							}
						]
					},
					{
						loadtext:"上拉加载更多...",
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
							},
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
					},
					{
						loadtext:"上拉加载更多...",
						list:[]
					},
					{
						loadtext:"上拉加载更多...",
						list:[]
					},
					{
						loadtext:"上拉加载更多...",
						list:[]
					},
					{
						loadtext:"上拉加载更多...",
						list:[]
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success:(res)=> {
			        let height = res.screenHeight-uni.upx2px(100);
			        this.swiperheight = height;
			    }
			});
		},
		methods: {
			//上拉加载更多
			loadmore(index){
				//如果不是"上拉加载"，证明已经在请求数据，所以直接return
				if(this.newslist[index].loadtext != "上拉加载更多..."){return;}
				//修改状态
				this.newslist[index].loadtext = "加载中...";
				//模拟获取数据
				setTimeout(()=>{
					//获取到数据
					let obj={
						titlepic:"../../static/demo/topicpic/13.jpeg",
						title:"#淘宝记录薄#",
						desc:"120斤到85斤 我的反转人生",
						totalnum:50,
						todaynum:10
					};
					this.newslist[index].list.push(obj);
					//获取数据完成
					this.newslist[index].loadtext = "上拉加载更多..."
				},1000);
				//this.newslist[index].loadtext = "没有更多数据了...";
			},
			//点击切换子页面
			tabChange(index){
				this.tabIndex = index;
			},
			//滑动切换子页面
			slideChange(e){
				this.tabIndex = e.detail.current ;
			}
		}
	}
</script>

<style>
	.topic-view{
		padding: 0 20upx;
	}
</style>
