'use strict';var _exports;function init(){const a=require('../../../lib/react.js');require('../../../lib/react-dom.js');const b=require('./pickerRing'),c=require('../../../cssStr/cssStr.js'),d=a.createClass({displayName:'TimeRing',getInitialState:function(){const e=[],f=[];for(let g=0;60>g;g++)24>g&&e.push(9<g?''+g:'0'+g),f.push(9<g?''+g:'0'+g);return{hourArray:e,minuteArray:f,hourCurrent:0,minuteCurrent:0}},componentDidMount:function(){this.range={},this.setRange('start',this.props.start||'00:00'),this.setRange('end',this.props.end||'23:59'),this.setCurrent(this.props.current||'00:00')},componentWillReceiveProps:function(e){e.show&&(e.current!=this.props.current&&this.setCurrent(e.current),e.start!=this.props.start&&this.setRange('start',e.start),e.end!=this.props.end&&this.setRange('end',e.end))},setCurrent:function(e){let f=e.split(':'),g=parseInt(f[0]),h=parseInt(f[1]);this.setState({hourCurrent:isNaN(g)?0:Math.min(Math.max(g,0),23),minuteCurrent:isNaN(h)?0:Math.min(Math.max(h,0),59)})},setRange:function(e,f){let g=f.split(':'),h=parseInt(g[0]);h=isNaN(h)?0:h;let j=parseInt(g[1]);j=isNaN(j)?0:j,this.range[e]=60*h+j},onHourSelect:function(e){let f=60*e+this.state.minuteCurrent,g=e;f<this.range.start?g=parseInt(this.range.start/60):f>this.range.end&&(g=parseInt(this.range.end/60)),this.setState({hourCurrent:g}),this.refs.hourPicker.setCurrent(g)},onMinuteSelect:function(e){let f=60*this.state.hourCurrent+e,g=e;f<this.range.start?g=parseInt(this.range.start%60):f>this.range.end&&(g=parseInt(this.range.end%60),this.setState({minuteCurrent:g}),this.refs.minutePicker.setCurrent(g)),this.setState({minuteCurrent:g}),this.refs.minutePicker.setCurrent(g)},getValue:function(){return this.state.hourArray[this.state.hourCurrent]+':'+this.state.minuteArray[this.state.minuteCurrent]},render:function(){return a.createElement('div',{className:'wx-picker-bd',style:this.props.show?{}:c.displayNone},a.createElement(b,{ref:'hourPicker',array:this.state.hourArray,current:this.state.hourCurrent,onPickerSelect:this.onHourSelect}),a.createElement(b,{ref:'minutePicker',array:this.state.minuteArray,current:this.state.minuteCurrent,onPickerSelect:this.onMinuteSelect}))}});_exports=d}init(),module.exports=_exports;