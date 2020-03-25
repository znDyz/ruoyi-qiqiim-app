<template>
    <view class="content">
		<view class="closeTime">
			<view @tap="closeInit">跳过 {{timerNum}}</view>
		</view>
        <view>
			<image src="../../static/bgimg/1.jpg"></image>
		</view>
    </view>
</template>
<script>
	//../..protobuf/proto/js/build/messagebody.js
	import messages from '../../protobuf/proto/js/build/messagebody.js'
	
    export default {
		components:{
			messages
		},
        data() {
            return {
                windowHeight: '603px'  ,timer: null, timerNum:200 
            }
        },
        onLoad() {
			var p = new proto.MessageBody();
			p.setTitle("Tom"); p.setContent("这是我的第一条内容");	// 赋值
			// 序列化
			var bytes = p.serializeBinary();
			console.log(bytes);
			// 反序列化
			var p2 =  proto.MessageBody.deserializeBinary(bytes);
			console.log(p2);
			var title = p2.getTitle();
			var content = p2.getContent();
			
			console.log("my title is :"+ title, "content is:"+ content); 
        },
        methods: {
           
        }
    }
</script>
<style>
    .swiper {
        width: 100%;/* height: 100vw;  background: red; */
    }
	.swiper-item image{
		width: 100%;height: 100%;
	}
	.closeTime{position:absolute;z-index: 999;width:100%;display: flex;justify-content: flex-end;top:35upx;}
	.closeTime>view{padding:0 20upx; margin-right:15upx;border-radius: 10px;background-color:rgba(250,225,255,0.8);}
</style>
