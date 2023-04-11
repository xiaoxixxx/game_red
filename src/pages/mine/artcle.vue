<template>
	<view >
	<view v-if="pageData.name">
		<topNav :title="pageData.name"></topNav>
		<view class="pdlr30 mt70 ">
			<view class="mainBox">
				<view v-html="pageData.contents"></view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
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
	} = useI18n();

	const pageData = ref({
		name: "",
		des: '',
		content: ""
	})
	const id = ref(0)
	// /article/detail
	const getData = () => {
		request({
			url: 'page/article/detail',
			methods: 'get',
			data: {
				id: id.value
			}
		}).then(res => {
			if (!res.name) {
				showToast.text('No more data')
				history.back()
			} else {
				pageData.value = res
			}
		})
	}
	const showLoading = ref(null)
	// 终于可以用了
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
	})
	onLoad(e => {
		if (e.pos) {
			id.value = e.pos
			getData()
		}
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
