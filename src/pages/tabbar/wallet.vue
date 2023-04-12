<template>
	<view style="padding-bottom: 200rpx;">
		<view class="pagePad between  nav" style="height: 80rpx;">
			<view style="width: 50rpx;"></view>
			<view class="text_white f36 " style="font-weight: 500;">
				{{t('game.g_a1')}}
			</view>
			<image src="@/static/images/audio.webp" style="width: 50rpx;height: 50rpx;" @click="handleToPage('../mine/service')"></image>
		</view>

		<view class="pdlr30  topBox">
			<view class="flex col_center pl50" style="flex-direction: column;">
				<image src="/static/images/avatar.svg" mode="widthFix"
					style="width:120rpx ;height: 120rpx;border-radius: 50%;"></image>
				<view class="f36 text_white mt20" style="font-weight: 500;">{{pageData.phone}}
				</view>
			</view>

			<view class="topBg"></view>
			<view class="balanceBox flex row_center" style="flex-direction: column;">
				<view class="f40 pl30">
						{{t('game.g_a1')}}
				</view>

				<view class="topMainBox">
					<view class="ml20">
						<view class="">{{t('game.g_a2')}}</view>
						<view class="f50 text_bold mt10 text_center"> {{pageData.balance}} {{currency}} </view>
					</view>
					
					<view class="between mt20 text_center">
						<view style="border-right: 5rpx solid #fff;width: 50%;">
							<view>{{t('game.g_a3')}}</view>
							<view class="mt10">0.00</view>
						</view>
						<view>
							<view>{{t('game.g_a4')}}</view>
							<view class="mt10">0.00</view>
						</view>
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
			
			<view class="mt40 botBox">
				<view class="myItem between" v-for="(item,index) in botList" :class="index !== botList.length -1?'borderB':''" @click="handleToPage(item.url)">
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


		<tqbTabbar :activeIndex="3"></tqbTabbar>
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

	const botList = ref([
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
	])
	const handleToPage = (url) => {
		uni.navigateTo({
			url
		})
	}
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
	const getData = () => {

		request({
			url: 'user/index',
			methods: 'get',
			data: {}
		}).then(res => {
			pageData.value = res
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
	.botBox{
		box-shadow: 0 0.21333rem 0.8rem 0 rgba(211,13,13,.07);
		border-radius: 20rpx;
		.myItem{
			padding: 10rpx 30rpx;
			
		}
	}
	.topMainBox{
		background: linear-gradient(135deg,#fe9b0c,#ffcc51);
		margin: 20rpx 0;
		color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
	}
	.topBg {
		width: 90%;
		margin: 30rpx auto 0;
		height: 72rpx;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmMAAAA1CAYAAAANgOy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA0LTE0VDE2OjE0OjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNC0xNFQyMToyMjowMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0xNFQyMToyMjowMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzU1NDU4YzMtMmE4MS01MTQxLWJlZWMtZWU1NmMzN2I2NDM2IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjEyOGY0M2ItY2I0MC1jNDRiLWFhOTYtYmNhNmExOWUyYTg0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTZiODg4NTItMDMwMy05ZDQ4LWJmYjUtYzY4YzY4OGY5NzBiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NmI4ODg1Mi0wMzAzLTlkNDgtYmZiNS1jNjhjNjg4Zjk3MGIiIHN0RXZ0OndoZW49IjIwMjEtMDQtMTRUMTY6MTQ6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzU1NDU4YzMtMmE4MS01MTQxLWJlZWMtZWU1NmMzN2I2NDM2IiBzdEV2dDp3aGVuPSIyMDIxLTA0LTE0VDIxOjIyOjAxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GCBggwAAAilJREFUeJzt3C1uVFEcxuH3DJch6Ucq2uJIUaQCwgYIAUWCISwAWELTdAPdBYtAITAIqCDBgEdjiqWGMB3uQTUh9fAfZp5HXXde+cu5ubdlAb1/kGH8kPttzH6S7eo9AMD/rSWz3nI6nebk3o98rd7zp1Y94LLe094NedF6blRvAQCWTxvy6uEsX6p3XJhUD7jsZJq7QgwA+Fv6PI97X5wLqYWLsT5mr3oDALDU1t9uZrd6xIWFi7GWbFZvAACW25V5Nqo3XFi4GAMAWCViDACgkBgDACgkxgAACokxAIBCYgwAoJAYAwAoJMYAAAqJMQCAQmIMAKCQGAMAKCTGAAAKiTEAgEJiDACgkBgDACgkxgAACokxAIBCYgwAoJAYAwAoJMYAAAqJMQCAQsPFQz862st4/ihjv5W0skg7+3a6P/8526o6HwBYfhu7Ozf72vr3ksNbztL652xtv2nHx2NLkn5w8DwZXyZZKxkFALBqWj5mbfK09cPDO+m/PqX3afUmAICV0trrIZk/S48QAwD413p/MknP7eodAACrapLkavUIAIBV5dcWAACFxBgAQCExBgBQSIwBABQSYwAAhcQYAEAhMQYAUEiMAQAUEmMAAIXEGABAITEGAFBo6GOv3gAAsLLcjAEAFBJjAACFxBgAQKFhTNKqVwAArCg3YwAAhYaeJN0XlQAAFYbex+ZFJQBAjWFMMnEzBgBQYsjO9Wv9fFa9AwBgJf0GkpRSqsPGTDEAAAAASUVORK5CYII=) no-repeat 0 0;
		background-size: 100% 100%
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
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0.21333rem 0.8rem 0 rgba(211, 13, 13, .07);
		margin-top: -10rpx;

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

	.listBox {
		padding: 50rpx 40rpx 20rpx 20rpx;
		margin-top: 185rpx;
		// background-color: #fff;
		border-radius: 20rpx;

		.between {
			border-bottom: 1rpx solid #e1e1e1;
			padding-bottom: 20rpx;
		}
	}
</style>
