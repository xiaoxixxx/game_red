<template>
	<view>
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
			<nut-noticebar :scrollable="true" background="rgba(251, 248, 220, 0)" color="#212121" :text="barText"
				style="width: 55%;">
				<template v-slot:left-icon>
					<img src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
						style="width: 20px; height: 20px" />
				</template>
			</nut-noticebar>

			<view class="noticeRight nav text_white flex col_center">
				<image src="../../static/images/notice-right.svg" mode="width" style="width: 20rpx;height: 20rpx;">
				</image>
				<text class="pl10">{{t('game.g_b1')}}</text>
			</view>
		</view>

		<view class="pdlr30">
			<!-- <view class="mt50 flex between" style="height: 200rpx;">
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
			</view> -->

			<!-- 游戏种类 -->
			<indexGameList></indexGameList>

			<view class="bounsBox">
				<view class="bounsBg">
					<view class="center text_white f40 bounsMoney" style="">
						<text class="pb5 pr10"> {{pageData.total_betting}}</text> <text class="f40">{{currency}}</text>
					</view>
				</view>
			</view>

			<view class="mt80">
				<view class="text_center f40">
					{{t('game.g_b2')}}
				</view>
			</view>

			<view class="between mt40 pdlr20">
				<view class="dateBox">
					<view class="value">{{formDate.days}}</view>
					<view class="name">{{t('game.g_b3')}}</view>
				</view>
				<view class="dateBox">
					<view class="value">{{formDate.hours}}</view>
					<view class="name">{{t('game.g_b4')}}</view>
				</view>
				<view class="dateBox">
					<view class="value">{{formDate.minutes}}</view>
					<view class="name">{{t('game.g_b5')}}</view>
				</view>
				<view class="dateBox">
					<view class="value">
						{{formDate.seconds}}
					</view>
					<view class="name">{{t('game.g_b6')}}</view>
				</view>
			</view>
		</view>

		<view class="purpleList between">
			<view class="userItem" v-for="item in userData">
				<view>
					<image :src="item.url" mode="widthFix" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view class="mt10 text_bold textHiddenOne" style="height: 40rpx;">{{item.value}}</view>
				<view class="f20 textHiddenTwo" style="height: 60rpx;"> {{item.name}} </view>
			</view>
		</view>

		<view class="mt30 pdlr30">
			<view class="swiperTitle">
				{{t('game.g_b7')}}
			</view>

			<view class="mt20 winSwiper">
				<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true" :vertical="true"
					:circular="true" :display-multiple-items="4">
					<swiper-item v-for="(item, index) in withdrawList" :key="index" class="between mgtb10">
						<!-- <view class="between mgtb10" v-for="item in 4"> -->
						<view class="flex col_center">
							<view>
								<image src="@/static/images/avatar.svg" style="width:56rpx ; height: 60rpx;">
								</image>
							</view>
							<text class="textHiddenOne pl20 f26" style="width: 250rpx;">{{item.phone}}</text>
						</view>
						<view class="f26 flex ">
							<view class="error text_bold"><text>Có</text>
								{{item.amount}} {{currency}}
							</view>

							<!-- <view class="ml20">14.11</view> -->
						</view>
						<!-- </view> -->
					</swiper-item>
				</swiper>
			</view>

			<view class="mt60 winSwiper">
				<view class="f34 text_center">{{t('game.g_b8')}}</view>

				<view class="mt30 between" style="flex-wrap: wrap;">
					<view v-for="(item,index) in botDataList" class="botTitleItem mb30"
						:class="botDataInd == index ?'actBot':''" @click="botDataInd = index">
						<view style="width: 70%;">
							<view class="f20  flex">
								<view class="botTitle">{{item.name}}</view>
							</view>
							<view class="f20 mt10 textHiddenOne" style="width: 100%;">{{item.des}}</view>
						</view>
						<image :src="item.img" mode="widthFix" style="width: 70rpx;height: 70rpx;"></image>
					</view>
				</view>
			</view>


			<view class="mt30 winSwiper">
				<view class="f34 text_center">{{botDataList[botDataInd].fullName}}</view>

				<view class="mt30 textHiddenThree">
					{{botDataList[botDataInd].content}}
				</view>
			</view>
		</view>
		<view style="height: 200rpx;"></view>
		<Loading ref="showLoading"></Loading>
		<tqbTabbar :activeIndex="0"></tqbTabbar>

		<nut-overlay v-model:visible="show" :overlay-style="{background:'rgba(0,0,0,0.3)'}"
			:close-on-click-overlay="false">
			<div class="wrapper flex-col">
				<div class="normalContent desc">
					<view v-html="maskContent.content"></view>
				</div>

				<view class="center mt20">
					<image src="../../static/themeNum1/icon/closeBtn.png" mode="widthFix"
						style="width: 80rpx;height: 80rpx;" @click="show = false"></image>
				</view>
			</div>
		</nut-overlay>
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
		showToast
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

	const botDataInd = ref(0)
	const botDataList = ref([{
			name: t('game.g_b9'),
			des: t('game.g_b10'),
			img: "/static/images/work_first_hong.webp",
			fullName: t('game.g_b11'),
			content: t('game.g_b12'),
		},
		{
			name: t('game.g_b13'),
			des: t('game.g_b14'),
			fullName: t('game.g_b14'),
			content: t('game.g_b15'),
			img: "/static/images/support2.png",
		},
		{
			name: t('game.g_b16'),
			des: t('game.g_b17'),
			fullName: t('game.g_b17'),
			content: t('game.g_b18'),
			img: "/static/images/support3.png",
		},
		{
			name: t('game.g_b19'),
			des: t('game.g_b20'),
			fullName:t('game.g_b21'),
			content: t('game.g_b22'),
			img: "/static/images/support4.png",
		},
	])


	const bannerList = ref([])
	const userData = ref([{
			name: t('game.g_i1'),
			value: "0",
			url: "/static/images/u_home.png"
		},
		{
			name: t('game.g_i2'),
			value: "0",
			url: "/static/images/q_home.png"
		},
		{
			name: t('game.g_i3'),
			value: "0",
			url: "/static/images/us_home.png"
		},
	])
	const showLoading = ref(null)
	const timer = ref(null)
	const formDate = ref({
		days: '00',
		hours: '00',
		minutes: '00',
		seconds: 0,
	})
	const times = ref(0)
	// 计时器
	const startTimer = () => {
		// 初始化时间
		const timestamp = times.value; // example timestamp
		const date = new Date(timestamp * 1000); // convert to milliseconds
		formDate.value.days = Math.floor(date / (1000 * 60 * 60 * 24)).toString().padStart('2', 0); // calculate days
		formDate.value.hours = date.getUTCHours().toString().padStart('2', 0); // get hours
		formDate.value.minutes = date.getUTCMinutes().toString().padStart('2', 0); // get minutes
		formDate.value.seconds = date.getUTCSeconds().toString().padStart('2', 0); // get seconds

		timer.value = setInterval(() => {
			formDate.value.seconds++;
			if (formDate.value.seconds === 60) {
				formDate.value.seconds = 0;
				formDate.value.minutes++;
				if (formDate.value.minutes < 10) {
					formDate.value.minutes = "0" + formDate.value.minutes;
				}
			}
			if (formDate.value.minutes === 60) {
				formDate.value.minutes = 0;
				formDate.value.hours++;
				if (formDate.value.minutes < 10) {
					formDate.value.minutes = "0" + formDate.value.minutes;
				}
				if (formDate.value.hours < 10) {
					formDate.value.hours = "0" + formDate.value.hours;
				}
			}
			if (formDate.value.hours === 24) {
				formDate.value.hours = 0;
				formDate.value.days++;
				if (formDate.value.hours < 10) {
					formDate.value.hours = "0" + formDate.value.hours;
				}
				if (formDate.value.days < 10) {
					formDate.value.days = "0" + formDate.value.days;
				}
			}
			if (formDate.value.seconds < 10) {
				formDate.value.seconds = "0" + formDate.value.seconds;
			}
		}, 1000);

	}
	const barText = ref("")
	const getData = () => {

		request({
			url: 'home/report',
			methods: 'get',

		}).then(res => {
			userData.value[0].value = res.user_number
			userData.value[1].value = res.total_betting
			userData.value[2].value = res.user_online
			times.value = res.site_start_time
			pageData.value = res
			startTimer()
		})
		// 轮播图
		request({
			url: 'home/banner',
			methods: 'get'
		}).then(res => {
			bannerList.value = res
		})
		// 公告
		request({
			url: 'home/marquee',
			methods: 'get'
		}).then(res => {
			// res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content
		})

		// 获取货币符号
		request({
			url: '/setting/currency',
			methods: 'get'
		}).then(res => {
			currency.value = res.currency
			uni.setStorageSync('currency', res.currency)
		})
		// 提现假数据
		request({
			url: 'home/deposit',
			methods: 'get'
		}).then(res => {
			withdrawList.value = res
		})

		// 弹窗
		request({
			url: 'home/alert',
			methods: 'get'
		}).then(res => {
			try {
				if (res.length > 0) {
					maskContent.value = res[0]
					show.value = true
					maskInd.value = 0
				}
			} catch (e) {
				//TODO handle the exception
			}
		})
	}
	const show = ref(false)
	const maskContent = ref("")
	const currency = ref("")
	const withdrawList = ref([])
	const pageData = ref({})
	onMounted(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
		getData()
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
	})
	onLoad(e => {
		if (e.key) {
			uni.navigateTo({
				url: '../linkEgg/linkEgg?key=' + e.key
			})
			return false
		}
	})
