<template>
    <view class="content">
		<view>
			要发送的消息
			<input style="width:80%;height: 40upx;border:solid 1upx #09BB07;" v-model="sendMsg" />
		</view>
		<view>
			接收的消息
			<input style="width:80%;height: 40upx;border:solid 1upx #3B4144;" v-model="receiveMsg" />
		</view>
		<view>
			发送按钮
			<button style="width:50%;height:50upx;font-size:30upx;line-height: 50upx; background-color: #007AFF;" @tap="sendMsgEvent">点击发送</button>
		</view>
    </view>
</template>
<script>
	import messagebody from '../../protobuf/proto/js/build/messagebody.js'
	import message from '../../protobuf/proto/js/build/message.js'
	export default {
		data() {
			return {
				sendMsg:"",			//测试发送的信息
				receiveMsg:"",		//测试收到的信息
				toUserToken:"",		//测试接收消息人
				socketTask: null,			// websocket对象
				_isOpen: false,				// socket打开状态
				_netWork : true,			// 当前网络状态
				_isClosed : false,			// 是否人为退出
				_timeout : 4000,			// 心跳检测频率	
				_timeoutObj : null,			// 心跳定时器
				_connectNum : 0,		 	// 当前重连次数
				_heartCheck : true,			// 心跳检测重连开关，true为启用，false为关闭
				_isReconnection : true,		// 断线重连开关，true为启用，false为关闭
				loginMsg : "",				// 用户登录连接信息
				heartMsg : "",				// 心跳信息
				sys_model:"",     	//手机型号
				sys_language:"",   	//应用设置的语言
				sys_system:"",    	//操作系统版本
				sys_platform:"",	//客户端平台，值域为：ios、android
				sys_version:"",		//引擎版本号
				currentToken:""
			}
		},
		onLoad() {
			var _this = this;
			//_this.currentToken = this.utils.getUUID();
			_this.currentToken = uni.getStorageSync('token');
			console.log("从缓存中获取的用户token为："+_this.currentToken);
			uni.getSystemInfo({
				success(res) {
					_this.sys_model = res.model;  
					_this.sys_language = res.language; 
					_this.sys_system = res.system; 
					_this.sys_platform = res.platform; 
					_this.sys_version = res.version;
				}
			});
			_this.loginMsg = _this.getLoginMsg();
			_this.heartMsg = _this.getHeartMsg();
			_this.initWebSocket();	// 进入页面创建websocket连接
		},
		methods: {
			initWebSocket() {
				let _this = this;
				_this.socketTask = uni.connectSocket({
					url: "ws://192.168.1.2:2048/ws",
					success(data) {console.log("------------->websocket连接成功");}
				});
 
				//只有连接正常打开中 ，才能发送接收消息
				_this.socketTask.onOpen((res) => {
					console.log("------------->WebSocket连接正常打开中...！");
					_this._isOpen = true;
					_this._connectNum = 0;
					// 1.发送登录信息 2.发送心跳信息 3.打开网络开关
					_this.socketTask.send({
						data: _this.loginMsg,
						async success() {
							console.log("------socket------->发送登录信息成功");
						}
					});
					if (_this._heartCheck) {
						_this._reset()._start();
					}
					_this._netWork = true;
					
					_this.socketTask.onMessage((res) => {
						var msg =  proto.Model.deserializeBinary(new Uint8Array(res.data));      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
						var msgCon =  proto.MessageBody.deserializeBinary(msg.getContent());  
						var cmd = msg.getCmd();
						var sender = msg.getSender();
						var time = msg.getTimestamp();
						console.log("------socket--->收到服务器内容：cmd："+cmd+"time："+time+"sender："+sender);
						if(cmd==3){	//上线
							if(sender == _this.currentToken){
								console.log("本人"+sender+"上线了");
							}else{
								this.toUserToken = sender;
								uni.showToast({
								    title: sender+"上线了",duration: 2000
								});
								console.log("用户"+sender+"上线了");
							} 
						}
						if(cmd==4){	//下线
							if(sender == _this.currentToken){
								console.log("本人"+sender+"下线了");
							}else{
								console.log("用户"+sender+"下线了");
							} 
						}
					});
				})
				//socket关闭事件监听
				_this.socketTask.onClose((res) => {
					console.log('------------->当前websocket连接已关闭');
					if (_this._heartCheck) {_this._reset();}	// 停止心跳连接
					_this._isOpen = true;				// 关闭已登录开关
					// 检测是否是用户自己退出socket，如果不是进行重连
					if (!_this._isClosed) {
					    if (_this._isReconnection) {_this._reConnect()}
					}
				})
				//socket异常事件监听
				_this.socketTask.onError((err) => {
					console.log('------socket------->当前websocket连接出现异常,错误信息为:' + JSON.stringify(err));
					if (_this._heartCheck) {_this._reset();}	// 停止心跳连接
					_this._isOpen = true;				// 关闭已登录开关
					// 检测是否是用户自己退出socket，如果不是进行重连
					if (!_this._isClosed) {
					    if (_this._isReconnection) {_this._reConnect()}
					}
				})
				// 检测网络变化
				uni.onNetworkStatusChange(res => {
				    console.log('------socket------->当前网络状态:' + res.isConnected);
				    if (!_this._netWork) {
				        _this._isOpen = false;
				        // 进行重连
				        if (this._isReconnection) {this._reConnect()}
				    }
				})
			},
			// 心跳重置
			_reset() {
			    clearTimeout(this._timeoutObj);
			},
			// 心跳开始(定时发送心跳消息)
			_start() {
			    let _this = this;
			    _this._timeoutObj = setInterval(() => {
			        _this.sendBinary(1,_this.heartMsg);	
			    }, _this._timeout);
			},
			//发送二进制消息
			sendBinary(msgType, byteMsg) {
				let _this = this;	
				var consoleInfo = "";
				if (_this._isOpen) {
					if(msgType==1){consoleInfo="心跳消息";}
					if(msgType==2){consoleInfo="登录消息";}
					if(msgType==3){consoleInfo="普通消息";}
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					_this.socketTask.send({
						data: byteMsg,
						async success() {
							console.log(consoleInfo+"发送成功");
						},
					});
				}
			},
			// 重连方法，会根据时间频率越来越慢
			_reConnect() {
			    let timer, _this = this;
			    if (_this._connectNum < 20) {
			        timer = setTimeout(() => {
			            _this.initWebSocket();
			        }, 3000)
			        _this._connectNum += 1;
			    } 
			},
			// 关闭websocket连接
			closeWebSocket() {
				let _this = this;
				_this.socketTask.close({
					success(res) {
						console.log("关闭成功", res)
						_this._isClosed = true;
						_this._isOpen = false;
					}
				});
			},
			getLoginMsg(){
				var message = new proto.Model();
				message.setCmd(1);								//1绑定，2心跳，3上线，4下线，5消息，6重连
				message.setFlag(1);								//1 rsa加密 2aes加密
				message.setSender(this.currentToken);			//发送人
				message.setToken("dyz1234567890");				//客户端凭证	
				var bytes = message.serializeBinary();  
				console.log("发送的sender："+this.currentToken);
				return bytes;
			},
			getHeartMsg(){
				var message = new proto.Model();
				message.setCmd(2);
				var bytes = message.serializeBinary();
				return bytes;
			},
			sendMsgEvent() {
				let _this = this;
				if (_this._isOpen) {
					var message = new proto.Model();
					var content = new proto.MessageBody();
					message.setCmd(5);								//1绑定，2心跳，3上线，4下线，5消息
					message.setFlag(1);								//1 rsa加密 2aes加密
					message.setToken(this.currentToken);  			//token
					message.setSender(this.currentToken);			//发送人
					message.setReceiver("zhaonazhaona1122334455");	//接收人
					content.setTitle("发送消息测试："+this.sendMsg);	//标题
					content.setTime(this.utils.now());				//时间戳
					content.setType(0);								//消息类型：0 文字   1 文件
					content.setContent(this.sendMsg);
					message.setContent(content.serializeBinary());
					var messagebytes = message.serializeBinary();  
					_this.sendBinary(3, _this.getSeandMsg())
				}
			}
		}
	}
	
	/* 
	//转化方法
	socketEventDataToStr(event) {
	    let dv = new DataView(event.data);
	    let commendType = dv.getUint32(0, true);
	    let slice = event.data.slice(4, event.data.length);
	    let unit8Arr = new Uint8Array(slice);
	    let s = new TextDecoder("utf-8").decode(unit8Arr);
	    console.log("【websocket】标志位:" + commendType);
	    console.log("【websocket】返回信息:" + s);
	    return s;
	} 
	*/
</script>
<style>
    .swiper { width: 100%;/* height: 100vw;  background: red; */}
	.swiper-item image{width: 100%;height: 100%;}
	.closeTime{position:absolute;z-index: 999;width:100%;display: flex;justify-content: flex-end;top:35upx;}
	.closeTime>view{padding:0 20upx; margin-right:15upx;border-radius: 10px;background-color:rgba(250,225,255,0.8);}
</style>
