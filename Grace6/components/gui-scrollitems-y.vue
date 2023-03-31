<template>
	<scroll-view 
	:scroll-y="!animating" 
	:scroll-top="sctop" 
	@scroll="scrolling" 
	:scroll-with-animation="true" 
	:show-scrollbar="false" 
	:style="{height:height}">
		<view 
		class="gui-scrollitemsy gui-flex gui-row gui-nowrap gui-space-between" 
		hover-class="gui-tap" 
		v-for="(item, idx) in itemsIn" :key="idx" 
		:class="[ animating && idx == 0 ? 'gui-scrollitemsy-animate' : '']" 
		:style="{opacity:animating && idx == 0 ? 0 : 1}" 
		@touchstart="touchstart" @touchend="touchend" 
		@tap="itemTap(idx)" 
		ref="scitems">
			<image 
			:src="item.img" 
			mode="aspectFill" 
			:style="imgStyle"></image>
			<view 
			class="gui-scrollitemsy-body gui-flex1">
				<text 
				class="gui-block" 
				:style="textStyle">{{item.desc}}</text>
			</view>
		</view>
	</scroll-view>
</template>
<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
export default{
	name  : "gui-scrollitems-y",
	props : {
		height    : {type : String, default : '480rpx'},
		imgStyle  : {type : String, default : 'width:88rpx; height:88rpx; border-radius:6rpx; margin-top:5rpx; margin-right:28rpx;'},
		textStyle : {type : String, default : 'font-size:28rpx; line-height:38rpx;'},
		items     : {type : Array,  default : function(){return [];}},
		duration  : {type : Number, default : 6000}
	},
	data() {
		return {
			timer      : null,
			timer2     : null,
			timer3     : null,
			animating  : false,
			itemsIn    : [],
			sctop      : 0
		}
	},
	created:function(){
		this.itemsIn = this.items;
		this.timer   = setTimeout(() => {this.animate();}, this.duration);
	},
	methods:{
		animate : function(){
			this.sctop     = 0;
			var tmp        = this.itemsIn.pop();
			this.items.unshift(tmp);
			this.animating = true;
			// #ifdef APP-NVUE
			setTimeout(() => {this.animateforweex();}, 200);
			// #endif
			setTimeout(()=>{ this.animating = false; }, 600);
			this.timer = setTimeout(() => {
				this.animate();
			}, this.duration);
		},
		touchstart : function(){
			clearTimeout(this.timer);
		},
		touchend : function(){
			clearTimeout(this.timer2);
			this.timer2 = setTimeout(()=>{
				this.sctop = 0;
				setTimeout(()=>{this.animate();}, 1000)
			}, 3000);
		},
		scrolling : function (e) {
			clearTimeout(this.timer3);
			this.timer3 = setTimeout(()=>{
				this.sctop = e.detail.scrollTop;
			},200);
		},
		itemTap : function(idx){
			this.$emit('itemTap', this.itemsIn[idx]);
		},
		addItem : function(obj){
			clearTimeout(this.timer);
			clearTimeout(this.timer2);
			this.itemsIn.push(obj);
			setTimeout(()=>{ this.sctop = 0; }, 500);
			setTimeout(()=>{ this.animate(); }, 1000);
		},
		animateforweex : function () {
			var ref = this.$refs.scitems[0];
			animation.transition(ref, {
				styles: {opacity:1},
				duration: 300, //ms
				timingFunction: 'ease',
				delay: 0 //ms
			});
		}
	},
	emits : ['itemTap']
}
</script>
<style scoped>
.gui-scrollitemsy{margin-bottom:30rpx;}
.gui-scrollitemsy-body{overflow:hidden;}

/* #ifndef APP-NVUE */
@keyframes gui-scrollitemsy-animate{0%{height:0;} 100%{height:100rpx;}}
.gui-scrollitemsy-animate{animation:gui-scrollitemsy-animate 500ms ease-in; }
/* #endif */
</style>
