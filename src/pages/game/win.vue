<template>
	<view>
		<view class="pagePad between  nav">
			<view style="width: 50rpx;height: 50rpx;">
				<image src="/static/images/back.png" style="width: 100%;height: 100%;" @click="back"></image>
			</view>
			<view>
				<image src="@/static/images/headlogo.png" style="width: 210rpx;height: 80rpx;"></image>
			</view>
			<view style="width: 50rpx;height: 50rpx;">
				<image src="@/static/images/audio.webp" style="width: 50rpx;height: 50rpx;"
					@tap="jumpPage('../mine/service')"></image>
			</view>

		</view>
		<view class="topBox">
			<view class="balanceBox">
				<view class="between">
					<view class="flex col_center">
						<image src="../../static/images/icon_wallet.webp" mode="widthFix" style="width: 90rpx;90rpx">
						</image>
						<view class="ml20 text_bold f34">{{t('all.b_b1')}}</view>
					</view>
					<view class=" text_bold f34 flex row_center">
						{{userBalance}}
						<IconFont name="refresh2 ml10" color="red" @click="upDateUserBalance"></IconFont>
					</view>
				</view>

				<view class="between mt20">
					<view class="btns" @click="jumpPage('../recharge/index')">
						{{t('recharge.r_r1')}}
					</view>
					<view class="btns" @click="jumpPage('../withdraw/index')">
						{{t('withdraw.w_w1')}}
					</view>
				</view>
			</view>

			<view class="mt30">
				<nut-noticebar :scrollable="true" background="#fffbe8" color="#ef7d2a" radius="20" :text="barText"
					spead="5">
					<template v-slot:left-icon>
						<img src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
							style="width: 20px; height: 20px" />
					</template>
				</nut-noticebar>
			</view>

			<view class=" mt20" v-if="topData.length >0">
				<minBox @changeActInd="getActInd" :topData="topData"></minBox>
			</view>

		</view>

		<view class=" pdlr30">
			<view class=" perBox ">
				<view>
					<view class="f20">{{t('win.w_i7')}}</view>
					<view class="text_bold f34 mt20">{{periodTimes}}</view>
				</view>
				<view class="timerBox">
					<view>
						{{t('win.w_i8')}}
					</view>
					<view class="flex col_center mt20 f34" v-if="times>0">
						<view class="mglr5">{{parseInt(formDate.minutes)<10?'0':parseInt(formDate.minutes/10)}}</view>
						<view class="mglr5">
							{{parseInt(formDate.minutes)<10?formDate.minutes:parseInt(formDate.minutes%10)}}
						</view>
						<view class="mglr5 text_bold">:</view>
						<view class="mglr5">{{parseInt(formDate.seconds)<10?'0':parseInt(formDate.seconds/10)}}</view>
						<view class="mglr5">
							{{parseInt(formDate.seconds)<10?formDate.seconds:parseInt(formDate.seconds%10)}}
						</view>
					</view>
					<view class="flex col_center mt20 f34" v-else>
						<view class="" style="height: 20rpx;">

						</view>
					</view>
				</view>
			</view>

			<view class="mt20" v-if="betAmount && betMultpile.length >0 && optionData">
				<!-- game box  -->

				<numBet ref="numBetRef" :titleInd="titleInd" :topData="topData" :userBalance="userBalance"
					:gameId="gameId" :showLoading="showLoading" @confirm="confirm" :betMultpile="betMultpile"
					:betAmount="betAmount" :optionData="optionData" :times="times" :bettingRule='bettingRule'
					:lock_time="lock_time"></numBet>
			</view>

			<view class="mt20 between recTypeBtn">
				<view :class="actTypeInd == 1?'actType':''" @click="actTypeInd == 2?changeRecType(1):''">
					{{t('win.w_i9')}}
				</view>
				<view :class="actTypeInd == 2?'actType':''" @click="actTypeInd == 1?changeRecType(2):''">
					{{t('win.w_i10')}}
				</view>
			</view>
		</view>
		<view class="botRecod mt30" v-if="actTypeInd == 1">
			<view class="tableHead">
				<view>{{t('win.w_i11')}}</view>
				<view>{{t('win.w_i12')}}</view>
				<view>{{t('win.w_i13')}}</view>
				<view>
					{{t('win.w_i14')}}
				</view>
			</view>
			<view class="tableBody">
				<view class="tableItem" v-for="item in recodData" :class="item !== recodData.length -1?'borderB':''">
					<view>{{item.number}}</view>
					<view :class="`resColor${item.res}`">{{item.prize_number}}</view>
					<view>{{item.prize_number>4?'Big':'small'}}</view>
					<view class="center ">
						<div class="center" v-if="item.prize_number == 0">
							<text class="dor numBg2"></text>
							<text class="dor ml10 numBg5"></text>
						</div>

						<div class="center" v-else-if="item.prize_number == 5">
							<text class="dor numBg1"></text>
							<text class="dor ml10 numBg5"></text>
						</div>
						<text class="dor" :class="`numBg${item.prize_number}`" v-else></text>
					</view>
				</view>

				<!-- 	<view class="mt40 center">
					<view class="center" style="width: 60rpx;height: 60rpx;"
						:style="page>1?{background:'#fb4e4e'}:{background:'#999'}" @click="page>1?changePage('cel'):''">
						<IconFont name="rect-left" color="#fff"></IconFont>
					</view>
					<view class="mglr40 f40">{{page}}</view>
					<view class="center" style="width: 60rpx;height: 60rpx;"
						:style="recodData.length==10?{background:'#fb4e4e'}:{background:'#999'}"
						@click="recodData.length==10?changePage('add'):''">
						<IconFont name="rect-right" color="#fff"></IconFont>
					</view>
				</view>

				<view style="height: 100rpx;"></view> -->
			</view>
		</view>


		<!-- 用户记录 -->
		<view class="userRec mt30" v-if="actTypeInd == 2">
			<view class="tableHead">
				<view class="userHead money">{{t('win.w_i11')}}</view>
				<view class="userHead">{{t('win.w_i15')}}</view>

				<view class="userHead">{{t('win.w_i12')}}</view>
				<view class="userHead">{{t('win.w_i17')}}</view>
				<view class="userHead money">{{t('win.w_i18')}}</view>
				<view class="userHead money">{{t('win.w_i19')}}</view>


				<view class="userHead money">{{t('win.w_i16')}}</view>
			</view>
			<view class="tableBody">
				<view class="usertableItem" v-for="item in recodData"
					:class="item !== recodData.length -1?'borderB':''">
					<view class="userTd money">{{item.gamePlay?.number}}
					</view>

					<view class="userTd">{{item.option?.name}}</view>

					<view class="userTd" :class="`num${item.gamePlay.prize_number}`">{{item.gamePlay?.prize_number}}
					</view>
					<view class="userTd" :class="item.type == 1?' pass':'error'">
						{{item.type == 0?'pending':item.type == 1?'win':'lose'}}
					</view>
					<view class="userTd  money">{{item.money}}</view>
					<view class="userTd money">{{item.service_charge}}
					</view>


					<view class="userTd money" :class="item.type == 1?' pass':'error'">
						{{item.type == 1?item.win_money:'0'}}
					</view>


				</view>
			</view>


		</view>
		<view class="mgtb40 center">
			<view class="center" style="width: 60rpx;height: 60rpx;"
				:style="page>1?{background:'#fb4e4e'}:{background:'#999'}" @click="page>1?changePage('cel'):''">
				<IconFont name="rect-left" color="#fff"></IconFont>
			</view>
			<view class="mglr40 f40">{{page}}</view>
			<view class="center" style="width: 60rpx;height: 60rpx;"
				:style="recodData.length==10?{background:'#fb4e4e'}:{background:'#999'}"
				@click="recodData.length==10?changePage('add'):''">
				<IconFont name="rect-right" color="#fff"></IconFont>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import minBox from '@/components/game/winRule/winRule.vue'
	import numBet from '@/components/game/numBet/numBet.vue'
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		showToast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide,
	} from "@dcloudio/uni-app";
	import {
		onMounted,
		onUnmounted
	} from 'vue';
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const showLoading = ref(null)
	const back = () => {
		history.back()
	}
	const timer = ref(null)
	const times = ref()
	const formDate = ref({
		minutes: 0,
		seconds: 0
	})
	const startTimer = () => {
		timer.value = setInterval(() => {
			formDate.value.minutes = parseInt(times.value / 60)
			formDate.value.seconds = times.value % 60
			if (times.value == 0) {
				clearInterval(timer.value)
				showLoading.value.loading = true
				setTimeout(() => {
					getCurrentData()
					if (actTypeInd.value == 1) {
						getRecord()
					} else {
						getUserRec()
					}
				}, 2000)
			} else {
				times.value--;
			}
		}, 1000)
	}

	const titleInd = ref(0) //游戏下标索引
	const lock_time = ref("")
	const getActInd = (data) => {
		titleInd.value = data.index
		optionId.value = data.item.id
		lock_time.value = data.item.lock_time
		showLoading.value.loading = true
		numBetRef.value.showBgMask = false
		getCurrentData(data.item.id)
	}
	const actTypeInd = ref(1)
	const recodData = ref([])
	const userBalance = ref(0)

	const topData = ref([])
	const numBetRef = ref(null)

	const betAmount = ref([])
	const betMultpile = ref([])
	const optionData = ref({})
	const bettingRule = ref("")
	// 获取游戏相关配置
	const getData = () => {
		request({
			url: 'game/game_board',
			method: 'get'
		}).then(res => {
			topData.value = res.game
			betAmount.value = res.amount.amount
			betMultpile.value = res.amount.multiple
			bettingRule.value = res.amount.bettingRule
			optionData.value = res.option
			optionId.value = res.game[0].id
			lock_time.value = res.game[0].lock_time
			getCurrentData()
			if (actTypeInd.value == 1) {
				getRecord()
			} else {
				getUserRec()
			}
			upDateUserBalance()
		})

		// 公告
		request({
			url: 'home/marquee',
			methods: 'get'
		}).then(res => {
			// res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content
		})
	}
	const periodTimes = ref('')
	const gameId = ref(0)
	const optionId = ref(0)
	const barText = ref("")
	// 获取当前游戏信息
	const getCurrentData = () => {
		request({
			url: 'game/game_play',
			method: 'get',
			data: {
				gameId: optionId.value
			}
		}).then(res => {
			if (timer.value) {
				clearInterval(timer.value)
			}
			startTimer()
			periodTimes.value = res.number
			times.value = res.rest_time
			gameId.value = res.id
			showLoading.value.loading = false
		})
	}

	const page = ref(1)

	// 获取记录
	const getRecord = () => {
		request({
			url: 'game/history',
			methods: 'get',
			data: {
				gameId: optionId.value,
				page: page.value
			}
		}).then(res => {
			try {
				showLoading.value.loading = false
			} catch (e) {
				//TODO handle the exception
			}
			recodData.value = res.data
		})
	}
	const jumpPage = (url) => {
		uni.navigateTo({
			url
		})
	}
	const getUserRec = () => {
		request({
			url: 'game/betting_log',
			methods: 'get',
			data: {
				size: '10',
				page: page.value
			}
		}).then(res => {
			showLoading.value.loading = false
			recodData.value = res.data
		})
	}
	const changeRecType = (item) => {
		page.value = 1
		recodData.value = []
		showLoading.value.loading = true
		actTypeInd.value = item
		if (actTypeInd.value == 1) {
			getRecord()
		} else {
			getUserRec()
		}
	}
	const confirm = data => {
		data.periodId = gameId.value
		showLoading.value.loading = true
		request({
			url: 'game/betting',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			showToast.text(t('win.w_i20'))
			upDateUserBalance()
			numBetRef.value.showBasic = false
		}).catch(err => {
			showToast.text(err.message)
			showLoading.value.loading = false
			numBetRef.value.showBasic = false
		})
	}
	const changePage = item => {

		showLoading.value.loading = true
		if (item == 'cel') {

			page.value -= 1
		} else if (item == 'add') {
			page.value += 1
		}

		if (actTypeInd.value == 1) {
			getRecord()
		} else {
			getUserRec()
		}
	}

	const upDateUserBalance = () => {
		showLoading.value.loading = true
		request({
			url: 'user/balance',
			method: 'get'
		}).then(res => {
			showLoading.value.loading = false
			userBalance.value = res.balance
		}).catch(err => {
			showLoading.value.loading = false
		})
	}
	// 终于可以用了
	onMounted(async () => {
		if (timer.value) {
			clearInterval(timer.value)
		}
		showLoading.value.loading = true
		getData()
	})
	const audioValue = ref("")
	const bofang = () => {
		audioValue.value = uni.createInnerAudioContext();
		audioValue.value.autoplay = true; //自动播放
		audioValue.value.loop = true; //循环播放
		audioValue.value.src = '/static/audio/di1.mp3';
		audioValue.value.onPlay()
		setTimeout(() => {
			audioValue.value._stoping = true
			audioValue.value.autoplay = false; //自动播放
			audioValue.value.loop = false; //循环播放
			audioValue.value.onPause()
			audioValue.value.src = '/static/audio/di2.mp3';
			audioValue.value.autoplay = true; //自动播放
			audioValue.value.loop = true; //循环播放
			audioValue.value.onPlay()
			setTimeout(() => {
				audioValue.value._stoping = true
				audioValue.value.autoplay = false; //自动播放
				audioValue.value.loop = false; //循环播放
				audioValue.value.onPause()
			}, 10)
		}, 4000)
		// innerAudioContext.onPlay(
		// 	() => {

		// 		this.playing = !innerAudioContext.paused
		// 		//可以播放事件console.log('开始播放');this.playing = !innerAudioContext.paused;//查看是否可以自动播放
		// 	});
		// innerAudioContext.onError((res) => {
		// 	console.log(res.errMsg);
		// 	console.log(res.errCode);
		// });
	}

	onShow(() => {
		if (optionId.value > 0) {
			getCurrentData()
			if (actTypeInd.value == 1) {
				getRecord()
			} else {
				getUserRec()
			}
			upDateUserBalance()

		}
	})
	// onHide(() => {
	// 	if (timer.value) {
	// 		clearInterval(timer.value)
	// 	}
	// })
	onUnmounted(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
</script>

<style lang="scss" scoped>
	.botRecod {
		.tableHead {
			background-color: #fbedf3;
			padding: 20rpx;
			display: flex;

			view {
				width: 22%;
				text-align: center;
				font-weight: bold;
			}

			view:nth-child(1) {
				width: 34%;
			}
		}

		.tableBody {
			background-color: #fff;

			.tableItem {
				display: flex;
				justify-content: space-between;
				align-items: center;

				padding: 5rpx 20rpx;
				font-size: 24rpx;

				view {
					text-align: center;
					width: 22%;
					padding: 20rpx;
				}

				view:nth-child(1) {
					width: 34%;
				}

				.dor {
					width: 20rpx !important;
					height: 20rpx !important;
					border-radius: 50%;
				}
			}





		}
	}



	.userRec {
		width: 100%;
		overflow-x: scroll;
		background-color: #fff;



		.tableHead {
			background-color: #fbedf3;
			padding: 20rpx;
			display: flex;
			width: 1300rpx;

			.userHead {
				width: 150rpx;
				font-weight: bold;
				position: relative;
				text-align: center;
			}

			.money {
				width: 250rpx;
			}
		}

		.tableBody {
			width: 100%;
			width: 100%;

			.usertableItem {
				padding: 20rpx;
				display: flex;
				width: 1300rpx;

				.userTd {
					width: 150rpx;
					position: relative;
					text-align: center;
				}

				.money {
					width: 250rpx;
				}

			}



		}
	}

	.recTypeBtn {
		view {
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 10rpx;
			border: .02667rem solid #3c5ef6;
			background-color: #eaeefc;
			font-size: 28rpx;
		}

		.actType {
			border: .02667rem solid #fb4e4e;
			background-color: #fbedf3;
			color: #fb4e4e;
		}
	}

	.perBox {
		background: linear-gradient(90deg, #cd0103, #f64841);
		box-shadow: 0 0 0.21333rem 0.02667rem rgba(187, 191, 205, .3);
		border-radius: 20rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;
		margin-top: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;

		.mglr5 {
			padding: 5rpx 10rpx;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			height: 100%;
		}
	}

	page {
		background-color: #f5f5f5;
	}

	.topBox {
		background: url('/src/static/images/bg_top_red.webp') no-repeat 100%/100%;
		padding: 20rpx 30rpx;
		margin-top: -5rpx;
		border-radius: 0 0 30% 30%;
		height: 500rpx;

		.balanceBox {
			margin-top: 40rpx;
			padding: 30rpx 20rpx;
			background-color: #fff;
			border-radius: 30rpx;

			.between {
				.btns {
					width: calc(48% - 80rpx);
					padding: 20rpx 40rpx;
					text-align: center;
					border-radius: 10rpx;
					color: #fff;
				}

				.btns:nth-child(1) {
					background-color: #ffce1f;
					box-shadow: 0 0 0.26667rem 0.02667rem rgba(255, 206, 31, .4);
				}

				.btns:nth-child(2) {
					background-color: #f2413b;
					box-shadow: 0 0 0.26667rem 0.02667rem rgba(242, 65, 59, .27);
				}
			}
		}
	}

	.numBg1,
	.numBg3,
	.numBg7,
	.numBg9,
		{
		background-color: #5cba47;
		color: #5cba47;
	}

	.numBg2,
	.numBg4,
	.numBg6,
	.numBg8,
		{
		background-color: #fb4e4e;
		color: #fb4e4e;
	}

	.numBg5 {
		background-color: #db5fd1;
		color: #db5fd1;
	}



	.num1,
	.num3,
	.num7,
	.num9,
		{
		color: #5cba47;
	}

	.num2,
	.num4,
	.num6,
	.num8,
		{
		color: #fb4e4e;
	}

	.num5 {
		color: #5cba47;
	}

	.num0 {
		color: #db5fd1;
	}
</style>
