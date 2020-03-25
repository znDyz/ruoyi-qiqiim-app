<template>
	<view class="u-f u-f-jb home-list-item" 
		  hover-class="home-list-item-hover"
		  @tap="clickevent">
		<view class="u-f-ajc">
			<view class="icon iconfont" v-if="item.icon"
				  :class="['icon-'+item.icon]">
			</view>
			{{item.name}}
		</view>
		<view class="icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods:{
			clickevent(){
				switch (this.item.clicktype){
					case "navigateTo":
						if(this.item.url){uni.navigateTo({url: this.item.url});}
						break;
					case "switchTab":
						if(this.item.url){uni.switchTab({url: this.item.url});}
						break;
					case "clearData":
						uni.showModal({
							title: '提示',
							content: '是否要清除缓存',
							confirmText: '立刻清除',
							success: res => {
								if(res.confirm){
									uni.clearStorage();	//清除缓存操作
									uni.showToast({title: '清除缓存成功！'});
								}
							},
						});
						break;
						
				}
			}
		}
	}
</script>

<style scoped> 
.home-list-item{
	padding: 20upx;
	border-top: 1upx solid #F4F4F4;
	border-bottom: 1upx solid #F4F4F4;
	font-size: 32upx;
}
.home-list-item>view:first-child{
	color: #333333;
}
.home-list-item>view:first-child>view:first-child{
	margin-right: 10upx;
}
.home-list>view>view:last-child{
	color: #CCCCCC;
}
.home-list-item-hover{
	background: #F4F4F4;
}
.icon-liulan{
	color: #007AFF;
}
.icon-huiyuanvip{
	color: #F0AD4E;
}
.icon-keyboard1{
	color: #FF968D;
}
</style>
