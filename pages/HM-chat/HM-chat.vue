<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" 
						:scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" 
						:scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 
					<block v-if="row.type=='system'" >
						<view class="system">
							文字消息
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
							领取红包消息
							<view v-if="row.msg.type=='redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					-->
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- !!!!!!!!!!!!!!!!!自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==myuid">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
								<!-- 红包 -->
								<view v-if="row.msg.type=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis"><!-- 点击开红包 --></view>
									<view class="blessing">
										{{row.msg.content.blessing}}
									</view>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right"><image :src="row.msg.userinfo.face"></image></view>
						</view>
						<!-- !!!!!!!!!!!!!!!!!别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=myuid">
							<!-- 左-头像 -->
							<view class="left"><image :src="row.msg.userinfo.face"></image></view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.username}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
								<!-- 红包 -->
								<view v-if="row.msg.type=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis"><!-- 点击开红包 --></view>
									<view class="blessing">
										{{row.msg.content.blessing}}
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏： @touchmove.stop.prevent="discard"：禁止蒙版下的页面滚动，discard可以是一个空函数 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<emotion @addEmoji="addEmoji" :class="{hidden:hideEmoji}" ></emotion>
			<!-- 更多功能 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<!--相册-拍照-红包-名片 -->
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<view class="box" @tap="handRedEnvelopes"><view class="icon hongbao"></view></view>
					<view class="box" @tap="userinfo">
						<image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/userinfo.png"></image>
					</view> 
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendMsgEvent">
				<view class="btn">发送</view>
			</view>
		</view>
		
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	import emotion from '@/components/emotion/index.vue'
	import emojiData from "../../static/emoji/emojiData.js"
	export default {
		components: {
			emotion
		},
		data() {
			return {
				friendObj:{},
				userObj:{},
				sendMsg:"",
				receiveMsg:"",
				socketTask: null,			// websocket对象
				isOpen: false,				// socket打开状态
				netWork : true,				// 当前网络状态
				isClosed : false,			// 是否人为退出
				timeout : 4000,				// 心跳检测频率	
				timeoutObj: null,			// 心跳定时器
				connectNum : 0,		 		// 当前重连次数
				heartCheck : true,			// 心跳检测重连开关，true为启用，false为关闭
				isReconnection : true,		// 断线重连开关，true为启用，false为关闭
				loginMsg : "",				// 用户登录连接信息
				heartMsg : "",				// 心跳信息
				
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:uni.getStorageSync("user").uuid,
				
				//录音相关参数（H5不能录音）
				// #ifndef H5
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[{}],
				emojiPath:'',
				//红包相关参数
				windowsState:'',
				redenvelopeData:{
					rid:null,	//红包ID
					face:null,
					blessing:null,
					money:null
				}
			};
		},
		onLoad(option) {
			var _this = this;
			
			console.log("获取上个页面传递过来的参数："+_this.friendObj.uuid);
			_this.getMsgList();
			//语音自然播放结束
			_this.AUDIO.onEnded((res)=>{_this.playMsgid=null;});
			// #ifndef H5
			//录音开始事件//录音结束事件
			_this.RECORDER.onStart((e)=>{_this.recordBegin(e);})
			_this.RECORDER.onStop((e)=>{_this.recordEnd(e);})
			// #endif
			
			_this.emojiList =emojiData.imgArr[1].emojiList
			
			_this.friendObj = JSON.parse(decodeURIComponent(option.friendObj));		//聊天对象	
			_this.userObj = uni.getStorageSync("user");								//当前用户					
			_this.loginMsg = _this.getLoginMsg();
			_this.heartMsg = _this.getHeartMsg();
			_this.initWebSocket();	// 进入页面创建websocket连接
		},
		
		onShow(){
			this.scrollTop = 9999999;
			//模板借由本地缓存实现发红包效果，实际应用中请不要使用此方法。
			uni.getStorage({
				key: 'redEnvelopeData',
				success:  (res)=>{
					let nowDate = new Date();
					let lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					let row = {type:"user",msg:{id:lastid,type:"redEnvelope",time:nowDate.getHours()+":"+nowDate.getMinutes(),userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{blessing:res.data.blessing,rid:Math.floor(Math.random()*1000+1),isReceived:false}}};
					//this.screenMsg(row);
					uni.removeStorage({key: 'redEnvelopeData'});
				}
			});
		},
		methods:{
			initWebSocket() {
				let _this = this;
				_this.socketTask = uni.connectSocket({
					url: this.config.socketUrl,
					success(data) {console.log("------socket------->websocket连接成功");}
				});
			 
				//只有连接正常打开中 ，才能发送接收消息
				_this.socketTask.onOpen((res) => {
					console.log("------socket------->WebSocket连接正常打开中");
					_this.isOpen = true;
					_this.connectNum = 0;
					// 1.发送登录信息 2.发送心跳信息 3.打开网络开关
					_this.socketTask.send({
						data: _this.loginMsg, async success() {
							console.log("------socket------->发送登录信息成功");
						}
					});
					if (_this.heartCheck) { _this._reset()._start();}
					_this.netWork = true;
					
					_this.socketTask.onMessage((res) => {
						var msg =  proto.Model.deserializeBinary(new Uint8Array(res.data));      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
						var msgCon =  proto.MessageBody.deserializeBinary(msg.getContent());  
						var cmd = msg.getCmd();
						var sender = msg.getSender();
						var time = msg.getTimestamp();
						console.log("------socket------->>收到服务器内容：cmd："+cmd+"time："+time+"sender："+sender);
					});
				});
				//socket关闭事件监听
				_this.socketTask.onClose((res) => {
					console.log('------socket------->当前websocket连接已关闭');
					if (_this.heartCheck) {_this._reset();}		// 停止心跳连接
					_this.isOpen = true;						// 关闭已登录开关
					// 检测是否是用户自己退出socket，如果不是进行重连
					if (!_this.isClosed) {
					    if (_this.isReconnection) {_this._reConnect()}
					}
				});
				//socket异常事件监听
				_this.socketTask.onError((err) => {
					console.log('------socket------->当前websocket连接出现异常,错误信息为:' + JSON.stringify(err));
					if (_this.heartCheck) {_this._reset();}	// 停止心跳连接
					_this.isOpen = true;				// 关闭已登录开关
					// 检测是否是用户自己退出socket，如果不是进行重连
					if (!_this.isClosed) {
					    if (_this.isReconnection) {_this._reConnect()}
					}
				});
				// 检测网络变化
				uni.onNetworkStatusChange(res => {
				    console.log('------socket------->当前网络状态:' + res.isConnected);
				    if (!_this.netWork) {
				        _this.isOpen = false;
				        if (this.isReconnection) {this._reConnect()}	 // 进行重连
				    }
				});
			},
			// 心跳重置
			_reset() { clearTimeout(this.timeoutObj);},
			// 心跳开始(定时发送心跳消息)
			_start() { this.timeoutObj = setInterval(() => { this.sendBinary(1,this.heartMsg); }, this.timeout);},
			
			//发送二进制消息
			sendBinary(msgType, byteMsg) {
				let _this = this;	
				var consoleInfo = "";
				if (_this.isOpen) {
					if(msgType==1){consoleInfo="心跳消息";}
					if(msgType==2){consoleInfo="登录消息";}
					if(msgType==3){consoleInfo="普通消息";}
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					_this.socketTask.send({
						data: byteMsg, async success() {
							console.log(consoleInfo+"发送成功");
						},
					});
				}
			},
			// 重连方法，会根据时间频率越来越慢
			_reConnect() {
			    let timer, _this = this;
			    if (_this.connectNum < 20) {
			        timer = setTimeout(() => { _this.initWebSocket();}, 3000)
			        _this.connectNum += 1;
			    } 
			},
			// 关闭websocket连接
			closeWebSocket() {
				let _this = this;
				_this.socketTask.close({
					success(res) {
						console.log("关闭成功", res)
						_this.isClosed = true;
						_this.isOpen = false;
					}
				});
			},
			getLoginMsg(){
				var message = new proto.Model();
				message.setCmd(1);								//1绑定，2心跳，3上线，4下线，5消息，6重连
				message.setFlag(1);								//1 rsa加密 2aes加密
				message.setSender(this.userObj.uuid);			//发送人
				var bytes = message.serializeBinary();  
				return bytes;
			},
			getHeartMsg(){
				var message = new proto.Model();
				message.setCmd(2);
				var bytes = message.serializeBinary();
				return bytes;
			},
			sendMsgEvent(){
				/* 
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){return;}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框 
				*/
				let _this = this;
				if (_this.isOpen) {
					var message = new proto.Model();
					var content = new proto.MessageBody();
					message.setCmd(5);								//1绑定，2心跳，3上线，4下线，5消息
					message.setFlag(1);								//1 rsa加密 2aes加密
					message.setSender(_this.userObj.uuid);			//发送人
					message.setReceiver(_this.friendObj.uuid);		//接收人
					content.setTitle("发送消息测试：这是发送的标题");	//标题
					content.setTime(_this.utils.now());				//时间戳
					content.setType(0);								//消息类型：0文字   1文件
					content.setContent(_this.sendMsg);
					message.setContent(content.serializeBinary());
					var messagebytes = message.serializeBinary();  
					_this.sendBinary(3, _this.getSeandMsg());
				}
			},
			/*
			// 接收消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
					}
					//非自己的消息震动
					if(msg.msg.userinfo.uid!=this.myuid){
						uni.vibrateLong();	// console.log('振动');
					}
				}
				this.$nextTick(function() {
					this.scrollToView = 'msg'+msg.msg.id	// 滚动到底
				});
			},
			*/
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				//本地模拟请求历史记录效果
				setTimeout(()=>{
					// 消息列表
					let list = [
						{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
						{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
						{type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
						{type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
					]
					// 获取消息中的图片,并处理显示尺寸
					for(let i=0;i<list.length;i++){
						if(list[i].type=='user'&&list[i].msg.type=="img"){
							list[i].msg.content = this.setPicSize(list[i].msg.content);
							this.msgImgList.unshift(list[i].msg.content.url);
						}
						list[i].msg.id = Math.floor(Math.random()*1000+1);
						this.msgList.unshift(list[i]);
					}
					
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true;//恢复滚动动画
						});
					});
					this.isHistoryLoading = false;
					
				},1000)
			},
			// 加载初始页面消息
			getMsgList(){
				
				// 消息列表
				let list = [
					/*
					string title = 1; 	//标题
					string content = 2;	//内容
					string time = 3;	//发送时间
					uint32 type = 4;	//0 文字   1 文件
					string extend = 5;	//扩展字段
					*/
					
					{type:"user",msg:{id:5,type:"img",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{url:"/static/img/p10.jpg",w:200,h:200}}},
					{type:"user",msg:{id:6,type:"img",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/img/q.jpg",w:1920,h:1080}}},
					{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
					{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后",face:"/static/img/im/face/face_2.jpg"},content:{text:"两个温度相差十几二十度是很正常的。"}}},
					{type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
					{type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
					{type:"system",msg:{id:7,type:"text",content:{text:"欢迎进入聊天室"}}},
					
				]
				//加载历史消息数据
				this.iGlobal.request({
				    url:'/chat/message/list', method:'GET',
					data:{
						pageNum:1,
						pageSize:5,
						senduser:uni.getStorageSync("user").uuid,
						receiveuser:this.friendObj.uuid
					}
				}).then((res)=>{
					console.log(JSON.stringify(res));
				});
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user'&&list[i].msg.type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部，$nextTick：在修改数据之后立即使用这个方法，获取更新后的 DOM
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
					
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){this.getImage('album');},
			//拍照发送
			camera(){this.getImage('camera');},
			//发红包
			handRedEnvelopes(){
				uni.navigateTo({url:'HM-hand/HM-hand'});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type){
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									// console.log(image.width);
									// console.log(image.height);
									let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
									this.sendMsg(msg,'img');
								}
							});
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				//判断删除按钮
				if(em.emojiItem.alt==='[删除]'){
				 //  uni.showToast({ title:"触发删除操作",icon:"none" })
				  var str;
				  var msglen = this.textMsg.length - 1;
				  let start = this.textMsg.lastIndexOf("[");
				  let end = this.textMsg.lastIndexOf("]");
				  let len = end - start;
				  if(end != -1 && end === msglen && len >= 2 && len <= 4){
						str = this.textMsg.slice(0, start);	 	// 表情字符
					}else{
						str = this.textMsg.slice(0, msglen);	// 普通键盘输入汉字 或者字符
					}
					this.textMsg = str
					return;
				}
				// console.log(em)
				this.emojiList =emojiData.imgArr[em.groupIndex].emojiList
				this.emojiPath =emojiData.imgArr[em.groupIndex].emojiPath
				if(em.minEmoji===false){
					this.sendBigEmoji(em.emojiItem.url);
				}else{
					this.textMsg+=em.emojiItem.alt;		// this.textMsg+=em.alt;
				}
			},
			// 发送大表情
			sendBigEmoji(url){
				this.hideDrawer();//隐藏抽屉
				if(!url){ return; }
				let imgstr = '<img style="width:48px;height:48px;" src="'+ this.emojiPath + url +'">';
				let content = '<div style="align-items: center;word-wrap:break-word;">' + imgstr + '</div>';    
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			/* // 发送文字消息
			sendText(){
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){return;}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			}, */
			//替换表情符号为图片
			replaceEmoji(str){
				// 正则表达式匹配内容
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					// console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								// let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								// let imgstr = '<image src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								let onlinePath=this.emojiPath
								let imgstr = '<img style="width:24px;height:24px;" src="'+onlinePath+EM.url+'">';
								return imgstr;
							}
						}
					}
				});
				return '<div style="align-items: center;word-wrap:break-word;">'+replacedStr+'</div>';
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				/* let msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:content}}
				// 发送消息  
				//this.screenMsg(msg);
				// 定时器模拟对方回复,三秒
				setTimeout(()=>{
					lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:content}}
					// 本地模拟发送消息
					//this.screenMsg(msg);
				},3000) */
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){this.msgList.push(msg);},
			// 添加语音消息到列表
			addVoiceMsg(msg){this.msgList.push(msg);},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg){this.msgList.push(msg);},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){this.msgList.push(msg);},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){this.msgList.push(msg);},
			// 打开红包
			openRedEnvelope(msg,index){
				let rid = msg.content.rid;
				uni.showLoading({title:'加载中...'});
				// console.log("index: " + index);
				//模拟请求服务器效果
				setTimeout(()=>{
					//加载数据
					if(rid==0){
						this.redenvelopeData={
							rid:0,	//红包ID
							from:"大黑哥",
							face:"/static/img/im/face/face.jpg",
							blessing:"恭喜发财，大吉大利",
							money:"已领完"
						}
					}else{
						this.redenvelopeData={
							rid:1,	//红包ID
							from:"售后客服008",
							face:"/static/img/im/face/face_2.jpg",
							blessing:"恭喜发财",
							money:"0.01"
						}
						if(!msg.content.isReceived){
							// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
							this.sendSystemMsg({text:"你领取了"+(msg.userinfo.uid==this.myuid?"自己":msg.userinfo.username)+"的红包"},'redEnvelope');
							// console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
							this.msgList[index].msg.content.isReceived = true;
						}
					}
					uni.hideLoading();
					this.windowsState = 'show';
					
				},200)
				
			},
			// 关闭红包弹窗
			closeRedEnvelope(){
				this.windowsState = 'hide';
				setTimeout(()=>{
					this.windowsState = '';
				},200)
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				//this.screenMsg(row)
			},
			//领取详情
			toDetails(rid){
				uni.navigateTo({url:'HM-details/HM-details?rid='+rid})
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){return ;}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;	//不发送录音
				this.RECORDER.stop();	//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){return;}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){return;}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					// console.log("e: " + JSON.stringify(e));
					let msg = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg.length = min+':'+sec;
					this.sendMsg(msg,'voice');
				}else{
					// console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss"; 
</style>