<template>
	<view>
		<view class="body">
			<input type="text" class="uni-input common-input" 
				   v-model="oldpassword" placeholder="输入原始密码"/>
			<input type="text" class="uni-input common-input" 
				   v-model="newpassword" placeholder="输入新密码"/>
			<input type="text" class="uni-input common-input" 
				   v-model="renewpassword" placeholder="输入确认密码"/>
				   
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
				oldpassword:"",		//旧密码
				newpassword:"",		//新密码
				renewpassword:""	//确认信密码
			}
		},
		//监听输入框值变化，然后调用change方法修改按钮状态
		watch:{
			oldpassword(val){this.change()},
			newpassword(val){this.change()},
			renewpassword(val){this.change()}
		},
		methods: {
			//监听输入框后调用该方法控制按钮状态
			change(){
				if(this.oldpassword && this.newpassword && this.renewpassword){
					this.disabled=false;
					return;
				}
				this.disabled=true;
			},
			//验证层
			check(){
				if(!this.oldpassword || this.oldpassword==""){
					uni.showToast({title: '旧密码不能为空',icon:"none"});
					return false;
				}
				if(!this.newpassword || this.newpassword==""){
					uni.showToast({title: '新密码不能为空',icon:"none"});
					return false;
				}
				if(!this.renewpassword || this.renewpassword==""){
					uni.showToast({title: '确认密码不能为空',icon:"none"});
					return false;
				}
				if(this.newpassword !== this.renewpassword){
					uni.showToast({title: '确认密码和新密码不一致',icon:"none"});
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
