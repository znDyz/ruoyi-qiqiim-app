<template>
	<view>
		<!--未登陆-->
		<template v-if="!isLogin">
			<view class="u-f-ajc">登陆防嗅百，体验更多功能</view>
			<!--第三方登陆-->
			<other-login></other-login>
			<!--账号登陆-->
			<view class="u-f-ajc" @tap="openlogin">
				账号密码登陆<view class="icon iconfont icon-jinru u-f-ajc"></view>
			</view>
		</template>
		<!--已登陆-->
		<template v-else>
			<home-info :homeinfo="homeinfo"></home-info>
		</template>
		
		<!--数据展示-->
		<home-data :homedata="homedata"></home-data>
		
		<!--广告位-->
		<view class="home-adv u-f-ajc">
			<image src="../../static/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		
		<!--功能列表-->
		<view class="home-list">
			<block v-for="(item,index) in list" :key="index">
				<home-list-item :item="item" :index="index"></home-list-item>
			</block>
		</view>
		
		<!--退出登录-->
		<view class="u-f-ajc u-f-jc">
			<button class="userLogout " hover-class="userregister-hover"
					@tap="logout()">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	import homeListItem from "../../components/home/home-list-item.vue";
	import homeInfo from "../../components/home/home-info.vue";
	import otherLogin from "../../components/home/other-login.vue";
	import homeData from "../../components/home/home-data.vue";
	
	export default {
		components:{
			homeListItem,
			homeInfo,
			otherLogin,
			homeData
		},
		data() {
			return {
				isLogin:true,
				homeinfo:{
					userpic:"../../static/demo/userpic/20.jpg",
					username:"昵称",
					totalnum:0,
					todaynum:0
				},
				homedata:[
					{name:"嗅事",num:10},
					{name:"动态",num:20},
					{name:"评论",num:30},
					{name:"收藏",num:40},
				],
				list:[
					{name:"浏览历史",icon:"liulan"},
					{name:"嗅百认证",icon:"huiyuanvip"},
					{name:"审核嗅事",icon:"keyboard1"}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url: '../user-set/user-set'
				});
			}
		},
		methods: {
			openlogin(){
				uni.navigateTo({
					url: '../login/login'
				});
			},
			logout(){
				const token = uni.getStorageSync('token');
				/* 异步请求 */
				this.iGlobal.request({
				    url:'/logout',
				    method:'POST'
				}).then((res)=>{
				    console.log("请求成功"+JSON.stringify(res));
					uni.navigateTo({
						url: '../login/login'
					})
				}).catch((err)=>{
				    console.log("请求失败");
				});
			}
		}
	}
</script>

<style>
.home-list{padding: 20upx;}
.home-adv{padding: 0 10upx;}
.home-adv>image{border-radius: 20upx;}
.userLogout{width:90%;margin: 10px 0;background: #DD524D;color: #FFFFFF;border: 0!important;}
.userLogout-hover{background: #171606;}
</style>
