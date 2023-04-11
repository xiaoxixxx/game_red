<template>
	<view>
		<topNav :title="t('mine.m_d1')"></topNav>
		<view class="pdlr30 mt50">
			<view class="flex " style="flex-wrap: wrap;">
				<view class="topItem mb20" v-for="(item,index) in types" :style="index == typeInd?choStyle:noChoStyle"
					@click="changeType(item,index)">
					{{item.name}}
				</view>
			</view>

			<view class="mt40 f24" style="background-color: #fff;border-radius: 20rpx;">
				<view class="table_head " style="border-radius: 20rpx 20rpx 0 0; background: #FFF8EB;">
					<view>{{t('mine.m_d2')}}</view>
					<view>{{t('mine.m_d3')}}</view>
					<view>{{t('mine.m_d4')}}</view>
					<view>{{t('mine.m_t11')}}</view>
				</view>

				<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
					:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
					:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="'No more data'"
					:loading-more-no-more-text="'No more data'" :empty-view-reload-text="'Click to load more'"
					:loading-more-loading-text="'Loading'" :loading-more-fail-text="'Please Refresh'">
					<view style="border-radius: 0 0 20rpx 20rpx;" class="botTable">
						<view class="table_head " v-for="(item,index) in recordsList">
							<view>{{index +1}}</view>
							<view>{{item.level}}</view>
							<view>{{item.filter_phone}}</view>
							<view>{{item.total_invest}}</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
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
	const {
		t
	} = useI18n();

	const types = [{
			name: t('mine.m_d6'),
			value: '0'
		},
		{
			name: t('mine.m_t7'),
			value: '1'
		},
		{
			name: t('mine.m_t8'),
			value: '2'
		},
		{
			name: t('mine.m_t9'),
			value: '3'
		},
		{
			name: t('game.g_a5'),
			value: '4'
		},
		{
			name: t('game.g_a6'),
			value: '5'
		},
		{
			name: t('game.g_a7'),
			value: '6'
		},
	]
	const typeInd = ref(0)

	const choStyle = {
		background: store.$state.contentColor,
		color: "#fff",

	}
	const noChoStyle = {
		border: "1rpx solid #ccc",
		color: "#000"
	}

	const changeType = (item, index) => {
		typeInd.value = index
		pages.value.level = item.value
		paging.value.clean()
		getData()
	}

	const paging = ref(null)
	const recordsList = ref([])
	const pages = ref({
		page: 1,
		size: 10,
		level: '0'
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'user/record/team/user',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
</script>

<style lang="scss">
	.topItem {
		padding: 24rpx 30rpx;
		border-radius: 20rpx;
		margin: 0 20rpx 30rpx 0;
	}

	.table_head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 27rpx 21rpx;

		view {
			width: 25%;
			text-align: center;
			line-height: 100%;
		}
	}

	.botTable {
		.table_head {
			border-bottom: 1rpx solid #eee;
		}
	}
</style>
