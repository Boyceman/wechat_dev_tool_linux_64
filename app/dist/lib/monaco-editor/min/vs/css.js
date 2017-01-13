/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.6.0(a43fe71b7f6e022d0d1bb2d0ef8fd4e31aa3f431)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
"use strict";var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},_cssPluginGlobal=this,CSSLoaderPlugin;!function(t){var e=_cssPluginGlobal,n=function(){function t(){this._pendingLoads=0}return t.prototype.attachListeners=function(t,e,n,r){var s=function(){e.removeEventListener("load",o),e.removeEventListener("error",i)},o=function(t){s(),n()},i=function(t){s(),r(t)};e.addEventListener("load",o),e.addEventListener("error",i)},t.prototype._onLoad=function(t,e){this._pendingLoads--,e()},t.prototype._onLoadError=function(t,e,n){this._pendingLoads--,e(n)},t.prototype._insertLinkNode=function(t){this._pendingLoads++;var e=document.head||document.getElementsByTagName("head")[0],n=e.getElementsByTagName("link")||document.head.getElementsByTagName("script");n.length>0?e.insertBefore(t,n[n.length-1]):e.appendChild(t)},t.prototype.createLinkTag=function(t,e,n,r){var s=this,o=document.createElement("link");o.setAttribute("rel","stylesheet"),o.setAttribute("type","text/css"),o.setAttribute("data-name",t);var i=function(){return s._onLoad(t,n)},a=function(e){return s._onLoadError(t,r,e)};return this.attachListeners(t,o,i,a),o.setAttribute("href",e),o},t.prototype._linkTagExists=function(t,e){var n,r,s,o,i=document.getElementsByTagName("link");for(n=0,r=i.length;n<r;n++)if(s=i[n].getAttribute("data-name"),o=i[n].getAttribute("href"),s===t||o===e)return!0;return!1},t.prototype.load=function(t,e,n,r){if(this._linkTagExists(t,e))return void n();var s=this.createLinkTag(t,e,n,r);this._insertLinkNode(s)},t}(),r=function(t){function e(){t.call(this),this._blockedLoads=[],this._mergeStyleSheetsTimeout=-1}return __extends(e,t),e.prototype.load=function(t,e,n,r){if(this._linkTagExists(t,e))return void n();var s=this.createLinkTag(t,e,n,r);this._styleSheetCount()<31?this._insertLinkNode(s):(this._blockedLoads.push(s),this._handleBlocked())},e.prototype._styleSheetCount=function(){var t=document.getElementsByTagName("link").length,e=document.getElementsByTagName("style").length;return t+e},e.prototype._onLoad=function(e,n){t.prototype._onLoad.call(this,e,n),this._handleBlocked()},e.prototype._onLoadError=function(e,n,r){t.prototype._onLoadError.call(this,e,n,r),this._handleBlocked()},e.prototype._handleBlocked=function(){var t=this,e=this._blockedLoads.length;e>0&&this._mergeStyleSheetsTimeout===-1&&(this._mergeStyleSheetsTimeout=window.setTimeout(function(){return t._mergeStyleSheets()},0))},e.prototype._mergeStyleSheet=function(t,e,n,r){for(var s=r.rules.length-1;s>=0;s--)e.insertRule(a.rewriteUrls(n,t,r.rules[s].cssText),0)},e.prototype._asIE9HTMLLinkElement=function(t){return t},e.prototype._mergeStyleSheets=function(){this._mergeStyleSheetsTimeout=-1;var t,e=this._blockedLoads.length,n=document.getElementsByTagName("link"),r=n.length,s=[];for(t=0;t<r;t++)"loaded"!==n[t].readyState&&"complete"!==n[t].readyState||s.push({linkNode:n[t],rulesLength:this._asIE9HTMLLinkElement(n[t]).styleSheet.rules.length});var o=s.length,i=Math.min(Math.floor(o/2),e);s.sort(function(t,e){return e.rulesLength-t.rulesLength});var a,l;for(t=0;t<i;t++)a=s.length-1-t,l=t%(s.length-i),this._mergeStyleSheet(s[l].linkNode.href,this._asIE9HTMLLinkElement(s[l].linkNode).styleSheet,s[a].linkNode.href,this._asIE9HTMLLinkElement(s[a].linkNode).styleSheet),s[a].linkNode.parentNode.removeChild(s[a].linkNode),r--;for(var u=this._styleSheetCount();u<31&&this._blockedLoads.length>0;)this._insertLinkNode(this._blockedLoads.shift()),u++},e}(n),s=function(t){function e(){t.call(this)}return __extends(e,t),e.prototype.attachListeners=function(t,e,n,r){e.onload=function(){e.onload=null,n()}},e}(r),o=function(){function t(){this.fs=require.nodeRequire("fs")}return t.prototype.load=function(e,n,r,s){var o=this.fs.readFileSync(n,"utf8");o.charCodeAt(0)===t.BOM_CHAR_CODE&&(o=o.substring(1)),r(o)},t.BOM_CHAR_CODE=65279,t}(),i=function(){function t(t){this.cssLoader=t}return t.prototype.load=function(n,r,s,o){o=o||{};var i=o["vs/css"]||{};e.inlineResources=i.inlineResources;var a=r.toUrl(n+".css");this.cssLoader.load(n,a,function(e){o.isBuild&&(t.BUILD_MAP[n]=e,t.BUILD_PATH_MAP[n]=a),s({})},function(t){"function"==typeof s.error&&s.error("Could not find "+a+" or it was empty")})},t.prototype.write=function(n,r,s){var o=s.getEntryPoint();e.cssPluginEntryPoints=e.cssPluginEntryPoints||{},e.cssPluginEntryPoints[o]=e.cssPluginEntryPoints[o]||[],e.cssPluginEntryPoints[o].push({moduleName:r,contents:t.BUILD_MAP[r],fsPath:t.BUILD_PATH_MAP[r]}),s.asModule(n+"!"+r,"define(['vs/css!"+o+"'], {});")},t.prototype.writeFile=function(t,n,r,s,o){if(e.cssPluginEntryPoints&&e.cssPluginEntryPoints.hasOwnProperty(n)){for(var i=r.toUrl(n+".css"),l=["/*---------------------------------------------------------"," * Copyright (c) Microsoft Corporation. All rights reserved."," *--------------------------------------------------------*/"],u=e.cssPluginEntryPoints[n],c=0;c<u.length;c++)e.inlineResources?l.push(a.rewriteOrInlineUrls(u[c].fsPath,u[c].moduleName,n,u[c].contents,"base64"===e.inlineResources)):l.push(a.rewriteUrls(u[c].moduleName,n,u[c].contents));s(i,l.join("\r\n"))}},t.prototype.getInlinedResources=function(){return e.cssInlinedResources||[]},t.BUILD_MAP={},t.BUILD_PATH_MAP={},t}();t.CSSPlugin=i;var a=function(){function t(){}return t.startsWith=function(t,e){return t.length>=e.length&&t.substr(0,e.length)===e},t.pathOf=function(t){var e=t.lastIndexOf("/");return e!==-1?t.substr(0,e+1):""},t.joinPaths=function(e,n){function r(e,n){return t.startsWith(e,n)?Math.max(n.length,e.indexOf("/",n.length)):0}function s(t,e){if("./"!==e){if("../"===e){var n=t.length>0?t[t.length-1]:null;if(n&&"/"===n)return;if(n&&"../"!==n)return void t.pop()}t.push(e)}}function o(t,e){for(;e.length>0;){var n=e.indexOf("/"),r=n>=0?e.substring(0,n+1):e;e=n>=0?e.substring(n+1):"",s(t,r)}}var i=0;i=i||r(e,"//"),i=i||r(e,"http://"),i=i||r(e,"https://");var a=[];return o(a,e.substr(i)),n.length>0&&"/"===n.charAt(0)&&(a=[]),o(a,n),e.substring(0,i)+a.join("")},t.commonPrefix=function(t,e){for(var n=Math.min(t.length,e.length),r=0;r<n&&t.charCodeAt(r)===e.charCodeAt(r);r++);return t.substring(0,r)},t.commonFolderPrefix=function(e,n){var r=t.commonPrefix(e,n),s=r.lastIndexOf("/");return s===-1?"":r.substring(0,s+1)},t.relativePath=function(e,n){if(t.startsWith(n,"/")||t.startsWith(n,"http://")||t.startsWith(n,"https://"))return n;var r=t.commonFolderPrefix(e,n);e=e.substr(r.length),n=n.substr(r.length);for(var s=e.split("/").length,o="",i=1;i<s;i++)o+="../";return o+n},t._replaceURL=function(e,n){return e.replace(/url\(\s*([^\)]+)\s*\)?/g,function(e){for(var r=[],s=1;s<arguments.length;s++)r[s-1]=arguments[s];var o=r[0];for('"'!==o.charAt(0)&&"'"!==o.charAt(0)||(o=o.substring(1));o.length>0&&(" "===o.charAt(o.length-1)||"\t"===o.charAt(o.length-1));)o=o.substring(0,o.length-1);return'"'!==o.charAt(o.length-1)&&"'"!==o.charAt(o.length-1)||(o=o.substring(0,o.length-1)),t.startsWith(o,"data:")||t.startsWith(o,"http://")||t.startsWith(o,"https://")||(o=n(o)),"url("+o+")"})},t.rewriteUrls=function(e,n,r){return this._replaceURL(r,function(r){var s=t.joinPaths(t.pathOf(e),r);return t.relativePath(n,s)})},t.rewriteOrInlineUrls=function(n,r,s,o,i){var a=require.nodeRequire("fs"),l=require.nodeRequire("path");return this._replaceURL(o,function(o){if(/\.(svg|png)$/.test(o)){var u=l.join(l.dirname(n),o),c=a.readFileSync(u);if(c.length<3e3){e.cssInlinedResources=e.cssInlinedResources||[];var h=u.replace(/\\/g,"/");e.cssInlinedResources.indexOf(h)>=0&&console.warn("CSS INLINING IMAGE AT "+u+" MORE THAN ONCE. CONSIDER CONSOLIDATING CSS RULES"),e.cssInlinedResources.push(h);var d=/\.svg$/.test(o)?"image/svg+xml":"image/png",f=";base64,"+c.toString("base64");if(!i&&/\.svg$/.test(o)){var g=c.toString().replace(/"/g,"'").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/&/g,"%26").replace(/#/g,"%23").replace(/\s+/g," "),p=","+g;p.length<f.length&&(f=p)}return'"data:'+d+f+'"'}}var y=t.joinPaths(t.pathOf(r),o);return t.relativePath(s,y)})},t}();t.Utilities=a,function(){var t=null,e="undefined"!=typeof process&&"undefined"!=typeof process.versions&&"undefined"!=typeof process.versions.electron;t="undefined"!=typeof process&&process.versions&&process.versions.node&&!e?new o:"undefined"!=typeof navigator&&navigator.userAgent.indexOf("MSIE 9")>=0?new r:"undefined"!=typeof navigator&&navigator.userAgent.indexOf("MSIE 8")>=0?new s:new n,define("vs/css",new i(t))}()}(CSSLoaderPlugin||(CSSLoaderPlugin={}));
//# sourceMappingURL=../../min-maps/vs/css.js.map