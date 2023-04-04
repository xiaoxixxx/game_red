<template>
	<view >
		<view class="pagePad between  nav">
			<view></view>
			<view>
				<image src="@/static/images/headlogo.png" style="width: 210rpx;height: 80rpx;"></image>
			</view>
			<image src="@/static/images/down.png" style="width: 50rpx;height: 50rpx;"></image>
		</view>

		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" next-margin="20"
				:circular="true" style="height: 370rpx;">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.banner_image" style=" width: 100%;height: 370rpx"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice between" style="background-color: #fffbe8;" dir="ltr">
			<nut-noticebar :scrollable="true" background="rgba(251, 248, 220, 0)" color="#212121">
				<template v-slot:left-icon>
					<img src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
						style="width: 20px; height: 20px" />
				</template>
			</nut-noticebar>

			<view class="noticeRight nav text_white flex col_center">
				<image src="../../static/images/notice-right.svg" mode="width" style="width: 20rpx;height: 20rpx;">
				</image>
				<text class="pl10">Latest Announcements</text>
			</view>
		</view>

		<view class="pdlr30">
			<view class="mt50 flex between" style="height: 200rpx;">
				<view class="topItem topItem1">
					<image src="../../static/images/CP.png" style="width: 160rpx;height: 150rpx;"></image>
				</view>
				<view class="topItem topItem2">
					<image src="../../static/images/DZ.webp" style="width: 160rpx;height: 150rpx;"></image>
				</view>
				<view class="topItem topItem3">
					<image src="../../static/images/DC.webp" style="width: 160rpx;height: 150rpx;"></image>
				</view>
				<view class="topItem topItem4">
					<image src="../../static/images/TY.webp" style="width: 160rpx;height: 150rpx;"></image>
				</view>
			</view>

			<!-- 游戏种类 -->
			<indexGameList></indexGameList>

			<view class="bounsBox">
				<view class="bounsBg">
					<view class="center text_white f40" style="padding-top: 190rpx;">
						<text class="pb5 pr10"> 6788716050.00</text> <text class="f60">₫</text>
					</view>
				</view>
			</view>

			<view class="mt80">
				<view class="text_center f40">
					website runtime
				</view>
			</view>

			<view class="between mt40 pdlr20">
				<view class="dateBox">
					<view class="value">3456</view>
					<view class="name">Day</view>
				</view>
				<view class="dateBox">
					<view class="value">3456</view>
					<view class="name">hour</view>
				</view>
				<view class="dateBox">
					<view class="value">3456</view>
					<view class="name">minute</view>
				</view>
				<view class="dateBox">
					<view class="value">3456</view>
					<view class="name">second</view>
				</view>
			</view>
		</view>

		<view style="height: 200rpx;"></view>
		<Loading ref="showLoading"></Loading>
		<tqbTabbar :activeIndex="0"></tqbTabbar>
	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
	import indexGameList from "@/components/indexGameList/indexGameList.vue"
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
	const bannerList = ref([{
			banner_image: "/static/images/banner1.jpg",
		},
		{
			banner_image: "/static/images/banner2.png",
		},
		{
			banner_image: "/static/images/banner3.jpg",
		},
		{
			banner_image: "/static/images/banner4.jpg",
		},
	])

	const showLoading = ref(null)
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)

	})
</script>

<style lang="scss" scoped>
	page{
		background-color: #fbfcfd;
	}
	.dateBox {
		box-shadow: 0 5rpx 20rpx 5rpx rgba(172, 182, 192, .5);
		width: 23%;
		border-radius: 20rpx;

		.value {
			text-align: center;
			color: #000;
			border-radius: 20rpx 20rpx 0 0;
			padding: 20rpx 0;
			background: linear-gradient(180deg, #fff, #eeeff2);
		}

		.name {
			text-align: center;
			color: #9da7b3;
			padding: 20rpx 0;
			font-weight: bold;
		}
	}

	.notice {
		background-color: #fffbe8;
		padding-right: 20rpx;
		font-size: 20rpx;

		.noticeRight {
			height: 100%;
			padding: 15rpx 20rpx;
			border-radius: 30rpx;
		}
	}

	.topItem {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topItem1,
	.topItem3 {
		animation: move 1.5s linear infinite;
		// animation-iteration-count: ;
	}

	.topItem2,
	.topItem4 {
		animation: move2 1.5s linear infinite;
		// animation-iteration-count: ;
	}

	.bounsBox {
		margin-top: 40rpx;
		height: 320rpx;
		background: url('/static/images/adv-bonus.png') no-repeat 100%/100%;

		.bounsBg {
			height: 378rpx;
			background-position: left;
			background: url('../../static/images/coin-bonus.webp') no-repeat 100%/105%;
		}
	}
</style>
