<template>
	<view>
		<!--状态栏-->
		<uni-status-bar bgcolor="#FFE933"></uni-status-bar>
		<!--关闭图标 <view class="icon iconfont icon-guanbi" style="color: red;" @tap="back"></view>-->
		<!--引入背景图-->
		<image class="loginhead" src="../../static/common/loginhead.png" mode="widthFix"></image>
		<!--输入框+按钮-->
		<view class="body">
			<template v-if="status">
				<!--账号密码登陆-->
				<input v-model="username" type="text" 
					   class="uni-input common-input" placeholder="账号"/>
				<view class="login-input-box">
					<input v-model="password" type="text" password="true"
						   class="uni-input common-input forget-input" placeholder="密码"/>
					<view class="forget u-f-ajc login-font-color">忘记密码</view>
				</view>
				 <view class="login-input-box">
				 	<input v-model="code" type="text" 
				 		   class="uni-input common-input forget-input" placeholder="验证码"/>
				 	<view class="forget u-f-ajc login-font-code"><image :src="codeUrl" @tap="getCode"></image></view>
				 </view>
				 <view class="login-input-box">
				 	<checkbox-group @change="checkboxChange" class="u-f">
						<view>
							<checkbox :checked="rememberMe" class="checkBox"/>
						</view>
				 		<view style="color:#007AFF"> 记住密码</view>
				 	</checkbox-group>
				 </view>
			</template>
			<template v-else>
				<!--手机验证码登陆-->
				<view class="login-input-box">
					<view class="phone u-f-ajc">+86</view>
					<input v-model="phonenum" type="text" 
						   class="uni-input common-input phone-input" placeholder="手机号"/>
				</view>
				<view class="login-input-box">
					<input v-model="checknum" type="text" 
						   class="uni-input common-input forget-input" placeholder="输入验证码"/>
					<view class="forget u-f-ajc login-font-color yanzhengma">
						<view class="u-f-ajc" @tap="getCheckNum">
							{{!codetime?'获取验证码':codetime+' s'}}
						</view>
					</view>
				</view>
			</template>
			
			<button class="user-set-btn" type="primary" hover-class="user-set-btn-hover"
					:class="{'user-set-btn-disable':disabled}"
				    @tap="submit()" :disabled="disabled">登陆</button>
			<button class="userregister" hover-class="userregister-hover"
					@tap="register()">注册</button>
		</view>
		<!--登陆状态切换
		<view class="login-status u-f-ajc login-padding" @tap="changeStatus">
			{{!status?'账号密码登陆':'手机验证码登陆'}}<view class="icon iconfont icon-jinru login-font-color"></view>
		</view>
		-->
		
		<!--第三方登陆
		<view class="other-login-title u-f-ajc login-padding login-font-color">第三方登陆</view>
		<other-login></other-login>
		-->
		
		<!--协议-->
		<view class="login-rule u-f-ajc login-padding login-font-color">
			注册即代表您同意<view @tap="toIndex()">《仿嗅事百科用户协议》</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../../components/uni-status-bar/uni-status-bar.vue";
	import otherLogin from "../../components/home/other-login.vue";
	
	export default {
		components:{
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				codeUrl: "",		//验证码图片
				username: "",		//用户名	
				password: "",		//用户密码
				rememberMe: false,	//是否记住账号
				code: "",			//验证码
				uuid: "",			//设备id
				status:true,		//true:账号密码登陆，false:手机验证码登陆
				disabled:true,		//控制按钮状态
				loading:false		//控制按钮加载状态
			}
		},
		watch:{
			username(val){this.OnBtnChange();},
			password(val){this.OnBtnChange();},
			code(val){this.OnBtnChange();}
		},
		onLoad:function(options){
			this.getCode();
		},
		methods: {
			//校验手机号码
			isPhone(){
				let mPattern = /^1[3456789]\d{9}$/;
				return mPattern.test(this.phonenum);
			},
			//获取验证码，如果codetime大于0说明正在获取验证码
			getCheckNum(){
				if(this.codetime>0){return;}
				//验证手机号合法性
				if(this.isPhone()){
					uni.showToast({title: '请输入正确手机号',icon:'none'});
					return;
				}
				//请求服务器，发送验证码发送成功，开启倒计时
				this.codetime=10;
				let timer = setInterval(()=>{
					this.codetime--;
					if(this.codetime < 1){
						clearInterval(timer);
						this.codetime=0;
					}
				},1000);
			},
			//初始化表单
			initInput(){
				this.username="";
				this.password="";
				this.code="";
				this.phonenum="";
				this.checknum="";
			},
			//改变按钮状态
			OnBtnChange(){
				if((this.username && this.password)||(this.phonenum && this.checknum)){
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			//提交登陆，账号密码登陆
			submit(){
				let _this = this;
				if(_this.status==true){
					var form = {}
					if(_this.username && _this.password){
						/* 
						uni.request({
						    url: 'http://192.168.1.2:8080/mobileLogin', //仅为示例，并非真实接口地址。
							method:'POST',
						    data: { username:this.username,password:this.password,code:this.code,uuid:this.uuid},
						    header: {'content-type': 'application/x-www-form-urlencoded'},
						    success: (res) => {
						        console.log(res.data.msg+"--->返回的token："+res.data.token);
						    }
						}); 
						*/
						this.iGlobal.request({
						    url:'/mobileLogin', method:'POST',
							data:{
								username:_this.username,
								password:_this.password,
								code:_this.code,
								uuid:_this.uuid
							}
						}).then((res)=>{
							console.log("登陆成功返回的数据："+JSON.stringify(res));
							if(res.code=="200" && res.token){
								uni.setStorageSync('token', res.token);
								if(_this.rememberMe){
									uni.setStorageSync('username', _this.username);
									uni.setStorageSync('password', _this.password);
								}
								_this.toIndex();
							} 
						}).catch((err)=>{
						    console.log("请求失败"+JSON.stringify(res));
						});
					}
				}
			},
			//切换登陆方式
			changeStatus(){
				this.initInput();
				this.status = !this.status;
			},
			//用户注册
			register(){
				uni.navigateTo({ url: 'register'});
			},
			toIndex(){
				uni.switchTab({ url: "../index/index"});
				//uni.navigateTo({ url: '../chat/chat'});
			},
			getCode(){
				let _this = this;
				this.iGlobal.request({
				    url:'/captchaImage', method:'GET'
				}).then((res)=>{
					console.log(JSON.stringify(res));
				    _this.codeUrl = "data:image/gif;base64," + res.img;
					_this.uuid = res.uuid;
				}).catch((err)=>{
					console.log("请求失败"+JSON.stringify(res));
				});
			},
			checkboxChange(){
				this.rememberMe = !this.rememberMe;
			}
		}
	}
</script>

<style>
@import url("../../common/form.css");
.login-font-color{color:#007AFF;}
.login-font-code{}
.login-font-code image{width:100%;height: 80%;}
.login-padding{padding: 20upx 0;}
.loginhead{width: 100%;}
.icon-guanbi{position:fixed;top: 60upx;left: 30upx;font-size: 40upx;font-weight: bold;color: #332F0A;}
.login-rule view{color: #007AFF;}
.other-login-title{position: relative;}
.other-login-title:before,.other-login-title:after{
	content: "";
	position: absolute;
	background: #CCCCCC;
	height: 1upx;
	width: 100upx;
	top: 50%;
}
.other-login-title:before{left: 25%;}
.other-login-title:after{right: 25%;}
.login-input-box{position: relative;}
.login-input-box .forget,.login-input-box .phone{position: absolute;top: 0;height: 100%;z-index: 100;}
.login-input-box .forget{right: 0;width: 150upx;}
.login-input-box .phone{left: 0;width: 100upx;font-weight: bold;}
.login-input-box .forget-input{}
.login-input-box .phone-input{padding-left: 100upx;}
.yanzhengma view{background: #EEEEEE;border-radius: 10upx;font-size: 25upx;width: 150upx;padding: 10upx 0;}
.userregister{width: 100%;margin: 10px 0;background: #007AFF;color: #FFFFFF;border: 0!important;}
.userregister-hover{color: #171606;}
.login-input-box checkbox-group view{padding: 20upx;}
.login-input-box checkbox-group checkbox{color:#007AFF;width:70upx;}
</style>
