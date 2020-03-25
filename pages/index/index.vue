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
							<!--图文列表-->
							<block v-for="(item, index1) in items.list" :key="index1">
								<index-list :item="item" :index="index1"></index-list>
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
	import indexList from "../../components/index/index-list.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	
	export default {
		components:{
			indexList,
			swiperTabHead,
			loadMore,
			noThing
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
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isgz:true,
								title:"我的标题",
								type:"video",	//img:图文 video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
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
		//监听搜索框点击事件
		onNavigationBarSearchInputClicked(){
			//在起始页面跳转到test.vue页面并传递参数
			uni.navigateTo({
			    url: '../search/search'
			});
		},
		//监听原生标题栏按钮点击事件，参数为Object
		onNavigationBarButtonTap(e){
			if(e.index==0){
				console.log("点击了‘签’按钮。")
			}
			if(e.index==1){
				uni.navigateTo({
				    url: '../publish/publish'
				});
			}
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
	
</style>
