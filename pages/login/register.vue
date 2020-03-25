<template>
    <view>
        <view style="display:flex;padding:20upx;">
            <form @submit="formSubmit" @reset="formReset">
				<input name="deptIds" value="101" style="display: none;"/>
				
				<view class="formBlock">
				    <view class="blockName"><view>用户名称</view></view>
					<view class="blockField">
						<input v-model="formData.userName" name="userName" placeholder="用户名称" placeholder-class="input-placeholder"/>
					</view>
				</view>
				
				<view class="formBlock">
				    <view class="blockName"><view>用户密码</view></view>
					<view class="blockField">
						<input v-model="formData.password" name="password" password="true" placeholder="用户密码" placeholder-class="input-placeholder"/>
					</view>
				</view>
				
				<view class="formBlock">
				    <view class="blockName"><view>手机号码</view></view>
					<view class="blockField">
						<input v-model="formData.phonenumber" name="phonenumber" placeholder="手机号码" placeholder-class="input-placeholder"/>
					</view>
				</view>
				
				<view class="formBlock">
				    <view class="blockName"><view>用户昵称</view></view>
					<view class="blockField">
						<input v-model="formData.nickName" name="nickName" placeholder="用户昵称" placeholder-class="input-placeholder"/>
					</view>
				</view>
				
				<view class="formBlock">
				    <view class="blockName"><view>邮箱</view></view>
					<view class="blockField">
						<input v-model="formData.email" name="email" placeholder="邮箱" placeholder-class="input-placeholder"/>
					</view>
				</view>
				
				<view class="formBlock">
					<view class="blockName"><view>性别</view></view>
					<view class="blockField">
						<picker class="customPicker" @change="bindPickerChange_sex" name="sex" :value="sexIndex" :range="sexArray" mode=selector>
							<view class="picker-input">{{sexArray[sexIndex]}}</view>
							<view class="picker-icon">
								<view class="uni-icon uni-icon-arrowdown"/>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="formBlock">
					<view class="blockName"><view>角色</view></view>
					<view class="blockField">
						<picker class="customPicker" @change="bindPickerChange_role" name="roleIds" :value="roleIndex" :range="roleArray" mode=selector>
							<view class="picker-input">{{roleArray[roleIndex]}}</view>
							<view class="picker-icon">
								<view class="uni-icon uni-icon-arrowdown"/>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="formBlock">
					<view class="blockName"><view>岗位</view></view>
					<view class="blockField">
						<picker class="customPicker" @change="bindPickerChange_post" name="postIds" :value="postIndex" :range="postArray" mode=selector>
							<view class="picker-input">{{postArray[postIndex]}}</view>
							<view class="picker-icon">
								<view class="uni-icon uni-icon-arrowdown"/>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="formBlock">
					<view class="blockName"><view>状态</view></view>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
					<view class="blockField">
						<radio-group style="padding-top:10upx;" name="status">
							<label class="radio"><radio value="0" checked="true"/>正常</label>
							<label class="radio"><radio value="1" />停用</label>
						</radio-group>
					</view>
				</view>
				
				<view class="formBlock">
					<view class="blockName"><view>备注</view></view>
					<view class="blockField field-textarea">
						<view class="uni-textarea">
							<textarea v-model="formData.remark" @blur="bindTextAreaBlur" auto-height placeholder="备注信息" placeholder-class="input-placeholder"/>
						</view>
					</view>
				</view>
				<view class="formBlock center"> 
					<view class="uni-btn-v formBtn">
						<button type="primary" form-type="submit">提交</button>
						<button type="warn" form-type="reset">重置</button>
					</view>
				</view>
            </form>
        </view>
		<!--协议-->
		<view class="login-rule u-f-ajc login-padding login-font-color">
			注册即代表您同意<view>《仿嗅事百科用户协议》</view>
		</view>
    </view>
