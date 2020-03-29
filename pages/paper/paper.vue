<template>
	<view class="body">
		<!--左侧操作菜单-->
		<paper-left-popup :popupShow="popupShow"
			@hide="hidePopup"
			@addFriends="addFriends"
			@clearCache="clearCache"
			></paper-left-popup>
		<!--
		小纸条列表
		<block v-for="(item,index) in list" :key="index">
			<paper-list :item="item" :index="index"></paper-list>
		</block>
		上拉加载
		<load-more :loadtext="loadtext"></load-more>
		-->
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabCentChange="tabChange">
		</swiper-tab-head>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" @change="slideChange"
					:style="{height:swiperheight+'px'}" :current="tabIndex">
				<swiper-item v-for="(items,index) in tabBars" :key="index">
					
					<template v-if="index==0">
						<scroll-view scroll-y @scrolltolower="loadmore(index)" style="height:100%;">
							<template v-if="myfriend.list.length>0">
								<block v-for="(item, i) in myfriend.list" :key="i">
									<paper-list :item="item" :index="i"></paper-list>
								</block> 
								<!--上拉加载组件-->
								<load-more :loadtext="myfriend.loadtext"></load-more>
							</template>
							<template v-else>
								<!--无内容默认组件-->
								<noThing></noThing>
							</template>
						</scroll-view>
					</template>
					
					<!--我的群组-->
					<template v-if="index==1">
						<view>
							1111111111111111111111111111111111111111111111
						</view>
					</template>
					
					<!--公司用户组织架构-->
					<template v-if="index==2">
						<view>
							22222222222222222222222222222222222222222222222
						</view>
						<!-- <view class="structure">
							<view class="stre-bd">
								<view class="structure">
									<view class="companyName icon" @click="showdepartment" :class="isdepartment ? 'onicon' : ''">
										<text>{{items.companyName}}</text>
									</view>
									<view class="department" v-show="isdepartment">
										<view class="department-items icon" v-for="(item, i) in items.department" :key="i" :class="{onicon: index === a}">
											<view class="sector" @click="showstaffs(i)">
												<text>{{item.sector}}</text>
											</view>
											<view class="staffs" :class="{on: i === a}">
												<view class="staff" v-for="(person, j) in item.staffs" :key="j">
													<view class="staffsname" v-if="person.state">
														<text class="iconfont" style="color: #68a6ff;">&#xe606;</text>
														<text style="color: #000000;">{{person.name}}</text>
														<text style="color: #68a6ff; font-size: 24upx;margin-left:10upx;">[在线]</text>
													</view>
													<view class="staffsname" v-else>
														<text class="iconfont" style="color: #d2d2d2;">&#xe606;</text>
														<text style="color: #b4b4b4;">{{person.name}}</text>
														<text style="color: #d2d2d2; font-size: 24upx;margin-left:10upx;">[离线]</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view> -->
					</template>
					
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue";
	import loadMore from "../../components/common/load-more.vue";
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		
		//system/dept/treeselect
		
		components: {
			paperList,
			loadMore,
			paperLeftPopup,
			swiperTabHead,
			noThing
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
					{name: '好友',id: 'haoyou'}, 
					{name: '群组',id: 'qunzu'},
					{name: '机构',id: 'gongsi'}
				],
				isdepartment: true,
				isstaffs: true,
				a: -1,
				popupShow:false,
				myfriend:{
					loadtext:"上拉加载更多...",
					list:[
						{
							userpic:"../../static/demo/userpic/1.jpg",
							username:"钊钊娜娜",
							time:"10:10",
							data:"收到消息请回复，哈哈",
							noreadnum:8,
							uuid:"e05d2e58-e0d5-470d-8fb6-11d3b0852eff"
						}
					]
				},
				mygroup:{
					loadtext:"上拉加载更多...",
					list:[]
				},
				company:{
					companyName: "西安时代飞翎信息技术有限公司",
					department: [{
							sector: "产品研发部",
							staffs: [
								{name: "张丽颖",state: true},
								{name: "刘建轻",state: true},
								{name: "王盈利",state: false},
								{name: "马健五",state: false}
							]
						}
					]
				}
			}
		},
		onLoad(){
			let _this = this;
			uni.getSystemInfo({
			    success:(res)=> {
			        let height = res.screenHeight-uni.upx2px(100);
			        _this.swiperheight = height;
			    }
			});
			_this.initloadData();
		},
		//页面滚动到底部的事件(不是scroll-view滚到底)常用于下拉下一页数据
		onReachBottom(){
			this.loadmore();
		},
		//监听该页面用户下拉刷新事件
		onPullDownRefresh(){
			this.getData();
			uni.stopPullDownRefresh();
		},
		//监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({url: '../user-list/user-list'});
			}
			if(e.index==1){
				this.showPopup();
			}
		},
		methods: {
			showPopup(){this.popupShow=true;},		//显示菜单
			hidePopup(){this.popupShow=false;},		//隐藏菜单
			addFriends(){
				console.log("添加好友");this.hidePopup();
			},
			clearCache(){
				console.log("清除缓存");this.hidePopup();
			},
			//上拉加载更多：如果不是"上拉加载"，证明已经在请求数据，所以直接return
			loadmore(){
				//this.tablist[this.tabIndex].loadtext = "没有更多数据了...";
			},
			//点击切换子页面（0，1，2）触发slideChange(e)方法---滑动切换子页面
			tabChange(index){this.tabIndex = index;},
			slideChange(e){
				this.tabIndex = e.detail.current;
				this.getData();
			},
			getData(){
				if(this.tabIndex==0){
					console.log("加载好友数据");
				}
				if(this.tabIndex==1){
					console.log("加载群组数据");
				}
				if(this.tabIndex==2){
					console.log("加载机构数据");
				}
			},
			//树状态切换方法
			showdepartment() {
				this.isdepartment = !this.isdepartment
				//this.isdepartment = !this.isdepartment;
			},
			showstaffs(index) {
				if(index != this.a){
					this.a = index;
				}else{
					this.a = -1;
				}
				console.log("执行结束----->a"+this.a+"   index--->"+index);
			},
			initloadData(){
				//加载我的好友信息
				this.iGlobal.request({
				    url:'/chat/friend/getFriends', method:'GET',
					data:{
						userid:uni.getStorageSync("user").uuid,
						pageNum:1,
						pageSixe:5
					}
				}).then((res)=>{
					if(res.code==200 && res.data.length>0){
						 var dataList = res.data;
						 
						for (let i = 0; i < dataList.length; i++) {
							var obj = {
								userpic:dataList[i].avatar,
								username:dataList[i].nickName,
								time:"10:10",
								data:dataList[i].remark,
								noreadnum:8,
								uuid:dataList[i].uuid
							}
							this.myfriend.list.push(obj);
						}
					}
				});
				//加载机构数据
				this.iGlobal.request({
				    url:'/system/dept/treeselectAll', method:'GET',
					data:{deptId:100}
				}).then((res)=>{
					console.log(JSON.stringify(res));
				});
			}
		}
	}
</script>

<style lang="scss" scoped="true">
	.body{padding: 0 20upx;}
	.stre-bd {
		padding: 30upx;
		.structure {
			.icon::before {
				content: "";
				display: inline-block;
				width: 0upx;
				height: 0upx;
				border: 12upx solid #7cbaff;
				border-left: 12upx solid transparent;
				border-top: 12upx solid transparent;
				float: left;
				margin-top: 17upx;
				margin-right: 20upx;
				transition: all 0.3s;
			}
			.onicon::before{transform: rotate(-45deg)}
			.companyName {font-size: 32upx;line-height: 60upx;font-weight: 500;color: #4191ea;
				&::before {
					margin-top: 18upx;
				}
			}

			.department {
				margin-left: 10upx;
				// transition: all 1s;
				.department-items {
					font-size: 32upx;
					line-height: 60upx;
					color: #000;

					.sector {line-height: 60upx;}
					.staffs {
						display: none;
						margin-left: 44upx;
						.staff {
							line-height: 60upx;

							.iconfont {
								font-size: 38upx;
								margin-right: 26upx;
							}
						}
					}
					.on {display: block;}
				}

			}

		}
	}
</style>

















