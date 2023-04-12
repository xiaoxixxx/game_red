<template>
	<view>
		<topNav :title="t('recharge.r_r1')" :goBackNum="2"></topNav>
		<view class="pdlr45 mt70">

			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box">
					<view class="f26 flex  col_center">
						{{t('recharge.r_o1')}}: <text class="pl10 f34" :style="{'color':'#DB1825'}">{{showTime}}</text>
					</view>
					<view class="mt34  flex-wrap between">
						<view class="items ">
							<view class="iTitle ">{{t('recharge.r_o2')}}</view>
							<view :style="topItemStyle">{{pageData.order_no}}</view>
						</view>

						<view class="items ">
							<view class="iTitle ">{{t('recharge.r_o3')}}</view>
							<view :style="topItemStyle">{{pageData.amount}}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle ">{{t('recharge.r_o4')}}</view>
							<view :style="topItemStyle">
								{{t('recharge.r_o5')}}
							</view>
						</view>
						<view class="items topLine">
							<view class="iTitle ">USDT</view>
							<!-- <view :style="topItemStyle">{{pageData.amount ?((pageData.amount) * rate).toFixed(2):0 }}</view> -->
							<view :style="topItemStyle">{{pageData.amount ?((pageData.amount) * rate).toFixed(2):0 }}
							</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-for="(item,index) in typeList"
							:style="typeInd== index?choStyle:''" @click="changeCode(index)">{{item.name}}</view>
						<!-- <view class="mglr20 typeItem" :style="choStyle">TRC20</view> -->
					</view>
					<qrcode-vue :value="addresData" v-if="addresData" :size="163" level="H" />

					<view class="mt35 f26">
						{{t('recharge.r_o6')}}
					</view>
					<view class="mt23 f22 addEl" @click="copyHandle(addresData)">
						{{addresData}}
					</view>
				</view>

				<view class="btns mt78" :style="noStyle" style="box-shadow: none;background-color: #fff;"
					@click="cancleOrder">
					{{t('recharge.r_o7')}}
				</view>
				<view class="btns mt22" :style="choStyle" @click="changePage(pageData.order_no)">
					{{t('recharge.r_r6')}}
				</view>
			</view>

		</view>

		<view style="height: 100rpx;"></view>

		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('all.a_t1')}}</view>
					<view class="f30 mt40">
					{{t('recharge.r_o8')}}
					</view>
					<view class="between">
						<view :style="{border: '1rpx solid' +store.$state.contentColor,color:'#333'}">{{t('all.a_c1')}}</view>
						<view :style="{background:store.$state.contentColor}" @click="confirmHandle"> {{t('all.a_c2')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import useClipboard from 'vue-clipboard3'
	import QrcodeVue from 'qrcode.vue'
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const {
		toClipboard
	} = useClipboard()


	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		border: 'none'
	}
	const noStyle = {
		color: store.$state.contentColor,
	}
	const topItemStyle = {
		color: "#FFA115",
		marginTop: '23rpx'
	}

	const timer = ref(null)
	const showTime = ref("")
	const times = ref(0)
	const showLoading = ref(false)
	const cancleHandlemMask = ref(false)
	const typeList = [{
		name: 'TRC20'
	}, ]
	const typeInd = ref(0)
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_c4'))
		} catch (e) {
			console.error(e)
		}
	}

	const changeTime = (num) => {
		let minute = parseInt(num / 60)
		let second = num % 60
		showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
	}
	// 开始时间减减

	const startTimer = () => {
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
				confirmHandle()
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)
	}
	
	const changePage = url =>{
		
		if(!uploadTxid.value){
			uni.navigateTo({
				url: "../tabbar/index"
			})
		}else{
		jumpPage('./txid?order='+url)
		}
		
		
	}
// res.type == 1?uploadTxid.value = false:uploadTxid.value = true
	const cancleOrder = () => {
		cancleHandlemMask.value = true

	}
	const confirmHandle = () => {
		showLoading.value.loading = true
		request({
			url: 'finance/usdt/recharge/cancel',
			methods: 'post',
			data: {
				order_no: pageData.value.order_no
			}
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('all.a_c5'))
			uni.navigateTo({
				url: '../tabbar/index'
			})
		}).catch(err => {
			Toast.text(err.message)
		})
	}

	const jumpPage = (url) => {
		uni.navigateTo({
			url
		})
	}
	
	const pageData = ref({})
	const addresData = ref("")
	const uploadTxid = ref(false)
	const rate = ref(1)
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				history.back()
				return false
			}
			addresData.value = res.address
			pageData.value = res.order
			res.type == 1 ? uploadTxid.value = false : uploadTxid.value = true
			rate.value = res.rate
			if (timer.value) {
				clearInterval(timer.value)
			}
			times.value = res.order.expire_time
			startTimer()
		})
	}

	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	// 终于可以用了
	onShow(() => {
		getData()

	})
</script>

<style lang="scss">
	.btns {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 20rpx;
	}

	.top_box {
		padding: 35rpx 40rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.items {
			width: 48%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 140rpx;
			font-size: 24rpx;
			background-color: #FFF8EB;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
		}

		.flex-wrap {
			flex-wrap: wrap;
		}
	}

	.addressBox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 27rpx 71rpx 48rpx 71rpx;
		border-radius: 30rpx;
		background-color: #fff;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addEl {
			color: #FFA115;
			height: 60rpx;
			background: #FFF8EB;
			border-radius: 10rpx;
			// padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			width: 100%;
		}
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
			border-radius: 30rpx;
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
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 20rpx
				}
			}
		}
	}
</style>
