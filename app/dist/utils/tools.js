'use strict';var _exports;function init(){const a=require('url'),b=require('os'),c=require('path'),d=require('fs'),f=require('net'),g=require('../common/log/log.js'),h=require('async'),j=require('child_process').exec;require('rmdir');const k=require('../config/dirConfig.js');nw.App;var l={},m=!1,n=9973;const o='darwin'===process.platform;_exports={parseURL:function(p){let q=/^http(s)?:\/\//;return q.test(p)?p:'http://'+p},getAvailablePort:function(p,q){function r(t){let u=n,v=f.createServer();v.listen(u,w=>{v.once('close',()=>{n=u+1,t(null,u)}),v.close()}),v.on('error',w=>{g.info(`tools.js getAvailablePort error ${u}`),n++,r(t)})}let s=[];for(let t=0;t<q;t++)s.push(r);h.series(s,(t,u)=>{g.info(`tools.js getAvailablePort success ${JSON.stringify(u)}`),p(u)})},getAppConfig:function(){let p=nw.App.getDataPath(),q=c.join(p,'..','config.json'),r={isDev:!!process.execPath.match('nw.exe')||!!process.execPath.match('nwjs.app'),isBeta:!0===nw.App.manifest.beta},s=d.existsSync(q);if(!s)return r;try{r=JSON.parse(d.readFileSync(q))}catch(t){}return g.info(`tools.js getAppConfig: ${JSON.stringify(r)}`),r.isDev=r.isDev||!!process.execPath.match('nw.exe')||!!process.execPath.match('nwjs.app'),r.onLine=!1,r},getArgsURL:function(p){let q=Array.isArray(p);q||(p=p.split(' '));let r=p.find(s=>{return 0===s.indexOf('href://')});if(r){let s=r.replace('href://','');return this.parseURL(s)}},getSysIpInfo:function(){let p=b.networkInterfaces(),q=[];return Object.keys(p).forEach(r=>{p[r].forEach(function(s){'IPv4'!==s.family||!1!==s.internal||q.push(s.address)})}),g.info(`index.js getSysIpInfo: ${JSON.stringify(q)}`),q},openInspectWin:function(p){const q=require('path');nw.Window.open('about:blank',{show:!1,width:799,height:799,inject_js_end:q.join(__dirname,'../inject/chromeInspect.js')},r=>{r.maximize(),r.window.location='chrome://inspect/#devices',r.show(),g.info(`index.js openInspectWin`)})},clearProxyCache:function(){l={}},getProxyForURL:function(p){let q=a.parse(p);return p=`${q.protocol}\/\/${q.hostname}`,l[p]?g.info(`tools.js getProxyForURL ${p} from proxyCache: ${l[p]}`):(l[p]=nw.App.getProxyForURL(p),g.info(`tools.js getProxyForURL ${p} from nw.App.getProxyForURL: ${l[p]}`)),l[p]},getVersionNum:function(p){return p=p||nw.App.manifest.version,p=p.replace(/\./g,''),parseInt(p)},hasNewVersion:function(p){let q=p.clientConfig.last_version,r=nw.App.manifest.version;if(r===q||!q)return{};r=r.split('.');let s=q.split('.');for(let t=0,u=s.length;t<u;t++){if(parseInt(s[t])>parseInt(r[t])){let v=p.urlConfig.webdebugger_download+'?from=tools&cv='+this.getVersionNum();return v+='darwin'===process.platform?'&os=darwin':'x64'===process.arch?'&os=x64':'&os=x86',{last_version:q,downloadURL:v}}if(parseInt(s[t])<parseInt(r[t]))return{}}},notifications:function(p,q,r,s){let t=(+new Date).toString();return s=s||function(){},r=r||[],m||(m={},chrome.notifications.onButtonClicked.addListener((u,v)=>{m[u]&&m[u](v)})),m[t]=s,chrome.notifications.create(t,{type:'basic',iconUrl:'app/images/logo.png',title:p,message:q,buttons:r}),t},up:function(p){let q=global.appVersion=nw.App.manifest.version;if(global.appConfig.isDev)return void p();let r=localStorage.getItem('new-version'),s=this.getVersionNum(r),t=this.getVersionNum();if(t<s){function u(y,z,A){y?(x.innerHTML='<div class="app-up-data">\u66F4\u65B0\u5931\u8D25</div>',setTimeout(()=>{p()},3000)):(x.innerHTML='',global.appVersion=r,x.innerHTML=`<div class="app-up-data">更新成功，当前版本 ${r}</div>`,global.contentWindow.title=`微信web开发者工具 v${r}`,global.Win.title=`微信web开发者工具 v${r}`,setTimeout(()=>{p(),nw.Shell.openExternal('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html')},1000),delete localStorage['new-version']),delete localStorage['new-version']}g.info(`tools.js currentVersion: ${q} newVersion: ${r} `);let v=k.WeappApplication,w=o?c.join(v,r,'app.nw'):c.join(v,r,'package.nw'),x=global.contentDocument.querySelector('#container');if(x.innerHTML='<div class="app-up-data">\u66F4\u65B0\u4E2D...</div>',!o){const y=require('node-windows');let z=`xcopy "${w}" "${c.join(process.execPath,'..','package.nw')}" /s /e /y /i`;y.elevate(z,u)}else{let y=c.join(__dirname,'../../../../');j(`cp -r "${w}" "${y}"`,u)}}else p()}}}init(),module.exports=_exports;