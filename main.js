import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//挂载全局方法
import config from './common/config/config.js'
Vue.prototype.config=config;

//挂载全局方法
import iGlobal from './common/utils/global.js'
Vue.prototype.iGlobal=iGlobal;

//挂载全局方法
import validate from './common/utils/ys-validate.js'
Vue.prototype.$validate = validate;

//挂载全局方法
import lib from "./common/utils/lib.js"
Vue.prototype.lib = lib;


import utils from "./common/utils/utils.js"
Vue.prototype.utils = utils;

App.mpType = 'app'

//挂载全局方法（导入我们自己定义的js第二步）	
const app = new Vue({
    ...App,
	config,
	iGlobal,
	validate,
	lib,
	utils
})
app.$mount()
