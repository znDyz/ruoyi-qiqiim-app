<template>
	<view>
		<!--左侧操作菜单-->
		<user-space-popup :popupShow="popupShow"
			@hide="togelShow" @lahei="lahei" @beizhu="beizhu">
		</user-space-popup>
		<!--背景图 + 用户基本信息-->
		<user-space-head :userinfo="userinfo"></user-space-head>
		
		<!--统计-->
		<view class="user-space-data">
			<home-data :homedata="spacedata"></home-data>
		</view>
		
		<view style="height:20upx;background: #F4F4F4;"></view>
		
		<!--tabbar切换-->
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange"
			scrollStyle="border-bottom:none"
			tabBarStyle="width:33.33%">
		</swiper-tab-head>
		
		<!--主页-->
		<block v-for="(item,index) in tablist" :key="index">
			<template v-if="tabIndex==index">
				<template v-if="tabIndex==0">
					<user-space-userinfo :userinfo="userinfo"></user-space-userinfo>
				</template>
				<template v-else>
					<!--列表内容-->
					<block v-for="(list,listIndex) in item.list" :key="listIndex">
						<common-list :item="list" :index="listIndex"></common-list>
					</block>
					<!--上拉加载-->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</template>
		</block>
		
	</view>
</template>

<script>
	import userSpaceHead from "../../components/user-space/user-space-head.vue";
	import homeData from "../../components/home/home-data.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import userSpaceUserinfo from "../../components/user-space/user-space-userinfo.vue";
	import commonList from "../../components/common/common-list.vue";
	import loadMore from "../../components/common/load-more.vue";
	import userSpacePopup from "../../components/user-space/user-space-popup.vue";
	
	export default {
		components:{
			userSpaceHead,
			homeData,
			swiperTabHead,
			userSpaceUserinfo,
			commonList,
			loadMore,
			userSpacePopup
		},
		data() {
			return {
				popupShow:false,
				userinfo:{
					bgimg:1,
					userpic:"../../static/demo/userpic/11.jpg",
					username:"董云钊",
					sex:0,
					age:20,
					isgz:false,
					regtime:"2018-10-10",
					id:26004,
					birthday:"1990-11-28",
					job:"软件开发",
					path:"陕西渭南",
					qg:"已婚"
				},
				spacedata:[
					{name:"获赞",num:'10k'},
					{name:"关注",num:20},
					{name:"粉丝",num:30}
				],
				tabIndex:0,
				tabBars: [
					{name:'主页', id:'zhuye'},
					{name:'嗅事', id:'xiushi'},
					{name:'动态', id:'dongtai'} 
				],
				tablist:[
					{},
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
						]
					},
					{
						loadtext:"上拉加载更多...",
						list:[
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
		//监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e){
			if(e.index==0){this.togelShow();}
		},
		//上拉触底事件
		//页面滚动到底部的事件(不是scroll-view滚到底)常用于下拉下一页数据
		onReachBottom(){
			this.loadmore();
		},
		methods: {
			beizhu(){
				console.log("修改备注");
				this.togelShow();
			},
			lahei(){
				console.log("拉黑好友");
				this.togelShow();
			},
			//操作菜单显示/隐藏
			togelShow(){
				this.popupShow=!this.popupShow;
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
						titlepic:"",
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
.user-space-margin{
	margin: 15upx 0;
}
.user-space-data{
	background: #FFFFFF;
	position: relative;
	z-index: 10;
	border-top-left-radius: 20upx;
	border-top-right-radius: 20upx;
	margin-top: -15upx;
}

</style>
