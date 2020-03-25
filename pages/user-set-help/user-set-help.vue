<template>
	<view>
		<view class="body">
			<uni-collapse>
				<block v-for="(item,index) in list" :key="index">
					<uni-collapse-item :title="item.title" :showAnimation="true">
						<view class="content">{{item.content}}</view>
					</uni-collapse-item>
				</block>
			</uni-collapse>
			
			
			<button class="user-set-btn" type="primary" hover-class="user-set-btn-hover">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
		},
		data() {
			return {
				list:[
					{
						title:"客服什么时候上线？",
						content:"insert 属性，确定当前的事件是 @change 还是 @confirm 。理应合并为一个事件，但是为了区分模式，现使用两个事件，这里需要注意"
					},
					{
						title:"忘记账号/昵称/密码怎么办？",
						content:"监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。"
					},
					{
						title:"怎么搜索/查找/关注/取关用户？",
						content:"如果想在App端实现点击某个tabitem不跳转页面，不能使用onTabItemTap，可以使用plus.nativeObj.view放一个区块盖住原先的tabitem，并拦截点击事件。"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("../../common/form.css");
.content{padding: 20upx;}
.user-set-btn{
	margin-top: 50upx;
}
</style>
