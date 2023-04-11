<template>
	<view>
		<topNav :title="t('mine.m_c1')"></topNav>
		<view class="pdlr45 mt50 desc">
			<view class="mainBox">
				<view v-html="pageData.content"></view>
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
import { onMounted } from "vue";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const showLoading = ref(null)
	const getData = () => {
		try {
			showLoading.value.loading = true
		
		} catch (e) {
		}
		request({
			url: 'home/company',
			methods: 'get',
			data: {}
		}).then(res => {
			pageData.value = res
			console.log(res);
			showLoading.value.loading = false
			// console.log(res);
		}).catch(e=>{
			console.log(e);
			showLoading.value.loading = false
		})
	}
	const pageData = ref({})
	// 终于可以用了
	onMounted(() => {
		getData()
	})
</script>

<style lang="scss" scoped>
	.mainBox {
		background-color: #fff;
		border-radius: 20px;
		padding: 50rpx;
		line-height: 40rpx;
		word-spacing: 0.1rem;
	}
</style>
