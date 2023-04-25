<template>
	<view class="bgWhite">
		<view class="bgCcc  " v-if="showBgMask">
			<view class="mglr5">{{parseInt(tempTimes)<10?'0':parseInt(tempTimes/10)}}</view>
			<view class="mglr5">
				{{parseInt(tempTimes)<10?tempTimes :parseInt(tempTimes%10) }}
			</view>


		</view>

		<view class="flex between " style="flex-wrap: wrap;">

			<view v-for="(item,index) in listData" class="topItem" @click="addItem(item)" :style="selectList.includes(item)?ChoStyle:''">
				<view class="f28">{{item.name}}</view>
				<view class="mt5 f20 textHiddenOne"  >The Odds{{item.show_odds}}</view>
				
				<IconFont name="Check" v-if="selectList.includes(item)"
					class="phoneCheck animate__animated animate__fadeIn " color="#f4453f"></IconFont>
			</view>

		</view>



		<view class="betMask animate__animated animate__slideInUp  " v-show="showBasic">
			<view class="maskContent ">
				<view class="pdlr20 pdtb20 mt20">

					<view class="flex   mb20">
						<view class=" flex col_center" style="flex: 1; flex-wrap: wrap;">
							<view class=" mr40 nameItem" style=";padding: 5rpx 0 ;">choosed</view>
							<view v-for="(item,index) in selectList" class="nameItem  nameItem1" >{{item.name}}</view>
						</view>
					</view>
					<view class="flex row_center ">
						<view class="center" style="width:100rpx">{{t('mine.m_t11')}}</view>
						<view class="ml30 flex " style="flex: 1; flex-wrap: wrap;">
							<view v-for="(item,index) in amountList" class="amoutItem"
								:style="amountListInd == index ?{background:maskColorStyle.mainColor,color:'#fff'}:''"
								@click="amountListInd = index">{{item}}</view>
						</view>
					</view>

					<view class="between  mt30">
						<view>{{t('win.w_i3')}}</view>
						<view class="flex col_center">
							<view class="celBtn"
								:style="multiple>1?{background:maskColorStyle.mainColor}:{background:'#999'}"
								@click="parseInt(multiple) >1?multiple -=1:''">
								<IconFont name="minus" size="26" color="#fff"></IconFont>
							</view>
							<view style="width: 100rpx;border: 1rpx solid #ccc;margin: 0 20rpx;height: 60rpx;">
								<input type="number" v-model="multiple"
									style="text-align: center;height: 60rpx;font-weight: bold;">
							</view>
							<view class="addBtn">
								<IconFont name="plus" size="26" color="#fff"
									:style="{background:maskColorStyle.mainColor}" @click="multiple +=1"></IconFont>
							</view>
						</view>
					</view>

					<view class="flex col_center mt40">
						<view style="width: 100rpx;"></view>
						<view class="ml30 flex col_center" style="flex: 1; flex-wrap: wrap;">
							<view v-for="(item,index) in numList" class="amoutItem mb20"
								:style="numInd == index ?{background:maskColorStyle.mainColor,color:'#fff'}:''"
								@click="changeMultiple(item,index)">X{{item}}</view>
						</view>
					</view>

					<view class="mt30 flex">
						<view :style="{background:maskColorStyle.mainColor}" style="width: 40rpx;height: 40rpx;">
							<IconFont name="Check" v-if="checked" color="#fff"></IconFont>
						</view>
						<view class="ml20">
							{{t('win.w_i4')}}
							<text :style="{color:maskColorStyle.mainColor}"
								@click="showRule = true">{{t('win.w_i5')}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="flex mt40">
				<view style="width: 250rpx;" class="text_center maskBtns" @click="closeMask">
					{{t('all.a_c1')}}
				</view>
				<view style="flex: 1;" class="text_center maskBtns" :style="{background:maskColorStyle.mainColor}"
					@click="submitHandle">
					{{t('win.w_i6')}} {{amountList[amountListInd] * multiple * selectList.length}}
				</view>
			</view>
		</view>

		<nut-popup :style="{ padding: '0 0' }" v-model:visible="showRule" :close-on-click-overlay="true" :round="true">
			<view style="width: 600rpx;" class="ruleMask ">
				<view class="maskHead text_center text_white pdtb20"> {{t('add1.a_a6')}}</view>
				<view style="height: 600rpx; width: 540rpx; overflow: scroll;" class=" pdlr30 pt20 ">
					<view v-html="saleRule"></view>
				</view>
				<view class="mt20 flex center">
					<view class="maskBtns2" @click="showRule = false">{{t('add1.a_a5')}}</view>
				</view>
			</view>
		</nut-popup>


		<Loading ref="showLoading"></Loading>
	</view>
</template>


<script>
	import {
		defineComponent
	} from 'vue';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		showToast
	} from '@nutui/nutui';
	import {
		userStore
	} from "@/store/themeNum.js";
	export default defineComponent({
		props: ['titleInd', 'topData', 'userBalance', 'gameId', 'showLoading', 'betMultpile', 'betAmount',
			'optionData', 'times', 'bettingRule', 'lock_time','listData'
		],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const topData = ref([])

			const titleInd = ref(0)
			const times = ref(props.times)

			const numInd = ref(0)
			const numList = ref(props.betMultpile)

			const sizeData = ref(props.optionData.size)
			const numberData = ref(props.optionData.number)
			const colorData = ref(props.optionData.color)
			const showBasic = ref(false) //下注弹窗

			const maskColorStyle = ref({
				mainColor: "#fa574a", //主要颜色
			})

			const chooseNum = ref("")
			// const optionId = ref("")
			const openBetMask = item => {
				if (props.gameId == -1) {
					return false
				}
				if (jinYong.value) {
					return false
				}


				chooseNum.value = item.name
				optionId.value = item.id
				titleInd.value = props.titleInd
				topData.value = props.topData
				showBasic.value = true
			}
			const jinYongStyle = ref({
				background: '#ccc',
				'box-shadow': 'none'
			})
	
			const amountList = ref([
				'100',
				'1000',
				'10000',
				'10000',
			])

			const saleRule = props.bettingRule

			const amountListInd = ref(0)
			const multiple = ref(1)
			const checked = ref(true)
			const showRule = ref(false)

			const changeMultiple = (item, ind) => {
				numInd.value = ind
				multiple.value = item
			}

			const showLoading = ref(null)

			const submitHandle = () => {
				let amount = amountList.value[amountListInd.value] * multiple.value

				if (amount > props.userBalance) {
					showToast.text('Insufficient balance, please recharge')
					return false
				}
				let ids = selectList.value.map(item=>{
					return item.id
				})
				const data = {
					// periodId: props.gameId,
					optionId:ids,
					amount: amount * selectList.value.length
				}
				selectList.value = []
				emit('confirm', data)
			}
			const jinYong = ref(false)
			const tempTimes = ref("")
			// 监听倒计时
			watch(props, (oldVal, newVal) => {
				if (oldVal.times < props.lock_time) {
					showBgMask.value = true
					tempTimes.value = oldVal.times + 1
					showBasic.value = false
					showRule.value = false
					jinYong.value = true
					if (oldVal.times == 0) {
						showBgMask.value = false
					}
				} else {
					showBgMask.value = false
					jinYong.value = false
				}
			})
			const showBgMask = ref(false)
			watch(multiple, (newVal, oldVal) => {
				numInd.value = -1
				numList.value.forEach((item, index) => {
					if (newVal == item) {
						numInd.value = index
					}
				})
			})

			// 选中数组
			const selectList = ref([])
			// 区块数据
			const listData = props.listData
			
			const addItem = item => {
				if (selectList.value.includes(item)) {
					if (selectList.value.length == 1) {
						selectList.value = []
						showBasic.value = false
						return false
					} else {
						selectList.value.splice(selectList.value.indexOf(item), 1);
						return false
					}
				}
				selectList.value.push(item)

				showBasic.value = true
			}
			const closeMask = () => {
				selectList.value = []
				showBasic.value = false
			}
			const ChoStyle = {
				'color':'#fff',
				'background':'#ccc'
			}
			return {
				numList,
				numInd,
				maskColorStyle,
				amountListInd,
				amountList,
				showBasic,
				multiple,
				saleRule,
				checked,
				showRule,
				openBetMask,
				titleInd,
				topData,
				showBgMask,
				tempTimes,
				chooseNum,
				submitHandle,
				numberData,
				sizeData,
				jinYong,
				colorData,
				times,
				t,
				ChoStyle,
				closeMask,
				jinYongStyle,
				listData,
				selectList,
				addItem,
				changeMultiple

			}
		},
	})
