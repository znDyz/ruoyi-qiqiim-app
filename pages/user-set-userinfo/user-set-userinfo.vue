<template>
	<view class="body">
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>头像</view>
			<view class="u-f-ac" @tap="changeimg">
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>昵称</view>
			<view class="u-f-ac">
				<input type="text" v-model="username"/>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>性别</view>
			<view class="u-f-ac" @tap="changeOne('xb')">
				<view>{{sex}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="u-f-ac">
					<view>{{birthday}}</view>
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</picker>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>职业</view>
			<view class="u-f-ac" @tap="changeOne('zy')">
				<view>{{job}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>情感</view>
			<view class="u-f-ac" @tap="changeOne('qg')">
				<view>{{qg}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jb">
			<view>家乡</view>
			<view class="u-f-ac" @tap="showMulLinkageThreePicker">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		
		<button class="user-set-btn" type="primary" @tap="submit">完成</button>
		
		<mpvue-city-picker 
			ref="mpvueCityPicker" 
			themeColor="#007AFF" 
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel" 
			@onConfirm="onConfirm">
		</mpvue-city-picker>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	let xbArr=['不限','男','女'];
	let qgArr=['秘密','未婚','已婚','离异'];
	let zyArr=['秘密','司机','教师','程序员','警察'];
	export default {
		components: {
			mpvueCityPicker
		},
		//监听页面返回，关闭城市选择器
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		//监听页面卸载，关闭城市选择器
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		data() {
			return {
				userpic:"../../static/demo/userpic/15.jpg",
				username:"蒙娜丽莎",
				sex:"不限",
				qg:"未婚",
				job:"教师",
				birthday:"1987-02-07",
				pickerText:"广东省-深圳市-南山区",
				cityPickerValueDefault:[0,0,1],
			}
		},
		//计算属性
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {console.log("城市选择器选择了取消")},
			onConfirm(e) {this.pickerText = e.label},
			//修改生日
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			//修改图像
			changeimg(){
				uni.chooseImage({
					count:1,					//选择图片的数量
					sizeType:['compressed'],	//图像为压缩过的图片
					success: (e)=>{
						this.userpic = e.tempFilePaths[0];
					}
				})
			},
			changeOne(val){
				let sheetItemArr = [];
				switch (val){
					case "xb":
						sheetItemArr = xbArr;
						break;
					case "zy":
						sheetItemArr = zyArr;
						break;
					case "qg":
						sheetItemArr = qgArr;
						break;
				}
				uni.showActionSheet({
				    itemList: sheetItemArr,
				    success: (res)=> {
						switch (val){
							case 'xb':
								this.sex=sheetItemArr[res.tapIndex];
								break;
							case 'zy':
								this.job=sheetItemArr[res.tapIndex];
								break;
							case 'qg':
								this.qg=sheetItemArr[res.tapIndex];
								break;
						}
				    }
				});
			},
			submit(){
				
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
	.user-set-userinfo-list{
		padding: 20upx;
		border-bottom: 1upx solid #F4F4F4;
	}
	.user-set-userinfo-list>view:first-child{
		font-size: 32upx;
		font-weight: bold;
		color: #9B9B9B;
	}
	.user-set-userinfo-list>view:last-child>image{
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}
	.user-set-userinfo-list>view:last-child>input{
		text-align: right;
	}
	.user-set-userinfo-list>view:last-child>view:last-of-type{
		margin-left: 20upx;
		color: #9B9B9B;
	}
</style>