</script>

<style lang="scss" scoped>
	.botTitleItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 42%;
		border-radius: 10rpx;
		padding: 20rpx;
		box-shadow: 0 0.10667rem 0.24rem 0.05333rem hsla(0, 0%, 49%, .13);
		// color: #;
		border: 1rpx solid rgba(0, 0, 0, 0);

		.botTitle {
			padding: 7rpx 10rpx;
			background: #dfdfdf;
			border-radius: 30rpx;
		}
	}

	.actBot {
		border-color: #e45d61;
		color: #e45d61 !important;
		transition: .3s linear all;

		.botTitle {
			background-color: #fff7f7 !important;
		}
	}

	.swiperTitle {
		line-height: 1.73333rem;
		color: #fff;
		text-align: center;
		height: 160rpx;
		line-height: 150rpx;
		width: 100%;
		background: url(data:image/png;base64,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) no-repeat 50%;
		background-size: contain;

	}

	page {
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
			font-weight: bold;
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
		position: relative;
		.bounsMoney{
			position: absolute;
			bottom: 75rpx;
			left: 0;
			transform: translateX(90%);
		}
		.bounsBg {
			height: 378rpx;
			background-position: left;
			background: url('../../static/images/coin-bonus.webp') no-repeat 100%/105%;
		}
	}

	.purpleList {
		background: url('../../static/images/info-bg.webp') no-repeat 50%;
		padding: 30rpx;
		margin-top: 40rpx;
		color: #fff;
		text-align: center;
		font-size: 28rpx;

		.userItem {
			width: 33%;
		}
	}

	.winSwiper {
		background-color: #fff;
		box-shadow: 0 0.02667rem 0.48rem 0 rgba(203, 202, 220, .56);
		padding: 30rpx 30rpx;
	}
</style>
