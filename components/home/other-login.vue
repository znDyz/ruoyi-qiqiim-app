<template>
	<view class="other-login u-f-ajc">
		<block v-for="(item,index) in providerList" :key="index">
			<view class="u-f-ajc u-fl" @tap="tologin(item)">
				<view class="icon iconfont u-f-ajc"
				      :class="['icon-'+item.icon]"></view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			
		},
		data() {
			return {
				providerList: []
			}
		},
		onReady() {
			this.getLoginAuth();
		},
		methods:{
			//获取当前登陆渠道
			getLoginAuth(){
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							let icon = '';
							switch (value) {
								case 'weixin':
									providerName = '微信登录';
									icon = 'weixin';
									break;
								case 'qq':
									providerName = 'QQ登录';
									icon = 'QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录';
									icon = 'xinlangweibo';
									break;
								case 'xiaomi':
									providerName = '小米登录';
									icon = 'shezhi';
									break;
							}
							return {
								name: providerName,
								icon:icon,
								id: value
							}
						});
						
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				});
			},
			//登陆方法
			tologin(provider) {
				uni.login({
					provider: provider.id,
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user',  //支付宝小程序需设置授权类型
			        // #endif
					success: (res) => {
						console.log('login success（登陆成功）:', res);
						//登陆成功，需要保存到本地存储，修改当前登陆状态
					},
					fail: (err) => {
						console.log('login fail（登陆失败）:', err);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.other-login{
		padding: 20upx 80upx;
	}
	.other-login>view>view{
		width:100upx;
		height:100upx;
		border-radius:100%;
		font-size: 55upx;
		color: #FFFFFF;
	}
</style>
