<template>
	<view
		style="background-image: url('/static/act/lotteryBg.png');background-size: 100%/100%;background-color: #9aecf8;background-repeat: no-repeat;">

		<view class="between" :style="{background:store.$state.contentColor}" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="/static/images/back.png" style="width: 100%;height: 100%;" @click="handleToBack"></image>
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">Lucky
				wheel</view>
			<view style="width: 52rpx;height: 52rpx;">
				<image src="/static/act/record.png" style="width: 100%;height: 100%;" @click="goRecord"></image>
			</view>
		</view>

		<view class="pdlr50 pt33">


			<view class="topBox">
				<view class="items" :style="{background:store.$state.contentColor}">
					Completed :{{topData.did_num}}
				</view>
				<view class="items" :style="{background:store.$state.contentColor}">
					Complete :{{topData.num}}
				</view>
			</view>

			<view class="lotterBox" v-if="prizeList.length >0">
				<nutbig-turntable class="turntable" ref="turntable" :width="luckWidth" :height="luckheight"
					:prize-list="prizeList" :turns-number="turnsNumber" :turns-time="turnsTime"
					:prize-index="prizeIndex" :style-opt="styleOpt" :pointer-style="pointerStyle"
					@start-turns="startTurns" @end-turns="endTurns" style="margin-top:100rpx">
				</nutbig-turntable>
				<!-- -->
				<ul class="roundDor"  v-if="rounded">
					<li v-for="item in 48"></li>
				</ul>
				<!-- <ZhuanPan></ZhuanPan> -->
			</view>

			<!-- resultList -->
			<view style="color:#fff;margin-top: 250rpx;">

				<view style="font-size: 50rpx;margin-top: 20rpx; text-align: center;color: #f13f39;">Rules</view>
				<view v-html="rules" class="maskContent" style="margin-top:20rpx"></view>

			</view>
			<view>
				<view style="text-align: center;margin: 40rpx 0;color: #f13f39; font-weight:bold;font-size:40rpx">
					Winners
				</view>
				<view class="withdraw_record_warp">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="1500" :duration="800"
						:vertical="true" display-multiple-items="4" style=" width: 100% !important;"
						:disable-touch="true">
						<swiper-item class="record_box" v-for="(item,index) of resultList" :key='index'>
							<view class="phone">
								{{item.user?.phone}}
							</view>

							<view class="status textHiddenOne">
								Get
							</view>
							<view class="amount">
								{{item.gift?.name}}
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>
			<view style="height: 200rpx;"></view>
		</view>
	</view>
</template>

