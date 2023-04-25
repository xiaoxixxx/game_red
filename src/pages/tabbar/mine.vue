<template>
	<view style="padding-bottom: 200rpx;">
		<view class="pagePad between  nav" style="height: 80rpx;">
			<view style="width: 50rpx;"></view>
			<view class="text_white f36 " style="font-weight: 500;">
				my
			</view>
			<image src="@/static/images/audio.webp" style="width: 50rpx;height: 50rpx;" @click="handleToPage('../mine/service')"></image>
		</view>
		
		<view class="pdlr30  topBox">
			<view class="flex col_center pl50">
				<view> 
					<image src="/static/images/avatar.svg" mode="widthFix" style="width:120rpx ;height: 120rpx;border-radius: 50%;"></image>
				</view>
				<view class="ml20">
					<view class=" ">
						<view class="f36 text_white" style="font-weight: 500;">
							username:{{pageData.phone}}
						</view>
						<view class="text_white mt20 flex col_center">
							ID:{{pageData.id}}
							
							<view v-if="vipNumber>-1">
								<image :src="vipList[vipNumber]" mode="widthFix" style="width: 120rpx;" class="ml20"></image>
							</view>
						</view>
					
					</view>
					
					<view class="mt22 flex">
						<view class="f22 text_white" style="border-radius: 10rpx; padding: 20rpx; background-color:#FFA115 ;">
							{{t('mine.m_s3')}}: {{pageData.invite_code}}
							<image src="../../static/themeNum1/icon/copy.png" mode="widthFix" style="width:19rpx;height: 19rpx;"
								@click="copyHandle(pageData.invite_code)"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="balanceBox flex row_center" style="flex-direction: column;">
				<view class="flex">
					<view>
						<image src="../../static/images/icon_wallet.webp" mode="widthFix" style="width: 90rpx;90rpx"></image>
					</view>
					<view class="ml20">
						<view class="color6">{{t('all.b_b1')}}</view>
						<view class="f40 text_bold mt10"> {{pageData.balance}} {{currency}} </view>
					</view>
					
				</view>
				<view class="between mt20">
					<view class="btns" @click="handleToPage('../recharge/index')">
						{{t('recharge.r_r1')}}
					</view>
					<view class="btns" @click="handleToPage('../withdraw/index')">
						{{t('withdraw.w_w1')}}
					</view>
				</view>

			</view>
		</view>

		<view class="pdlr30 mt30 ">

			<view class=" listBox ">
				<view class="  mb20 myItem " v-for="(item,index) in botList" @click="handleToPage(item.url)" :class="index !== botList.length -1?'borderB':''">
					<view class="between" v-if="item.show">
						<view class="flex col_center">
							<image :src="item.img" style="width: 92rpx;height: 92rpx;"></image>
							<view class="ml41 f30">{{item.name}}</view>
						</view>
						<view>
							<IconFont name="right" color="#f2413b"></IconFont>
						</view>
					</view>
				</view>

			</view>
		</view>
		<tqbTabbar :activeIndex="4"></tqbTabbar>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		showToast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		onMounted
	} from "vue";
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";
	const {
		t
	} = useI18n()
	const {
		toClipboard
	} = useClipboard()


	const botList = ref([{
			name: t('rec.r_r1'),
			img: "/static/themeNum1/icon/m_list1.png",
			url: '../record/balanceRecord',
			show: true
		},
		{
			name: t('rec.r_r11'),
			img: "/static/themeNum1/icon/m_list2.png",
			url: '../record/rechargeRecord',
			show: true
		},
		{
			name: t('rec.r_w1'),
			img: "/static/themeNum1/icon/m_list3.png",
			url: '../record/withdrawRecord',
			show: true
		},
		{
			name: t('mine.m_m3'),
			img: "/static/themeNum1/icon/m_list4.png",
			url: 'down',
			show: false
		}, {
			name: t('setting.s_c1'),
			img: "/static/themeNum1/icon/m_list5.png",
			url: '../setting/setting',
			show: true
		},
	])

	const handleToPage = (url) => {

		if (url == 'down') {
			var userAgent = navigator.userAgent; //获取userAgent信息
			if (userAgent.includes('iPhone ')) {
				// uni.navigateTo({
				// 	url: '../mine/iosIntro'
				// })
				return false
			}
			window.open(appData.value.url)
			return false
		}
		if (!url) {
			showToast.text('The event has not been opened yet')
			return false
		}
		uni.navigateTo({
			url
		})
	}
	
	const vipList = [
		'/static/vip/0.png',
		'/static/vip/1.png',
		'/static/vip/2.png',
		'/static/vip/3.png',
		'/static/vip/4.png',
		'/static/vip/5.png',
		'/static/vip/6.png',
		'/static/vip/7.png',
		'/static/vip/8.png',
	]
	
	const pageData = ref({
		phone: "", //手机号
		balance: 0, //余额
		total_commission: 0,
		invite_code: 0, //邀请码
		cur_invest: 0, //建设本金
		machine: 0 //矿机数
	})
	const appData = ref({})
	const showLoading = ref(null)
	
	const vipNumber = ref(-1)
	const getData = () => {

		request({
			url: 'user/index',
			methods: 'get',
			data: {}
		}).then(res => {
			pageData.value = res
			try{
					vipNumber.value = res.vip.number
			}catch(e){
				//TODO handle the exception
			}
		})

		request({
			url: 'setting/app',
			methods: 'get',
			data: {}
		}).then(res => {
			appData.value = res
			if (res.download_status == 1) {
				botList.value[3].show = true
			}
		})

	}

	const copyHandle = async (data) => {
		// data
		try {
			await toClipboard(data)
			showToast.text('success')
		} catch (e) {
			showToast.text('error')
		}
	}
	const currency = ref("")
	// 终于可以用了
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
	})

	onShow(() => {
		getData()
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.topBox {
		background: url('/src/static/images/bg_top.webp') no-repeat 100%/100%;
		height: 305rpx;
		padding-top: 33rpx;
		margin-top: -10rpx;
	}

	.color6 {
		font-size: 24rpx;
		color: #666;
	}

	.balanceBox {
		padding: 39rpx 20rpx;
		margin-top: 29rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0.21333rem 0.8rem 0 rgba(211,13,13,.07);
		.btns{
			width: calc(48% - 80rpx);
			padding: 20rpx 40rpx;
			text-align: center;
			border-radius: 10rpx;
			color: #fff;
		}
		.btns:nth-child(1){
			background-color:#ffce1f;
			box-shadow: 0 0 0.26667rem 0.02667rem rgba(255,206,31,.4);
		}
		.btns:nth-child(2){
			background-color:#f2413b;
			box-shadow: 0 0 0.26667rem 0.02667rem rgba(242,65,59,.27);
		}
	}

	.listBox {
		margin-top: 205rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding-top: 20rpx ;
		.between{
			padding: 0 40rpx;
			padding-bottom: 20rpx;
		}
	}


</style>
