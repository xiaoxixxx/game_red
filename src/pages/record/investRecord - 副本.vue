<template>
	<view>
		<topNav :title="t('rec.r_r4')"></topNav>
		<view class="pdlr30 pt50">

			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
				:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
				:loading-more-fail-text="t('rec.r_a4')">
				<view class=" listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{t('rec.r_r5')}}</view>
						<view class="">{{ item.order_no }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('mine.m_t11')}}</view>
						<view class="flex row_center error">-{{ item.price }}</view>
					</view>

					<view class="vvItem" v-if="item.total_profit">
						<view class="f26">{{t('add1.a_a1')}}</view>
						<view class="flex row_center pass"> +{{ item.total_profit }}</view>
					</view>
					<view class="vvItem" v-if="item.status == 2 || item.status == 4 ">
						<view class="f26">{{t('add1.a_a2')}}</view>
						<view class="flex row_center pass"> +{{ item.price }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('rec.r_r6')}}</view>
						<view class="pass" v-if="item.status == 1 ">{{t('rec.r_r7')}}</view>
						<view class="error" v-if="item.status == 2 || item.status == 4 ">{{t('rec.r_r8')}}</view>
						<view class="cancle" v-if="item.status == 3 ">{{t('rec.r_r9')}}</view>

					</view>
					<view class="vvItem">
						<view class="f26">{{t('rec.r_r10')}}</view>
						<view class="">
							{{ item.expire_time_format }}
						</view>
					</view>

				</view>

			</z-paging>


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

	const handleClick = () => {
		// console.log('触发返回顶部');
	};
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'invest/log',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	// 终于可以用了
	onLoad(() => {

	})
</script>

<style lang="scss">
	.pass {
		color: #60B661;
	}
</style>
