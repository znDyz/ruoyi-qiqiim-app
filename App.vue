<script>
	export default {
		onLaunch: function() {	//app打开时调用
			this.lib.NetWork.On();			//网路监听（用户目前断网，切换wifi）
		},
		onShow: function() {	
			//app前台运行时调用，app打开验证token，如果验证通过直接跳转index页面，
			//验证未通过，清除本地token，跳转登录页面
			var token = uni.getStorageSync("token");
			console.log("onShow方法中获取的token="+token);
			if(token!="" && token!=null && token!=undefined){
				this.iGlobal.request({
				    url:'/checkToken', method:'POST',
				}).then((res)=>{
					console.log("onshou方法返回值："+JSON.stringify(res));
					if(res.code==200){
						uni.reLaunch({ url: "./pages/index/index"});
					}else{
						uni.getStorageSync("");
					}
				})
			}
		},
    		//dyzZn第一次测试提交
		onHide: function() {	//app后台运行时调用
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 引入官方css样式 */
	@import './common/uni.css';
	/* 引入自定义图标库 */
	@import './common/icon.css';
	/* 引入动画库 */
	@import './common/animate.css';
	/* 引入公共样式 */
	@import './common/common.css';
</style>
