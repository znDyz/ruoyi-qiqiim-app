<template>
	<view class="body">
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
		<button class="user-set-btn" type="primary" hover-class="user-set-btn-hover">退出登录</button>
	</view>
</template>
-HOVER
<script>
	import homeListItem from "../../components/home/home-list-item.vue";
	export default {
		components:{
			homeListItem
		},
		data() {
			return {
				list:[
					{name:"账号安全",icon:"liulan",
						clicktype:"navigateTo",url:"../../pages/user-set-repwd/user-set-repwd"},
					{name:"绑定邮箱",icon:"huiyuanvip",
						clicktype:"navigateTo",url:"../../pages/user-set-email/user-set-email"},
					{name:"编辑资料",icon:"bianji",
						clicktype:"navigateTo",url:"../../pages/user-set-userinfo/user-set-userinfo"},
					{name:"小 纸 条",icon:"xiaoxi",
						clicktype:"navigateTo",url:""},
					{name:"清除缓存",icon:"qingchu",
						clicktype:"clearData",url:""},
					{name:"意见反馈",icon:"yiwen",
						clicktype:"navigateTo",url:"../../pages/user-set-help/user-set-help"},	
					{name:"关于嗅百",icon:"xihuan1",
						clicktype:"navigateTo",url:"../../pages/user-set-about/user-set-about"},	
					{name:"跳转动态",icon:"faxian",
						clicktype:"switchTab",url:"../../pages/news/news"}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../common/form.css");
</style>
