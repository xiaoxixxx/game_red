<template>
	<view>
		<topNav :title="t('mine.m_c3')"></topNav>
		<view class="pdlr30 mt70">

			<view class="items mb40" v-for="(item,index) in langList" :style="index ==langInd?choStyle:noChoStyle"
				@click="setHandle(index)">
				<view class="flex col_center">
					<image :src="`/static/lang/${item.lang}.png`" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
					<view class="ml40 f30">
						{{item.name}}
					</view>
				</view>

			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
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
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";
	const langList = ref([])
	const langInd = ref(0)

	const showLoading = ref(null)
	const getData = () => {
		showLoading.value.loading = true
		request({
			url: 'setting/lang',
			methods: 'get',
		}).then(res => {
			let langVal = uni.getStorageSync('lang')
			langList.value = res
			langList.value.forEach((item, index) => {
				if (langVal == item.lang) {
					langInd.value = index
				}
			})
		})
		setTimeout(() => {
			showLoading.value.loading = false
		}, 500)

	}
	const choStyle = {
		background: store.$state.contentColor,
		color: "#fff",

	}
	const noChoStyle = {
		background: "#fff",
		color: "#000"
	}

	const {
		t
	} = useI18n();
	const setHandle = (index) => {
		showLoading.value.loading = true
		uni.setStorageSync('lang', langList.value[index].lang)
		window.location.reload()
		showLoading.value.loading = false
		// window.open(item.contact_link)
	}
	// 终于可以用了
	// 终于可以用了
	onMounted(() => {

		getData();
	})
</script>

<style lang="scss">
	.items {
		height: 128rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}
</style>
