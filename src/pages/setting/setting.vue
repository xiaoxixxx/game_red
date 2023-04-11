<template>
	<view>
		<topNav :title="t('setting.s_c1')"></topNav>
		<view class="pdlr45 mt70">

			<view class="listItem mb30" v-for="item in list" @click="jumpPage(item.url)">
				<view class="flex col_center">
					<image :src="item.img" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
					<view class="ml45">
						{{item.name}}
					</view>
				</view>
				<image src="/src/static/themeNum1/setting/right.png" mode="widthFix" style="width: 14rpx;height: 26rpx;"></image>
			</view>
		</view>
		
		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('all.a_t1')}}</view>
					<view class="f30 mt40">
						{{t('setting.s_c2')}}
					</view>
		
					<view class="between">
						<view style="border: 1rpx solid #cd0103;" :style="{'color':'#cd0103'}">{{t('all.a_c1')}}</view>
						<view class="text_white" :style="{background:store.$state.contentColor}" @click="confirmHandle"> {{t('all.a_c2')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore

	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";
	const {
		t
	} = useI18n();
	const loginOutMask= ref(false)
	const confirmHandle = ()=>{
		uni.navigateTo({
			url:'../login/login'
		})
	}
	const list = ref([{
			name: t('setting.s_c3'),
			url: './set1',
			img:"/static/themeNum1/setting/usdt.png"
		},
		{
		name: t('setting.s_c4'),
			url: './set2',
			img:"/static/themeNum1/setting/bank.png"
		},
		{
			name: t('setting.s_c5'),
			url: './set3',
			img:"/static/themeNum1/setting/fundPwd.png"
		},
		{
			name: t('setting.s_c6'),
			url: './set4',
			img:"/static/themeNum1/setting/loginPwd.png"
		},
		{
			name: t('setting.s_c7'),
			url: '',
			img:"/static/themeNum1/setting/loginOut.png"
		},
	])
	const jumpPage = url =>{
		if(url){
			uni.navigateTo({
				url
			})
		}else{
			loginOutMask.value = true
		}
	}
	// 终于可以用了
	onShow(() => {})
</script>

<style lang="scss">
.listItem{
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx 45rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 10rpx 20rpx 5rpx #ccc;
}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;
	
		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #fff;
			border-radius: 20rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;
	
			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;
	
				view {
					width: 48%;
					height: 96rpx;
					text-align: center;
					line-height: 96rpx;
					font-size: 30rpx;
					border-radius: 15rpx
				}
			}
		}
	}
</style>
