'use strict';var _exports;function init(){function a(A){if(A.device===void 0)m='iOS'===A.os?f.defaultUa:f.Android_useragent,p=375,q=627,r=2;else{let B=h[A.device];m=B['user-agent'],p=B.screen.vertical.width,q=B.screen.vertical.height-40,r=B.screen['device-pixel-ratio']}m=m.replace('{{version}}',A.version)}const b=require('events').EventEmitter,c=require('../common/jssdk/sdk.js'),d=require('../common/getA8key/getA8key.js'),e=require('../config/errcodeConfig.js'),f=require('../config/config.js'),g=require('../common/log/log.js'),h=require('../config/DeviceModules.js'),i=require('../config/wordingConfig.js');var j={},k={},l=0,m,n='iPhone 6',o='iOS',p=375,q=627,r=2,s='app/html/about.html',t={},u=localStorage['webview-network-type']?localStorage['webview-network-type']:'wifi';let v=JSON.parse(localStorage.getItem('setting'));v?a(v):m=f.defaultUa.replace('{{version}}',f.defaultWechatVersion);const w=Object.assign({},b.prototype,{addWebviewPorts:function(A,B){return t[A]=B,t},delWebviewPorts:function(A){return delete t[A],t},getNetworkType:function(){return u},setNetworkType:function(A){u=A,localStorage['webview-network-type']=u},getWebviewPorts:function(){return t},deleteWebviewID:function(A){this.emit('DELETE_WEBVIEW_ID',A)},changeWebviewID:function(A){l=A,this.emit('CHANGE_WEBVIEW_ID',A)},getSnapShot:function(A){return k[A]},setSnapShot:function(A,B){k[A]=B,this.emit('SET_WEBVIEW_SNAPSHOT',A,B)},getInitURL:function(){return s},setInitURL:function(A){s=A},getUA:function(){return m},setUA:function(A){a(A),this.emit('SET_WEBVIEW_UA',m)},setInfo:function(A){o=A.os,n=A.device,q=A.height,p=A.width,r=A.dpr,this.emit('SET_WEBVIEW_INFO',A)},getInfo:function(){return{model:n,dpr:r,width:p,height:q,os:o}},getOffset:function(){return{height:q,width:p,dpr:r}},getCurrentWebviewID:function(){return l},setCurrentWebviewID:function(A){l=A},showShare:function(A,B){this.emit(`SHOW_SHARE_WEBVIEW_${A}`,A,B)},stopPullDownRefresh:function(){this.emit(`STOP_PULL_DOWN_REFRESH`)},upStatus:function(A,B){j[A]||(j[A]={}),this.emit(`UP_WEBVIEW_STATUS_${A}`,A,B),this.emit('UP_WEBVIEW_STATUS',A,B)},setAction:function(A,B){j[A]||(j[A]={}),this.emit(`SET_WEBVIEW_ACTION_${A}`,A,B)},execJSSDK:function(A,B){j[A]||(j[A]={}),c.exec(B,j[A],(C,D,E)=>{let F=B.sdkName,G=E.type;if('CARD_SDK'===G&&C){let H=E.error;if(H){if(H.errcode===e.NOT_LIMITS_CARD)return g.info(`webviewStores.js getA8key NOT_LIMITS_CARD`),void this.emit('NOT_LIMITS_CARD');if(0!==H.errcode){g.info(`webviewStores.js getA8key ${H.errcode}`);let I=require('../common/jssdk/sdkNameTrans.js');return D={errMsg:`${I.getSdkDisplayName(F)}:fail`},void this.emit(`GET_JSSDK_RES_${A}`,A,F,D,B.ext)}}else this.emit(`CRAD_SDK_RES`,A,F,D,C,B);return}'PREVERIFY_SDK'===G?(j[A].purviewFromPreVerify=E.purviewFromPreVerify||{},B.sdkResExt=E,this.emit(`GET_JSSDK_RES_${A}`,A,F,D,B)):'SHARE_SDK'===G?this.emit(`SHOW_SHARE_WEBVIEW_${A}`,A,B,D):'REGISTER_SDK'===G||('INTERFACE_ASYNC_SDK'===G?this.emit(`SET_INTERFACE_ASYNC_RES`,A,F,C,B):'INTERFACE_SDK'===G?(this.emit(`SET_INTERFACE_RES_${A}`,A,F,C,B),this.emit(`GET_JSSDK_RES_${A}`,A,F,D,B.ext)):this.emit(`GET_JSSDK_RES_${A}`,A,F,D,B.ext))})},sendJSSDKRes:function(A,B,C,D){this.emit(`GET_JSSDK_RES_${A}`,A,B,C,D)},getA8key:function(A,B){j[A]={};let C=B.isSync;g.info(`webviewStores.js getA8key begin: ${A} ${JSON.stringify(B)}`),d.get(B,D=>{g.info(`webviewStores.js getA8key end: ${JSON.stringify(D)}`);let E=D.baseresponse,F=parseInt(E.errcode);if(F===e.NOT_LOGIN)return g.info(`webviewStores.js getA8key NOT_LOGIN`),void this.emit('NOT_LOGIN');if(F===e.NOT_LIMITS)return g.info(`webviewStores.js getA8key NOT_LIMITS`),void this.emit('NOT_LIMITS');if(F===e.NOT_LIMITS_QY)return g.info(`webviewStores.js getA8key NOT_LIMITS_QY`),void this.emit('NOT_LIMITS_QY');if(F===e.INVALID_LOGIN||F===e.INVALID_TOKEN)return g.info(`webviewStores.js getA8key INVALID_LOGIN`),void this.emit('INVALID_LOGIN');j[A].purviewFormGetA8key=D.purviewFormGetA8key;let G=D.resp_url;if(C||F===e.ILLEGAL_URL)return void setTimeout(()=>{this.emit(`SET_WEBVIEW_ACTION_${A}`,A,{act:'load',url:G,from:B.from})});if(0!==F){g.info(`webviewStores.js getA8key ${F}`);let I=require('../actions/windowActions.js');return void I.showTipsMsg({msg:`${i[0]} ${F}`,type:'error'})}let H=/\#wechat_redirect$/.test(B.url);H&&B.url.replace(/\#wechat_redirect$/,'')===G&&(G=G.replace(/\#wechat_redirect/,''),g.info(`webviewStores.js getA8key GETA_8KEY_NOT_SUPPORT ${G}`),windowActions.showTipsMsg({msg:`${i[1]}`,type:'error'}))})},getWebviewByID:function(A){return j[A]},clearData:function(A){this.emit('CLEAR_WEBVIEW_DATA',A)},setInterfaceFromPageFrame:function(A,B){this.emit(`SET_INTERFACT_FROMPAGEFRAME_${A}`,B)},cleanWebview:function(A){this.emit(`CLEAN_WEBVIEW_${A}`),this.emit(`CLEAN_WEBVIEW`,A)},asTojs:function(A){this.emit('AS_TO_JS',A)},upASData:function(A,B){this.emit('UP_AS_DATA',A,B)},asPublish:function(A){this.emit('AS_PUBLISH',A)},postMessageToAS:function(A){this.emit('POST_MSG_TOAS',A)},sendASSdk:function(A,B,C){this.emit('SEND_AS_SDK',A,B,C)},touchSetSuc:function(A){this.emit(`TOUCH_SET_SUC_${A}`)},togglerRecordWording:function(A){this.emit(`TOGGLE_RECORD_WORDING`,A)}});var x=w.on,y={};w.on=function(){let A=arguments,B=A[0];y[B]||(y[B]=0),y[B]++,10<=y[B]&&g.error(`webviewStores.js on ${B} - times: ${y[B]}`),x.apply(this,arguments)};var z=w.removeListener;w.removeListener=function(){let A=arguments,B=A[0];y[B]&&y[B]--,10<=y[B]&&g.error(`webviewStores.js on ${B} - times: ${y[B]}`),z.apply(this,arguments)},_exports=w}init(),module.exports=_exports;