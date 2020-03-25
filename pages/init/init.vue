<template>
    <view class="content">
		<view class="closeTime">
			<view @tap="closeInit">跳过 {{timerNum}}</view>
		</view>
        <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" class="swiper" :style="{'height':windowHeight}"
        @animationfinish="animationfinish">
            <swiper-item>
                <view class="swiper-item" :style="{'height':windowHeight}"><image src="../../static/bgimg/1.jpg"></image></view>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item" :style="{'height':windowHeight}"><image src="../../static/bgimg/2.jpg"></view>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item" :style="{'height':windowHeight}"><image src="../../static/bgimg/3.jpg"></view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                windowHeight: '603px'  ,//定义手机屏幕高度值变量
				timer: null, //首先我在data函数里面进行定义定时器名称：
				timerNum:5 // 设置定时器时间
            }
        },
		watch:{
			time(val){ }
		},
        onLoad() {
            var _me = this;
            uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
                success: function(res) {
                    _me.windowHeight = res.windowHeight + 'px';
                }
            });
			_me.timer = setInterval(() => {
					_me.timerNum --;
					if(_me.timerNum==0){
						_me.toLoginPage();
					}	
			}, 1000);
        },
        methods: {
            animationfinish(e) {
                //判断到最后一张后，自动转向进入首页--"当前播放图片为："+JSON.stringify(e.detail.current)
                if (e.detail.current == 0) {
                    console.log('dyz----第一遍动画已经播放结束');
                }
            },
			closeInit(){
				this.toLoginPage();
			},
			toLoginPage(){
				uni.redirectTo({
					url: "../login/login",
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
        },
		//onUnload方法中清除了定时器
		onUnload(){
			clearInterval(this.timer);
			this.timer = null;
		}
    }
</script>
<style>
    .swiper {width: 100%;}
	.swiper-item image{width: 100%;height: 100%;}
	.closeTime{position:absolute;z-index: 999;width:100%;display: flex;justify-content: flex-end;top:35upx;}
	.closeTime>view{padding:0 20upx; margin-right:15upx;border-radius: 10px;background-color:rgba(250,225,255,0.8);}
</style>
