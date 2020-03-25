<!-- 发布页面  -->
<template>
	<view>
		<!--自定义导航栏-->
		<uni-nav-bar left-icon="back" :statusBar="true" rightText="发布" @click-left="back" @click-right="publish">
			<view class="u-f-ajc ysSelect" @tap="changeLook">
					{{yinsi}}
					<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		<!--多行输入框-->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧..."></textarea>
		</view>
		<!--上传多图-->
		<uploadImg @upload="uploadMethod"></uploadImg>
		<!--弹出公告-->
		<!-- <uniPopup :show="showPopup" type="middle">
			<view>123456</view>
		</uniPopup> -->
		<uni-popup ref="popup" :show="showPopup" position="middle" :custom="true" @hidePopup="hidePopup">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view>1、涉及黄色、政治、广告及骚扰信息</view>
				<view>2、涉及人身攻击</view>
				<view>3、留联系方式，透漏他人隐私</view>
				<view>已经核实将被封禁，情节严重者永久封禁</view>
				<button type="default"  @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon/uni-icon.vue'
	import uploadImg from '../../components/common/upload-img.vue'
	import uniPopup  from '../../components/uni-popup/uni-popup.vue'
	
	let changeLook = ['所有人可见','仅自己可见'];
	
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uploadImg,
			uniPopup
		},
		data() {
			return {
				isget:false,
				showPopup:true,
				yinsi:'所有人可见',
				text:'',
				imageList:[],
			}
		},
		//监听页面返回事件（return true;--阻止返回  return false;--允许返回）
		onBackPress() {
			//如果有值的时候给出提示
			if(!this.text && this.imageList.length<1){
				return;
			}
			if(this.isget==false){
				this.baocun();
				return true;
			}
		},
		//页面加载的时候显示提示框
		onLoad() {
			this.$refs.popup.open();
			//this.$refs.popup.close();
		},
		methods: {
			//保存为草稿
			baocun(){
				uni.showModal({
					content:'是否要保存位草稿？',
					cancelText:'不保存',
					confirmText:'保存',
					success:(res)=> {
						if(res.confirm){
							console.log('保存');
						}else{
							console.log('不保存');
						}
						this.isget=true;
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			//隐藏提示框
			hidePopup(){
				this.showPopup = false;
			},
			//返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			//发布
			publish(){
				console.log("点击了发布。。")
			},
			//隐私选择
			changeLook(){
				uni.showActionSheet({
					itemList:['所有人可见','仅自己可见'],
					success : (res)=> {
						this.yinsi = changeLook[res.tapIndex]
					}
				})
			},
			//接收子页面传递过来的图片列表
			uploadMethod(arr){
				this.imageList = arr;
				console.log(arr);
			}
		}
	}
</script>

<style>
	.ysSelect{
		margin-left:27%;
	}
	textarea{
		border: 1upx solid #EEEEEE;
	}
	.gonggao{
		padding: 25upx 30upx;
		border: 2upx solid #FFFFFF;
		background: #FFFFFF;
		width: 550upx;
		height: 650upx;
	}
	.gonggao image{
		width: 70%;
		margin-bottom: 20upx;
	}
	.gonggao button{
		background: #FFE934;
		color: #171606;
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.gonggao>view:nth-of-type(2),
	.gonggao>view:nth-of-type(3),
	.gonggao>view:nth-of-type(4),
	.gonggao>view:nth-of-type(5){
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 20upx;
	}
</style>
