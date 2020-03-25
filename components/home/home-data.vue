<template>
	<view class="home-data u-f-ajc">
		<block v-for="(data,index) in homedata" :key="index">
			<view class="u-fl u-f-ajc u-f-column">
				<view>{{data.num}}</view>{{data.name}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			homedata:Array
		}
	}
</script>

<style scoped>
	.home-data{
		padding: 20upx;
	}
	.home-data>view{
		color: #989898;
		height: 150upx;
	}
	.home-data>view>view{
		font-size: 32upx;
		color: #333333;
	}
</style>
