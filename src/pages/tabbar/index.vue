<template>
	<view>
		
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		useI18n
	} from "vue-i18n";
	
	const store = userStore();
	const {
		t
	} = useI18n()

	
	const showLoading = ref(null)
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
		
	})
</script>

<style lang="scss" scoped>
	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		.content {
			display: flex;
			flex-direction: column;
			width: 640rpx;
			height: 530rpx;
			border-radius: 30rpx;
		}

		.normalContent {
			width: 640rpx;
			height: 530rpx;
			border-radius: 30rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
			overflow: scroll;
		}

		.recBtn {
			background: linear-gradient(0deg, #FEC65C 0%, #FFF3AC 100%);
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 25rpx 130rpx;
		}
	}

	.topNav {
		padding: 23rpx 29rpx;
		position: absolute;
		top: 0;
		width: calc(100% - 58rpx);
		z-index: 99;
	}

	.topComm {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 35rpx 19rpx;
		// height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.commItem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 22rpx;
			width: 25%;
		}
	}

	.topComm2 {
		padding: 34rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 17rpx;
		color: #fff;
		border-radius: 20rpx;

		.commItem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 22rpx;
			width: 25%;
			padding: 0 20rpx;
			text-align: center;
		}
	}

	// .newLogo {
	// 	color: #fff;
	// 	border: 5rpx solid #2c52aa;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	width: 60rpx;
	// 	height: 60rpx;
	// 	border-radius: 10rpx;
	// 	text-transform: uppercase;
	// 	font-size: 30rpx;
	// 	font-weight: bold;

	// 	.textLang {
	// 		background: linear-gradient(to right bottom, #ffff7f, #ffaaff);
	// 		-webkit-background-clip: text;
	// 		color: transparent;
	// 	}

	// 	// line-height: 65rpx;
	// }
</style>
