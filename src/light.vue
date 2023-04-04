<template>
	<view>
		<topNav :title="'Set Up'"></topNav>
		<view class="pdlr45 mt70">
		</view>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
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
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();


	const choStyle = {
		background: store.$state.contentColor,
		color: "#fff",

	}
	const noNhoStyle = {
		background: "#fff",
		color: "#000"
	}

{{t('all.a_c1')}} 取消

{{t('all.a_c2')}} 确定

{{t('all.a_t1')}} tips

		<topNav :title="t('mine.m_c3')"></topNav>
	try {
		showLoading.value.loading = true
		request({
			url: '/page/q_a/list',
			methods: 'get',
			param: {
				...pages.value
			}
		}).then(res => {
			showLoading.value.loading = false

		}).catch(e => {
			showLoading.value.loading = false
		})
	} catch (e) {
		//TODO handle the exception
	}
	// 终于可以用了
	onShow(() => {})
</script>

<style lang="scss">

</style>



