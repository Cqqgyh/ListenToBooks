// 加载配置
import GraceRequestConfig from '@/custom/graceRequestConfig.js';
import md5                from '@/Grace6/js/md5.js';

// 核心工具定义
export default{
	
	// token 数据记录
	token    : '',
	
	// 
	getTokenFromApi : function (count){
		return new Promise((resolve, reject) => {
			this.debug('第 '+count+' 次 token 请求');
			let p = GraceRequestConfig.getToken();
			p.then((res)=>{
				this.token = res;
				resolve(res);
			}).catch((err)=>{
				reject('token error');
			});
		});
	},
	
	// 获取 token
	getToken : function(count){
		return new Promise((resolve, reject) => {
			// 首先尝试从本地获取
			var token = uni.getStorageSync(GraceRequestConfig.localTokenKeyName);
			// 本地不存在 token 数据
			// 执行 token 请求函数获取 token 
			if(!token || token == ''){
				let p = this.getTokenFromApi(1);
				p.then((res)=>{
					this.token = res;
					resolve(res);
				}).catch((err)=>{
					let p2 = this.getTokenFromApi(2);
					p2.then((res)=>{
						this.token = res;
						resolve(res);
					}).catch((err)=>{
						reject(err);
					});
				});
			}
			// 存在 token 数据
			else{
				// 检查 token 有效期
				var expiredTime = GraceRequestConfig.expiredTime;
				expiredTime    *= 1000;
				var tokenTime   = Number(uni.getStorageSync('GraceRequestTokenTime'));
				tokenTime      += expiredTime;
				var dateObj     = new Date();
				var cTime       = dateObj.getTime();
				// 有效期内
				if(tokenTime > cTime){
					this.token = token;
					resolve(token);
				}
				// 获取新的 token
				else{
					let p = this.getTokenFromApi(1);
					p.then((res)=>{
						this.token = res;
						resolve(res);
					}).catch((err)=>{
						let p2 = this.getTokenFromApi(2);
						p2.then((res)=>{
							this.token = res;
							resolve(res);
						}).catch((err)=>{
							reject(err);
						});
					});
				}
			}
		});
	},
	
	// 设置默认值补齐
	requestInit : function(sets, withLoginToken, url){
		if(!sets.data)    {sets.data       = {};}
		if(!sets.header)  {sets.header     = {};}
		if(!sets.timeout) {sets.timeout    = GraceRequestConfig.expiredTime;}
		if(!sets.dataType){sets.dataType   = 'json';}
		if(this.token) sets.header.token = this.token;
		if(withLoginToken){
			var loginToken = this.checkLogin();
			if(loginToken){sets.header.logintoken = loginToken;}
		}
		if(GraceRequestConfig.apiBaseUrl != ''){
			sets.requestUrl = GraceRequestConfig.apiBaseUrl + url;
		}else{
			sets.requestUrl = url;
		}
		return sets;
	},
	
	// 服务端 token 错误处理
	tokenErrorHandle : function (res){
		if(res.data && res.data == 'token error'){
			uni.removeStorageSync(GraceRequestConfig.localTokenKeyName);
			return true;
		}
		return false;
	},
	
	// 请求基础函数
	base : function(url, sets, withLoginToken, type, isSign){
		return new Promise(async (resolve, reject)=>{
			let p  = this.getToken();
			p.then((token)=>{
				if(this.befor != null){
					this.befor();
					this.befor = null;
				}
				sets       = this.requestInit(sets, withLoginToken, url);
				if(type == 'POST'){
					if(!sets.header['content-type']){
						sets.header['content-type'] = GraceRequestConfig.postHeaderDefault;
					}
				}
				if(!isSign){isSign = false;}
				if(isSign){
					sets.data = this.sign(sets.data);
				}
				uni.request({
					url      : sets.requestUrl,
					data     : sets.data,
					timeout  : sets.timeout,
					dataType : sets.dataType,
					header   : sets.header,
					method   : type
				}).then((data) => {
					if(this.after != null){
						this.after();
						this.after = null;
					}
					resolve(data.data);
				}).catch((err)=>{
					if(this.after != null){
						this.after();
						this.after = null;
					}
					reject(err)
				});
			}).catch((err)=>{
				if(this.after != null){
					this.after();
					this.after = null;
				}
				reject(err)
			});
		});
	},
	
	// GET 请求
	get : function(url, sets, withLoginToken){
		return new Promise((resolve, reject)=>{
			if(!sets){sets = {};}
			if(!withLoginToken){withLoginToken = false;}
			let p = this.base(url, sets, withLoginToken, 'GET');
			p.then((res)=>{
				if(this.tokenErrorHandle(res)){
					
					let p2 = this.base(url, sets, withLoginToken, 'GET');
					p2.then((res2)=>{
						resolve(res2);
					}).catch((err)=>{
						reject(err);
					});
				}else{
					resolve(res);
				}
			}).catch((err)=>{
				reject(err);
			});
		});
	},
	
	// POST 请求
	post : function(url, sets, isSign, withLoginToken){
		return new Promise((resolve, reject)=>{
			if(!sets){sets = {};}
			if(!isSign){isSign = false;}
			if(!withLoginToken){withLoginToken = false;}
			let p = this.base(url, sets, withLoginToken, 'POST', isSign);
			p.then((res)=>{
				if(this.tokenErrorHandle(res)){
					let p2 = this.base(url, sets, withLoginToken, 'POST', isSign);
					p2.then((res2)=>{
						resolve(res2);
					}).catch((err)=>{
						reject(err);
					});
				}else{
					resolve(res);
				}
			}).catch((err)=>{
				reject(err);
			});
		});
	},
	
	// upload
	upload : function(url, filePath, fileType, sets, withLoginToken){
		return new Promise(async (resolve, reject)=>{
			let p  = this.getToken();
			p.then((token)=>{
				if(this.befor != null){
					this.befor();
					this.befor = null;
				}
				sets       = this.requestInit(sets, withLoginToken, url);
				if(!sets.name){sets.name = 'file';}
				uni.uploadFile({
					url         : sets.requestUrl, 
					filePath    : filePath,
					name        : sets.name,
					formData    : sets.data,
					header      : sets.header,
				}).then((data) => {
					if(this.after != null){
						this.after();
						this.after = null;
					}
					resolve(data.data);
				}).catch((err)=>{
					if(this.after != null){
						this.after();
						this.after = null;
					}
					reject(err)
				});
			}).catch((err)=>{
				if(this.after != null){
					this.after();
					this.after = null;
				}
				reject(err)
			});
		});
	},
	
	// debug 函数
	debug : function (content) {
		if(!GraceRequestConfig.debug){return ;}
		console.log(content);
	},
	
	// 签名算法
	sign : function (data) {
		if(data.gracesign){
			delete data.gracesign;
		}
		var vals = [];
		Object.keys(data).sort().map((key) => {
			vals.push(data[key]);
		});
		vals.push(this.token);
		var sign  = md5.md5(vals.join('-'));
		data.gracesign = sign;
		return data;
	},
	
	// 登录检查
	// 登录后在本地保存一个 token
	checkLogin : function (notLoginDo){
		var loginToken = uni.getStorageSync(GraceRequestConfig.userTokenKeyName);
		if(!loginToken || loginToken == ''){
			loginToken = '';
			if(notLoginDo){
				uni.showToast({title:"请登录", icon:"none", mask:true});
				setTimeout(()=>{notLoginDo();}, 1500);
			}
			return false;
		}
		return loginToken;
	},
	
	// 跳转到登录页面
	gotoLogin : function (path, opentype) {
		if(!path){path = '../login/login';}
		if(!opentype){opentype = 'redirect';}
		switch(opentype){
			case  'redirect' : 
			uni.redirectTo({url:path});
			break;
			case  'navigate' : 
			uni.navigateTo({url:path});
			break;
			case  'switchTab' : 
			uni.switchTab({url:path});
			break;
		}
	}
	
}