<script setup>
	import COUNTRY from '../../../setting.js';
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
	// import ZhuanPan from '@/components/newZhuanPan/zhuanPan.vue'
	import qianDao from '../../components/qian-dao/qian-dao.vue'
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const handleToBack = () => {
		history.back()
	}
	const goRecord = () => {
		uni.navigateTo({
			url: '../record/drawRecord'
		})
	}
	const turntable = ref(null);
	const rounded = ref(false)
	// 转盘大小
	const luckWidth = ref("300px");
	const luckheight = ref("300px");
	// 转盘指针图片样式
	const pointerStyle = {
		width: "200rpx",
		height: "200rpx",
		backgroundImage: COUNTRY.lotterImg,
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
	};
	// 转盘上要展示的奖品数据
	const prizeList = ref([]);
	// 转动圈数
	const turnsNumber = ref(10);
	// 转动需要持续的时间(秒)
	const turnsTime = ref(6);
	// 转盘样式的选项
	const styleOpt = reactive({
		// 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
		prizeBgColors: [
			"#62f662",
			"#fe6766",
			"#b364db",
			"#62f662",
			"#fe6766",
			"#b364db",
			"#62f662",
			"#fe6766",
			"#b364db",
		],
		// 每一个扇形的外边框颜色
		borderColor: "#ff9800",
	});
	// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
	const prizeIndex = ref(0);
	let getItem = ref({})
	const goBack = () => {
		history.back()
	}
	// 剩余抽奖次数
	const startTurns = () => {
		console.log('123');
		if (topData.value.num == 0) {
			uni.showToast({
				title: "If you don't invite your friends to recharge and invest together, you can't participate in the turntable activity.",
				icon: 'none'
			})
			return false
		}
		rounded.value = true
		request({
			url: 'activity/lottery/lottery',
			methods: 'post'
		}).then(res => {
			let id = res.prize_id;
			prizeList.value.forEach((item, index) => {
				if (item.id == id) {
					getItem.value = item
					prizeIndex.value = index;
					turntable.value.rotateTurn();
				}
			})
		}).catch(err => {
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	};
	const rules = ref({})
	const endTurns = () => {
		uni.showToast({
			title: 'Lottery result:' + getItem.value.prizeName,
			icon: 'none'
		})
		rounded.value = false
		getData()
	};

	const topData = ref({})
	const getData = () => {
		request({
			url: '/activity/lottery/info',
			methods: "get",
		}).then(res => {
			rules.value = res.lottery.rule
			topData.value = res.chance
			resultList.value = res.result
			prizeList.value = res.lottery.gift.map(obj => {
				return {
					id: obj.id,
					prizeName: obj.name,
					prizeImg: obj.full_cover,
				};
			});


		})


	}

	const resultList = ref([])

	// 终于可以用了
	onShow(() => {
		getData()
	})

	onMounted(() => {

	})
</script>

<style lang="scss" scoped>
	.btn {
		margin-top: 30rpx;
		height: 100rpx;
		width: 500rpx;
		margin: 0 auto;
		border-radius: 50rpx;
		line-height: 100rpx;
	}

	.topBox {
		margin-top: 50rpx;
		color: #fff;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;

		.items {
			border-radius: 10rpx;
			padding: 20rpx 10rpx;
			width: 45%;
		}
	}



	.top_bar_warp {
		width: 100%;
		height: 66rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin-bottom: 55rpx;
		color: #9feef4;

		.left_box {
			width: 65rpx;
			height: 65rpx;
			// margin-top: 14rpx;
			border-radius: 20rpx;
			text-align: left;
			// line-height: 65rpx;
			display: flex;
			align-items: center;
			justify-content: left;

		}



		.right_box {
			width: 45rpx;
			height: 45rpx;
			border-radius: 20rpx;
			text-align: center;
			line-height: 65rpx;
		}
	}

	.withdraw_record_warp {
		// height: 240rpx;

		background: rgba(39, 39, 39, 0.8);
		border-radius: 20rpx;
		padding: 40rpx 50rpx 0 50rpx;
		color: #fff;

		.record_box {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-column-gap: 10rpx;
			margin-bottom: 40rpx;
			font-size: 22rpx;
			text-align: center;

			.phone {
				text-align: left;
			}

			.status {
				text-align: center;
			}

			.amount {
				text-align: right;
			}
		}
	}

	.turntable {
	// "#62f662",
	// 		"#fe6766",
	// 		"#b364db",
		// background-color: #9feef4;
		border: 20rpx solid ;
		border-radius: 50%;
		border-top-color: #62f662;
		border-right-color: #fe6766;
		border-bottom-color: #b364db;
		border-left-color: gold;
		box-shadow: 0 0 20rpx 10rpx #fe6766;
		// z-index: 999;
	}

	.lotterBox {
		position: relative;
		padding-top: 450rpx;
	}

	.roundDor {
		position: absolute;
		z-index: 999;
		top: 21rpx;
		left: 134rpx;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		// position: relative;

		@keyframes round {
			0% {
				opacity: 0;
			}

			25% {
				opacity: 0.25;
			}

			50% {
				opacity: 0.5;
			}

			75% {
				opacity: 0.75;
			}

			100% {
				opacity: 1;
			}
		}

		li {
			margin: 0;
			list-style-type: none;
			padding: 0;
			width: 14rpx;
			height: 14rpx;
			position: absolute;
			background-color: #fff;
			border-radius: 50%;
			line-height: 46rpx;
			text-align: center;
			left: 50%;
			margin-left: -1rpx;
			margin-top: -1rpx;
			color: #fff;
			transform-origin: 0 305rpx;
			animation-name: round; // 动画名称
			animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
			animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
			// 动画延迟时间
			animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放

			animation-duration: .5s; // 动画完成时间
			&:nth-child(odd) {
				box-shadow: 0 0 5rpx 0 rgba(255, 255, 255, 1);
			}

			&:nth-child(even) {
				box-shadow: 0 0 5rpx 0 rgba(0, 0, 0, 0.2) inset;
			}
		}

		li:first-child {
			transform-origin: 0 0;
		}

		@for $i from 1 through 48 {
			li:nth-of-type(#{$i}) {
				transform: rotate(($i - 1) * 7.5 + deg);

			}

			li:nth-of-type(#{$i}) span {
				display: block;
				transform: rotate(($i - 1) * -7.5 + deg);
			}

			li:nth-child(#{$i}) {
				animation-delay: ((   $i * 0.1 )s);
			}
		}
	}
</style>
