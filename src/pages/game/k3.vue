<template>
	<view>
		<view class="pagePad between  nav">
			<view style="width: 50rpx;height: 50rpx;">
				<image src="/static/images/back.png" style="width: 100%;height: 100%;" @click="back"></image>
			</view>
			<view>
				<image :src="COUNTRY.indexLogo" style="width: 320rpx;height: 80rpx;"></image>
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

			<!-- Rule -->
			<view class=" mt20" v-if="topData.length >0">
				<minBox @changeActInd="getActInd" :topData="topData"></minBox>
			</view>

		</view>

		<view class=" pdlr30">
			<view class=" perBox ">
				<view>
					<view class="f20">{{t('win.w_i7')}}</view>
					<!-- <view class="text_bold f34 mt20">{{periodTimes}}</view> -->
					<view class="text_bold f34 mt20">12312631231</view>
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

			<view class="shazi">
				<image :src="shaiziList[firstInd]" style="width: 140rpx;height: 150rpx;"></image>
				<image :src="shaiziList[secondInd]" style="width: 140rpx;height: 150rpx;"></image>
				<image :src="shaiziList[thirdInd]" style="width: 140rpx;height: 150rpx;"></image>
			</view>

			<!-- 	<view class="btns" style="background-color: skyblue;text-align: center;height: 100rpx;line-height: 100rpx;"
				@click="jump">
				open
			</view> -->

			<view class="mt20" v-if="betAmount && betMultpile.length >0 && optionData && listData.length>0">
				<!-- game box  -->

				<numBet ref="numBetRef" :titleInd="titleInd" :topData="topData" :userBalance="userBalance"
					:gameId="gameId" :showLoading="showLoading" @confirm="confirm" :betMultpile="betMultpile"
					:betAmount="betAmount" :optionData="optionData" :times="times" :bettingRule='bettingRule'
					:lock_time="lock_time" :listData="listData"></numBet>


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

		<!-- period rec -->
		<view class="botRecod mt30" v-if="actTypeInd == 1">
			<view class="tableHead">
				<view>{{t('win.w_i11')}}</view>
				<view>{{t('add1.a_a10')}}</view>
				<view>{{t('win.w_i13')}}</view>
				<view>Odd/Even</view>
				<view>
					{{t('win.w_i12')}}
				</view>
			</view>
			<view class="tableBody">
				<view class="tableItem" v-for="item in recodData" :class="item !== recodData.length -1?'borderB':''">
					<view>{{item.number}}</view>
					<view :class="`resColor${item.res}`">{{item.prize_number}}</view>
					<view>{{item.prize_number>10?'Big':'small'}}</view>
					<view>{{item.s_d%2==0?'Even':'Odd'}}</view>
					<view>
						<!-- {{item.prize_number_detail[0]}}
						{{item.prize_number_detail[1]}}
						{{item.prize_number_detail[2]}} -->
						<image :src="recList[item.prize_number_detail[0] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;"></image>
						<image :src="recList[item.prize_number_detail[1] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;" class="mglr10"></image>
						<image :src="recList[item.prize_number_detail[2] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;"></image>
					</view>
				</view>
			</view>
		</view>


		<!-- user rec -->
		<view class="userRecEl mt30" v-if="actTypeInd == 2">
			<view class="tableHead">
				<view class="userHead w35">{{t('win.w_i11')}}</view>
				<view class="userHead">Total</view>
				<view class="userHead w35">{{t('win.w_i15')}}</view>
				<view class="userHead w35">{{t('win.w_i12')}}</view>
				<view class="userHead">{{t('win.w_i17')}}</view>
				<view class="userHead w35">{{t('win.w_i18')}}</view>
				<view class="userHead w35">{{t('win.w_i19')}}</view>
				<view class="userHead w35">{{t('win.w_i16')}}</view>
			</view>
			<view class="tableBody">
				<view class="usertableItem" v-for="item in userData" :class="item !== userData.length -1?'borderB':''">
					<view class="userTd w35">{{item.gamePlay?.number}}
					</view>
					<view class="userTd">{{item.gamePlay?.prize_number?item.gamePlay?.prize_number:'--'}}</view>
					<view class="w35">
						{{item.option.name}}
					</view>
					<view class="w35 userTd">
						<image :src="recList[item.gamePlay.prize_number_detail[0] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;"></image>
						<image :src="recList[item.gamePlay.prize_number_detail[1] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;" class="mglr10"></image>
						<image :src="recList[item.gamePlay.prize_number_detail[2] -1]" mode="widthFix"
							style="width: 40rpx;height: 40rpx;"></image>
					</view>
					<view class="userTd" :class="item.type == 1?' pass':'error'">
						{{item.type == 0?t('add1.a_a7'):item.type == 1?t('add1.a_a8'):t('add1.a_a9')}}
					</view>
					<view class="userTd  w35">{{item.money}}</view>
					<view class="userTd w35">{{item.service_charge}}
					</view>
					<view class="userTd w35" :class="item.type == 1?' pass':'error'">
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

		<view style="height: 500rpx;" v-if="numBetRef?.showBasic"></view>
	</view>