</template>
<script>
	import uniIcon from "../../components/uni-icon/uni-icon.vue"
    export default {
		components: {
			uniIcon
		},
        data() {
                return {
					formData: {
					        nickName: "",
					        phonenumber: "",
					        email: "",
					        userName: "",
					        password: "",
					        sex: "",
					        deptId: "101",
					        postIds: "",
					        roleIds: "",
					        status: 0,
					        remark: "",
					},
                    title: 'picker',
                    sexArray: ['请选择','男', '女', '未知'],
                    sexIndex: 0,
					roleArray:['请选择','超级管理员', '普通用户'],
					roleIndex:0,
					postArray:['请选择','董事长', '项目经路','人力资源','普通员工'],
					postIndex:0
                }
        },
        methods: {
            formSubmit: function(e) {
                var formdata = e.detail.value; 
				console.log("用户注册请求成功："+JSON.stringify(formdata));
				if(this.formValidate(formdata)){
					uni.request({
					    url: this.config.requestUrl+'/register',
						method:'POST',
					    data:formdata,
					    header: {'content-type': 'application/x-www-form-urlencoded'},
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({ title: '恭喜您注册成功'});
								setTimeout(()=>{
									uni.navigateBack({delta:1});
								},1000);
							}
						}
					});
				}
            },
            formReset: function(e) {
                this.sexIndex = 0;
				this.roleIndex = 0;
				this.postIndex = 0;
            }, 
			//下拉选择之后赋值给对应元素
			bindPickerChange_sex: function(e) {this.sexIndex = e.target.value},
			bindPickerChange_role: function(e) {this.roleIndex = e.target.value},
			bindPickerChange_post: function(e) {this.postIndex = e.target.value},
			radioChange:function(evt){
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.formData.status = i;
						break;
					}
				}
			},
			bindTextAreaBlur: function (e) {console.log(e.detail.value)},
			formValidate(formdata){
				let loginRules = [
				  {name: 'userName',   	required: true, type: 'lengthRange', errmsg: '请输入合法用户名'},
				  {name: 'password',   	required: true, type: 'pwd', errmsg: '密码须是6～16位字符'},
				  //{name: 'repassword', required: true, type: 'eq', eqName: 'pwd',  errmsg: '两次输入密码不一致'},
				  {name: 'phonenumber',	required: true, type: 'phone', errmsg: '请输入合法手机'},
				  {name: 'nickName',   	required: true, type: 'lengthRange', errmsg: '请输入合法昵称'},
				  {name: 'email',      	required: true, type: 'email', errmsg: '请输入合法邮箱'},
				  {name: 'sex',        	required: true, type: 'range', min: 1, max: 6, errmsg: '请选择性别'},
				  {name: 'roleIds',    	required: true, type: 'range', min: 1, max: 6, errmsg: '请选择角色'},
				  {name: 'postIds',    	required: true, type: 'range', min: 1, max: 6, errmsg: '请选择岗位'},
				  {name: 'deptIds',	   	required: true, type: 'range', min: 100, max: 120, errmsg: '请选择部门'},
				  {name: 'status', 	   	required: false},
				  {name: 'remark', 		type: 'lengthRange', min:0, max: 50, errmsg: '请正确输入备注'}
				]
				let valLoginRes = this.$validate.validate(formdata, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',title: valLoginRes.errmsg
					})
					return false;
				}else{
					return true;
				}
			}
        }
    }
</script>

<style>
	.formBlock{display:flex;justify-content:space-between;align-items:center;padding:12upx 20upx 8upx 20upx;border-bottom:solid 1upx #F2F2F2;}
	.blockName{width:24%;height:75upx;text-align:center;position: relative;}
	.blockName>view{position:absolute;bottom:0upx;font-size:38upx;}
	.blockField{width:73%;height:75upx;}
	.field-textarea{height:auto;}
	.blockField>input{border-radius:10upx;border:solid 1px #D8D8D8;font-size:35upx;padding:11upx 20upx 8upx 20upx;}
	.input-placeholder{color:#AAAAAA;font-size:35upx}
	.customPicker{height:95%;padding:0 20upx;border-radius:10upx;outline: #2C405A;border:solid 1px #D8D8D8;position: relative;}
	.picker-input {height:100%;width:95%; line-height:65upx; font-size:35upx;color:#AAAAAA;background: #FFF;position: absolute;}
	.picker-icon{position: absolute;right:20upx;top:5px;}
	.uni-icon-arrowdown{color:#9B9B9B;font-size:25upx;}
	.radio{font-size: 32upx;}
	.uni-textarea>textarea{border:solid 1px #D8D8D8;font-size:35upx;border-radius:10upx;}
	.formBlock>.formBtn{display:flex;height:100%;}
	.center{justify-content: center!important;}
	.uni-btn-v>button{margin-right:5upx;padding: 0 80upx;font-size: 30upx;}
	.login-rule view{color: #007AFF;}
</style>