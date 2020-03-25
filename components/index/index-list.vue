<template>
	<view class="index-list animated fadeInLeft fast">
		<view class="index-list1 u-f-ac u-f-jb">
			<view class="u-f-ac">
				<image :src="item.userpic" mode="widthFix" lazy-load></image>
				{{item.username}}
			</view>
			<view class="u-f-ac" v-show="!isgz" @tap="guanzhu">
				<view class="icon iconfont icon-zengjia"></view>关注
			</view>
		</view>
		<view class="index-list2 u-f" @tap="opendetail">{{item.title}}</view>
		<view class="index-list3 u-f-ajc"  @tap="opendetail">
			<!--图片-->
			<image :src="item.titlepic" mode="widthFix" lazy-load></image>
			<!--视频-->
			<template v-if="item.type=='video'">
				<view class="index-list-play iconfont icon-bofang"></view>
				<view class="index-list-playinfo">
					{{item.playnum}}次播放  {{item.long}}
				</view>
			</template>
		</view>
		<view class="index-list4 u-f-ac u-f-jb">
			<view class="u-f-ac">
				<view class="u-f-ac" :class="{'active':(infonum.index==1)}" @tap="caozuo('ding')">
					<view class="icon iconfont icon-smile"></view>
					{{infonum.dingnum}}
				</view>
				<view class="u-f-ac" :class="{'active':(infonum.index==2)}" @tap="caozuo('cai')">
					<view class="icon iconfont icon-icon_xiaolian-mian"></view>
					{{infonum.cainum}}
				</view>
			</view>
			<view class="u-f-ac">
				<view class="u-f-ac">
					<view class="icon iconfont icon-pinglun1"></view>
					{{item.plnum}}
				</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa"></view>
					{{item.zfnum}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		data() {
			return {
				isgz: this.item.isgz,
				infonum:this.item.infonum
			}
		},
		methods:{
			//点击标题或图片进入详情页
			opendetail(){
				let paramData = encodeURIComponent(JSON.stringify(this.item));
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData='+paramData
				});
			},
			//点击关注事件
			guanzhu(){
				this.isgz = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			//顶踩操作
			caozuo(type){
				switch (type){
					case "ding":
						if(this.infonum.index==1){return;}
						this.infonum.dingnum++;
						if(this.infonum.index==2){
							this.infonum.cainum--;
						}
						this.infonum.index=1;
						break;
					case "cai":
						if(this.infonum.index==2){return;}
						this.infonum.cainum++;
						if(this.infonum.index==1){
							this.infonum.dingnum--;
						}
						this.infonum.index=2;
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.index-list{
		padding: 20upx;
		border-bottom: 1upx solid #eeeeee;
	}
	.index-list2{
		padding-top: 15upx;
		font-size: 32upx;
	}
	.index-list3{
		position: relative;
		padding-top: 15upx;
	}
	.index-list3>image{
		width: 100%;
		border-radius: 20upx;
	}
	.index-list4{
		padding: 15upx 0;
	}
	.index-list1>view:first-child{
		color:#999999;
	}
	.index-list1>view:last-child{
		background:#F4F4F4;
		border-radius: 5upx;
	}
	.index-list1>view:last-child{
		padding: 0 10upx;
	}
	.index-list1>view:first-child image{
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 20upx;
	}
	.index-list-play{
		position: absolute;
		top: 20%;
		left: 40%;
		font-size: 140upx;
		color: #F2F2F2;
	}
	.index-list-playinfo{
		position: absolute;
		background: rgba(51,51,51,0.72);
		bottom: 8upx;
		right: 8upx;
		border-radius: 40upx;
		font-size: 22upx;
		padding: 0 12upx;
	}
	.index-list4 view{
		color:#999999;
	}
	.index-list4>view>view{
		margin-right: 15upx;
	}
	.index-list4>view>view>view{
		margin-right: 10upx;
	}
	.index-list4 .active,.index-list4 .active>view{
		color: #c5f61c;
	}
</style>
