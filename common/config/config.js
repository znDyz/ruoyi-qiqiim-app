/* 统一资源标识符，设置项目全局请求域名 */

//Api请求前缀
const requestUrl='http://192.168.6.1:8080'

//socket请求前缀
const socketUrl='ws://192.168.6.1:2048/ws'

//文件上传服务器路径
const uploadServer='https://upload.xxx.com'
	
//图片服务路径
const imageServer='https://images.xxx.com'


export default{
	requestUrl,
	uploadServer,
	imageServer,
	socketUrl
}