</script>

<style lang="scss" scoped>
	.topItem {
		width: 24%;
		text-align: center;
		background-color: #eee;
		color: #a38fac;
		padding: 15rpx 0;
		font-size: 20rpx;
		height: 70rpx;
		white-space: nowrap;
		margin-bottom: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.phoneCheck{
		position: absolute;
		top: 5rpx;
		right: 10rpx;
	}

	.ruleMask {
		.maskHead {
			background: #f74345 url('static/images/Rule-bg.webp') no-repeat 100%/100%;
			// height: 60rpx;
		}

		.maskBtns2 {
			background-color: rgb(242, 65, 59);
			color: #fff;
			padding: 20rpx 60rpx;
			margin-bottom: 20rpx;
			border-radius: 40rpx;
			min-width: 180rpx;
			text-align: center;
		}
	}

	.maskBtns {
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
	}

	.maskBtns:nth-child(1) {
		background-color: #25253c;
		color: #ccc;
	}

	.betMask {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		left: 0;
		width: 100%;
		z-index: 999;
		border-radius: 60rpx 60rpx 0 0;
		box-shadow: 0 -0.26667rem 0.53333rem 0 rgba(63, 69, 83, .3);

		.maskContent {
			width: 100%;
			overflow: hidden;

			.addBtn,
			.celBtn {
				width: 60rpx;
				height: 60rpx;
				// border: 1rpx solid #ccc;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.topBox {
				padding: 40rpx 80rpx 80rpx 80rpx;
				position: relative;

				.leftMask,
				.rightMask {
					width: 70%;
					position: absolute;
					background-color: #fff;
					height: 100rpx;
				}

				.leftMask {
					bottom: -80rpx;
					left: -60rpx;
					transform-origin: right;
					transform: rotateZ(9deg);
				}

				.rightMask {
					bottom: -80rpx;
					right: -60rpx;
					transform-origin: left;
					transform: rotateZ(-9deg);
				}
			}

			.amoutItem {
				background: rgba(0, 0, 0, .4);
				padding: 10rpx 20rpx;
				margin-left: 10rpx;
				color: #fff;
				border-radius: 30rpx;
				margin-bottom: 20rpx;
			}

			.nameItem {
				border-radius: 10rpx;
				padding: 5rpx 0;
				width: 100rpx;
				text-align: center;
				margin-bottom: 20rpx;
			}

			.nameItem1 {
				margin-right: 10rpx;
				color: #fff;
				background: rgba(0, 0, 0, .4);
			}
		}
	}


	.bgCcc {
		position: absolute;
		width: calc(100% - 10rpx);
		left: 0;
		top: 0;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		z-index: 999;
		.mglr5 {
			height: 400rpx;
			width: 200rpx;
			text-align: center;
			font-size: 160rpx;
			line-height: 400rpx;
			background: rgba(31, 174, 104, 0.9);
			border-radius: 20rpx;
		}
	}

	.bgWhite {
		background-color: #fff;
		padding: 20rpx 0;
		position: relative;

		.btnCho {
			view {
				width: 50%;
				padding: 20rpx 0;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
			}

			view:nth-child(1) {
				background-color: #ffc511;
				border-radius: 1.06667rem 0 0 1.06667rem;
				box-shadow: 0 0 0.21333rem 0.02667rem rgba(255, 197, 17, .47)
			}

			view:nth-child(2) {
				background-color: #5cba47;
				border-radius: 0 1.06667rem 1.06667rem 0;
				box-shadow: 0 0 0.21333rem 0.02667rem rgba(92, 186, 71, .72)
			}
		}

		.random {
			padding: 10rpx;
			border: 1rpx solid #fb4e4e;
			border-radius: 20rpx;
		}

		.randomNumItem {
			width: 100%;
			padding: 10rpx 0;
			text-align: center;
			border: 1rpx solid #5cba47;
			background-color: rgb(240, 240, 240);
			border-radius: 20rpx;
		}

		.actNumItem {
			background-color: #5cba47;
			color: #fff;
			border-color: none;
		}

		.typeList {
			view {
				width: 30%;
				text-align: center;
				color: #fff;
				padding: 20rpx 0;

			}

			view:nth-child(1) {
				background-color: #5cba47;
				border-radius: 0 20rpx 0 20rpx;
				box-shadow: 0 0 0.21333rem 0.02667rem rgba(92, 186, 71, .72);
			}

			view:nth-child(2) {
				background-color: #db5fd1;
				border-radius: 10rpx;
				box-shadow: 0 0 0.21333rem 0.02667rem rgba(219, 95, 209, .58);
			}

			view:nth-child(3) {
				background-color: #fb4e4e;
				border-radius: 20rpx 0 20rpx 0;
				box-shadow: 0 0 0.21333rem 0.02667rem rgba(251, 78, 78, .6);
			}
		}

		.numBet {
			padding: 20rpx 20rpx;
			background-color: #fbedf3;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.items {
				border-radius: 50%;
				width: 110rpx;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 40rpx;
				font-weight: bold;
			}

			.num0 {
				background: linear-gradient(to bottom right, #fb4e4e 50%, #eb43dd 0);
			}

			.num1,
			.num3,
			.num7,
			.num9 {
				background: #5cba47;
			}

			.num2,
			.num4,
			.num6,
			.num8 {
				background: #fb4e4e;
			}

			.num5 {
				background: linear-gradient(to bottom right, #5cba47 50%, #eb43dd 0);
			}

			// .borderNum0,.borderNum2,.borderNum4,.borderNum6,.borderNum8 {
			// 	border: 1rpx solid #fb4e4e;
			// 	border-radius: 50%;
			// }

			// .borderNum1,.borderNum3,.borderNum5,.borderNum7,.borderNum9 {
			// 	border: 1rpx solid #5cba47;
			// 	border-radius: 50%;
			// }
		}
	}
</style>
