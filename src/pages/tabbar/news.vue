<template>
	<view>
		<view class="flex between topNav" :style="{background:store.$state.contentColor}">
			<view>

			</view>
			<view class="f36 text_white" style="font-weight: 500;">
				{{t('game.g_a8')}}
			</view>
			<view>
			</view>
		</view>
		<view class="pdlr30 pt33" v-if="recordsList.length >0">

			<view class="newsItem mb30 ">
				<view class="f40 textHiddenThree pt30" style="width: 380rpx; text-align: center;">
					{{t('game.g_a9')}} <br> {{t('game.g_a10')}}
				</view>

				<view class="flex">
					<view class="btns center textHiddenOne" @click="jumpPage('../act/sign')">
						{{t('game.g_a11')}}
						<view class="ml10 center" style="transform: rotateZ(-90DEG);">
							<IconFont name="triangle-down" color="#f65300"></IconFont>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="center mt80" style="height: 60vh;" v-else>
			<image src="../../static/noAct.png" mode="widthFix" style="width: 500rpx;height: 318rpx;"></image>
		</view>
		<view style="height: 150rpx;"></view>
		<tqbTabbar :activeIndex="1"></tqbTabbar>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
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
		onMounted
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	const store = userStore();

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const showLoading = ref(null)

	const recordsList = ref([{
		url: "",
		name: "活动1"
	}, ])

	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 700);

	})
</script>

<style lang="scss" scoped>
	.topNav {
		height: 88rpx;
		padding: 0 30rpx;
	}

	.newsItem {
		padding: 25rpx 30rpx;
		// display: flex;
		// align-items: center;
		// background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 20rpx 5rpx #ccc;
		color: #f3fbe2;
	}

	.newsItem:nth-child(1) {
		background: url('/src/static/act/signBg.png') no-repeat 100%/100%;
		height: 230rpx;
	}

	.btns {
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		background-color: #fdfbe2;
		// width: 200rpx;
		min-width: 200rpx;
		max-width: 300rpx;
		color: #f65300;
		text-align: center;
		margin: 20rpx 0 0 40rpx;
	}
</style>
