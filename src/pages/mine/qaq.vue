<template>
	<view>
		<topNav :title="t('mine.m_c4')"></topNav>
		<view class="pdlr45 mt70">
			<z-paging class="" ref="paging" v-model="qaqData" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="'No more data'"
				:loading-more-no-more-text="'No more data'" :empty-view-reload-text="'Click to load more'"
				:loading-more-loading-text="'Loading'" :loading-more-fail-text="'Please Refresh'">
				
				<nut-collapse v-model:active="activeNames" icon="arrow-down" title-icon-color="#16B739"
					icon-color="#16B739">
					<view v-for="item in qaqData" class="items">
						<nut-collapse-item class="f23" :title="item.question" :name="item.id">
							<view v-html="item.answer"></view>
						</nut-collapse-item>
					</view>

				</nut-collapse>
			</z-paging>
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
	const activeNames = ref([])
	const qaqData = ref([])

	const pages = ref({
		page: 1,
		size: 10
	})
	const showLoading = ref(null)

	const paging = ref(null)
	const getData = (page) => {
		pages.value.page = page
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
				paging.value.complete(res.data);
				pages.value.page += 1
			}).catch(e => {
				showLoading.value.loading = false
			})
		} catch (e) {
			//TODO handle the exception
		}

	}

	// 终于可以用了
	onMounted(() => {
		getData()
	})
</script>

<style lang="scss">
	.items {
		margin-bottom: 30rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}
</style>
