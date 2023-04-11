<template>
	<view style="background: url('/static/actIcon/sign/signBg.png') no-repeat 100%; min-height: 100vh; overflow: scroll;  ">
		<!-- <view :style="store.$state.imgObj.loginBg"> -->
		<view class="pdlr35 pt33">

			<view class="flex between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">Sign Record </view>
			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
				:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
				:loading-more-fail-text="t('rec.r_a4')">

				<view v-for="(item, index) in recordsList" :key="index">
					<view class="listItem" v-if="item.bonus >0  || item.lottery">

						<view class="vvItem" v-if="item.bonus >0">
							<view class="f26">Get commission</view>
							<view class="" :style="{color:store.$state.contentColor}"> +{{ item.bonus }} {{currency}}
							</view>
						</view>
				
						<view class="vvItem" v-if=" item.lottery">
							<view class="f26">Number of draws</view>
							<view class="" :style="{color:store.$state.contentColor}">
								+ {{ item.lottery }}
							</view>
						</view>
						<view class="vvItem">
							<view class="f26">{{t('add1.a_a4')}}</view>
							<view class="" :style="{color:store.$state.contentColor}">
								{{ item.createTime }}
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		getStorageSync
	} from '@dcloudio/uni-h5';
	const store = userStore();
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const recordsList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'activity/signIn/log',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const currency = ref("")
	// 终于可以用了
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.listItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 4rpx 45rpx 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		margin: 30rpx auto;

		.vvItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancle {
			color: #AFAFAF;
		}
	}
</style>
