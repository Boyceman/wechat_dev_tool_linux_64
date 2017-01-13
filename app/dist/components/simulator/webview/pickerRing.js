'use strict';var _exports;function init(){const a=require('../../../lib/react.js');require('../../../lib/react-dom.js');const b=34,c=a.createClass({displayName:'PickerRing',getInitialState:function(){return{translateY:0}},componentDidMount:function(){this.setCurrent(this.props.current)},componentWillReceiveProps:function(d){d.current!=this.props.current&&this.setCurrent(d.current)},setCurrent:function(d){this.setState({translateY:(3-d)*b})},onMouseDown:function(d){this.touch=!0,this.startY=d.pageY,this.lastTranslateY=this.state.translateY||0},onMouseMove:function(d){if(this.touch){let g=d.pageY-this.startY+this.lastTranslateY;g=Math.max((3-this.props.array.length+1)*b,g),g=Math.min(3*b,g),this.setState({translateY:g})}},onMouseUp:function(d){this.touch=!1,this.startY=0,this.lastTranslateY=0;let f=this.state.translateY;f=Math.max((3-this.props.array.length+1)*b,f),f=Math.min(3*b,f);let g=3-parseInt(f/b);isNaN(g)||(this.current=g),f=(3-this.current)*b,this.setState({translateY:f}),setTimeout(()=>{this.props.onPickerSelect&&this.props.onPickerSelect(this.current)},0)},getItemList:function(){let d=this.props.array,f=[];for(var g=0;g<d.length;g++)f.push(a.createElement('div',{className:'wx-picker-item'},d[g]+''));return f},render:function(){let d={transform:`translate3d(0px, ${this.state.translateY}px, 0px)`,transition:'all 0.3s'};return a.createElement('div',{className:'wx-picker-group',onMouseDown:this.onMouseDown,onMouseMove:this.onMouseMove,onMouseUp:this.onMouseUp,onMouseLeave:this.onMouseUp,style:{display:this.props.hidden?'none':''}},a.createElement('div',{className:'wx-picker-mask2'}),a.createElement('div',{className:'wx-picker-indicator'}),a.createElement('div',{className:'wx-picker-content',style:d},this.getItemList()))}});_exports=c}init(),module.exports=_exports;