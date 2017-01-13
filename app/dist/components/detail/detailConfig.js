'use strict';var _exports;function init(){const a=require('../../lib/react.js'),b=require('../../cssStr/cssStr.js');require('../../actions/projectActions.js');const c=require('../../stores/projectStores.js'),d=a.createClass({displayName:'DetailConfig',getInitialState:function(){let e=c.getProjectConfig(this.props.project)||{},f=e.Network||{};return{requestDomains:f.RequestDomain||[],socketDomains:f.WsRequestDomain||[],uploadDomains:f.UploadDomain||[],downloadDomains:f.DownloadDomain||[],loading:!1}},componentDidMount:function(){c.on('PROJECT_CONFIG_REFRESHED',this._onConfigRefreshed)},componentWillUnmount:function(){c.removeListener('PROJECT_CONFIG_REFRESHED',this._onConfigRefreshed)},refreshConfig:function(){this.setState({loading:!0}),c.setProjectConfig(this.props.project,()=>{})},_onConfigRefreshed:function(){let e=c.getProjectConfig(this.props.project),f=e&&e.Network||{};this.setState({requestDomains:f.RequestDomain||[],socketDomains:f.WsRequestDomain||[],uploadDomains:f.UploadDomain||[],downloadDomains:f.DownloadDomain||[],loading:!1})},shouldComponentUpdate:function(e,f){return e.project!==this.props.project||e.show!==this.props.show||f!==this.state},render:function(){let e='detail-meta-upload '+(this.state.loading?'detail-upload-dialog-button-primary-loading':'');return a.createElement('div',{style:this.props.show?{}:b.displayNone},a.createElement('div',{className:'detail-meta-tab-bd'},a.createElement('div',{className:'detail-meta-wrapper'},a.createElement('div',{className:'detail-meta'},a.createElement('p',{className:'detail-meta-label detail-meta-label-fixed-width'},'request\u5408\u6CD5\u57DF\u540D'),a.createElement('div',{className:'detail-meta-value'},this.state.requestDomains.map(function(f){return a.createElement('p',null,f)}))),a.createElement('div',{className:'detail-meta'},a.createElement('p',{className:'detail-meta-label detail-meta-label-fixed-width'},'socket\u5408\u6CD5\u57DF\u540D'),a.createElement('div',{className:'detail-meta-value'},this.state.socketDomains.map(function(f){return a.createElement('p',null,f)}))),a.createElement('div',{className:'detail-meta'},a.createElement('p',{className:'detail-meta-label detail-meta-label-fixed-width'},'uploadFile\u5408\u6CD5\u57DF\u540D'),a.createElement('div',{className:'detail-meta-value'},this.state.uploadDomains.map(function(f){return a.createElement('p',null,f)}))),a.createElement('div',{className:'detail-meta'},a.createElement('p',{className:'detail-meta-label detail-meta-label-fixed-width'},'downloadFile\u5408\u6CD5\u57DF\u540D'),a.createElement('div',{className:'detail-meta-value'},this.state.downloadDomains.map(function(f){return a.createElement('p',null,f)}))))),a.createElement('div',{className:'detail-opr-wrapper'},a.createElement('a',{href:'javascript:;',className:e,onClick:this.refreshConfig},'\u5237\u65B0')))}});_exports=d}init(),module.exports=_exports;