</template>

<script setup>
	import COUNTRY from '../../../setting.js';
	import request from '../../../comm/request.ts';
	import minBox from '@/components/game/winRule/winRule.vue'
	import numBet from '@/components/game/k3/numBet.vue'
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

	const firstInd = ref(-1) // 0-5 1-6
	const secondInd = ref(-1)
	const thirdInd = ref(-1)
	const userData = ref([])
	const shaiziList = ref([
		'/static/images/bg1.png',
		'/static/images/bg2.png',
		'/static/images/bg3.png',
		'/static/images/bg4.png',
		'/static/images/bg5.png',
		'/static/images/bg6.png',
	])

	const recList = [
		'/static/k3/rec1.png',
		'/static/k3/rec2.png',
		'/static/k3/rec3.png',
		'/static/k3/rec4.png',
		'/static/k3/rec5.png',
		'/static/k3/rec6.png',
	]
	const shaiziTimer = ref(null)
	const jump = (firV, secV, thiV) => {

		shaiziTimer.value = setInterval(() => {
			while (Math.floor(Math.random() * 6) !== firstInd.value) {
				firstInd.value = Math.floor(Math.random() * 6)
			}
			while (Math.floor(Math.random() * 6) !== secondInd.value) {
				secondInd.value = Math.floor(Math.random() * 6)
			}
			while (Math.floor(Math.random() * 6) !== thirdInd.value) {
				thirdInd.value = Math.floor(Math.random() * 6)
			}
		}, 50)
		setTimeout(() => {

			clearInterval(shaiziTimer.value)
			firstInd.value = firV
			secondInd.value = secV
			thirdInd.value = thiV
		}, 3000)
	};

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
					getBotRecord('zhuan', 1)
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
	const actTypeInd = ref(2)
	const recodData = ref([])
	const userBalance = ref(0)

	const topData = ref([])
	const numBetRef = ref(null)

	const betAmount = ref([])
	const betMultpile = ref([])
	const optionData = ref({})
	const bettingRule = ref("")

	const listData = ref([])
	// 获取游戏相关配置
	const getData = () => {
		request({
			url: 'k3/game_board',
			method: 'get'
		}).then(res => {
			// rule
			topData.value = res.game

			betAmount.value = res.amount.amount
			betMultpile.value = res.amount.multiple
			bettingRule.value = res.amount.bettingRule
			optionData.value = res.option
			optionId.value = res.game[0].id
			lock_time.value = res.game[0].lock_time
			listData.value = [...res.option.number, ...res.option.sd, ...res.option.size]
			getCurrentData()
			getBotRecord()
		}).catch(err => {
			showLoading.value.loading = false
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
	const gameId = ref(-1)
	const optionId = ref(0)
	const barText = ref("")
	// 获取当前游戏信息
	const getCurrentData = () => {
		request({
			url: 'k3/game_play',
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
	const getRecord = (item, flag) => {

		request({
			url: 'k3/history',
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

			if (item == 'zhuan') {
				jump(res.data[0].prize_number_detail[0] - 1, res.data[0].prize_number_detail[1] - 1,
					res.data[0].prize_number_detail[2] - 1)
				if (flag !== 1) {
					setTimeout(() => {
						recodData.value = res.data
					}, 3500)
				}

			} else {
				recodData.value = res.data
				firstInd.value = recodData.value[0].prize_number_detail[0] - 1
				secondInd.value = recodData.value[0].prize_number_detail[1] - 1
				thirdInd.value = recodData.value[0].prize_number_detail[2] - 1
			}
		})
	}
	const jumpPage = (url) => {
		uni.navigateTo({
			url
		})
	}
	const getUserRec = () => {
		request({
			url: 'k3/betting_log',
			methods: 'get',
			data: {
				size: '10',
				page: page.value
			}
		}).then(res => {
			showLoading.value.loading = false
			userData.value = res.data
		})
	}
	const changeRecType = (item) => {
		page.value = 1
		recodData.value = []
		userData.value = []
		showLoading.value.loading = true
		actTypeInd.value = item
		getBotRecord('zhuan1', 2)
	}
	const confirm = data => {
		data.periodId = gameId.value
		showLoading.value.loading = true
		request({
			url: 'k3/betting',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			showToast.text(t('win.w_i20'))
			upDateUserBalance()
			getBotRecord()
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

		getBotRecord()
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

	const getBotRecord = (item, flag) => {
		if (actTypeInd.value == 1) {
			getRecord(item)
		} else {
			getUserRec()
			getRecord(item, flag)
		}
	}

	// 终于可以用了
	onMounted(async () => {
		if (timer.value) {
			clearInterval(timer.value)
		}

		showLoading.value.loading = true
		getData()
		upDateUserBalance()
	})


	onShow(() => {
		if (optionId.value > 0) {
			getCurrentData()
			getBotRecord()
			upDateUserBalance()
		}
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onUnmounted(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
</script>

<style lang="scss" scoped>
	page {
		background: #fff !important;
	}


	.userRecEl {
		width: 100%;
		overflow-x: scroll;
		background-color: #fff;



		.w35 {
			width: 250rpx !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		$userWidth:1500rpx;

		.tableHead {
			background-color: #fbedf3;
			padding: 20rpx;
			display: flex;
			width: $userWidth;

			.userHead {
				width: 150rpx;
				font-weight: bold;
				position: relative;
				text-align: center;
			}

		}

		.tableBody {
			width: 100%;
			width: 100%;

			.usertableItem {
				padding: 20rpx;
				display: flex;
				align-items: center;
				width: $userWidth;

				.userTd {
					width: 150rpx;
					position: relative;
					text-align: center;
				}


			}



		}
	}

	.shazi {
		display: flex;
		justify-content: center;
		margin: 30rpx 0;
		justify-content: space-between;
		height: 200rpx;
		align-items: center;
		padding: 0 80rpx;
	}

	.botRecod {
		font-size: 26rpx;

		.tableHead {
			background-color: #fbedf3;
			padding: 20rpx;
			display: flex;

			view {
				width: 20%;
				text-align: center;
				font-weight: bold;
			}

			view:nth-child(1),
			view:nth-child(5) {
				width: 25%;
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
					width: 20%;
					padding: 20rpx 0;
				}

				view:nth-child(1),
				view:nth-child(5) {
					width: 25%;
				}

				.dor {
					width: 20rpx !important;
					height: 20rpx !important;
					border-radius: 50%;
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
		box-shadow: 0 0 0.21333rem 0.02667rem rgba(187, 191, 205, .3);
		border-radius: 20rpx;
		background-color: #f5f5f5;
		padding: 20rpx 30rpx;
		margin-top: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;

		.mglr5 {
			padding: 5rpx 10rpx;
			background: rgba(0, 0, 0, 0.1);
			color: #00b977;
			height: 100%;
			font-weight: bold;
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
</style>
