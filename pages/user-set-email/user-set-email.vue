<template>
	<view>
		<view class="body">
			<input type="text" class="uni-input common-input" 
				   v-model="emailnum" placeholder="输入邮箱账号"/>
			<input type="text" class="uni-input common-input" 
				   v-model="emailpwd" placeholder="输入邮箱密码"/>
				   
			<button class="user-set-btn" type="primary" hover-class="user-set-btn-hover"
					:class="{'user-set-btn-disable':disabled}"
				    @tap="submit()" :disabled="disabled">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:true,		//控制按钮状态
				loading:false,		//控制按钮加载状态
				emailnum:"",		//邮箱账号
				emailpwd:""			//邮箱密码
			}
		},
		//监听输入框值变化，然后调用change方法修改按钮状态
		watch:{
			emailnum(val){this.change()},
			emailpwd(val){this.change()},
		},
		methods: {
			//监听输入框后调用该方法控制按钮状态
			change(){
				if(this.emailnum && this.emailpwd){
					this.disabled=false;
					return;
				}
				this.disabled=true;
			},
			//验证层
			check(){
				// 验证邮箱格式
				if(!this.emailnum || this.emailnum==""){
					uni.showToast({title: '邮箱账号不能为空',icon:"none"});
					return false;
				}
				let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!ePattern.test(this.emailnum)){
					uni.showToast({title: '请输入正确邮箱格式',icon:"none"});
					return false;
				}
				// 验证邮箱密码
				if(!this.emailpwd || this.emailpwd==""){
					uni.showToast({title: '邮箱密码不能为空',icon:"none"});
					return false;
				}
				return true;
			},
			// 提交（点击提交，西安改变按钮状态，如果校验失败，）
			submit(){
				this.loading=true; this.disabled=true;
				if(!this.check()){ this.loading=false; this.disabled=false; return; }
				// 提交服务器
				uni.showToast({
					title: '提交服务器',
					mask: false,
					duration: 1500
				});
				this.loading=false; this.disabled=false;
			}
		}
	}
</script>

<style>
	@import url("../../common/form.css");
</style>
