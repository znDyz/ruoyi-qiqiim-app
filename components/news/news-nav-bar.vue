<template>
	<uni-nav-bar class="" statusBar="true" fixed="true" :border="false" @click-right="openPublish">
		<!-- 左边 -->
		<block slot="left">
			<view class="nav-left u-f-ajc">
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</block>
		<!-- 中间-->
		<view class="midTap u-f-ajc">
			<block v-for="(tab,index) in tabBars" :key="tab.id">
				<view :class="{'active':tabIndex==index}" @tap="changeTab(index)">
					{{tab.name}}
					<view v-if="(tabIndex==index)" class="nav-tab-bar-line"></view>
				</view>
			</block>
			
		</view>
		<!-- 右边-->
		<block slot="right">
			<view class="nav-right u-f-ajc">
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</block>
		
	</uni-nav-bar>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniNavBar
		}, 
		props:{
			tabBars:Array,
			tabIndex:Number
		},
		methods:{
			changeTab(index){
				this.$emit('change-tab',index);
			},
			openPublish:()=>{
				uni.navigateTo({
				    url: '../publish/publish'
				});
			}
		}
	}
</script>

<style>
	.midTap{
		width: 100%;
	}
	.midTap>view{
		font-size: 32upx;
		padding: 0 15upx;
		font-weight: bold;
		color: #969696;
	}
	.active{
		color: #333333!important;
	}
	.nav-tab-bar-line{
		border-top: 5upx solid #FEDE33;
		border-bottom: 5upx solid #FEDE33;
		width: 65upx;
		border-radius: 10upx;
	}
	.nav-left,.nav-right{
		margin-left: 16upx;
		width: 100%;
	}
	.nav-left>view,.nav-right>view{
		font-size: 45upx;
	}
	.nav-left>view{
		color: #FF9619;
	}
</style>
