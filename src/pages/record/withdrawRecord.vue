<template>
	<view>
		<topNav :title="t('rec.r_w1')"></topNav>
		<view class="pdlr10 pt50">

			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')" :loading-more-default-text="t('rec.r_a2')"
				:loading-more-loading-text="t('rec.r_a3')" :loading-more-fail-text="t('rec.r_a4')" >
				<view class=" listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{t('rec.r_r5')}}</view>
						<view class="">{{ item.order_no }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('mine.m_t11')}}</view>
						<view class="">{{ item.amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('rec.r_w2')}}</view>
						<view class="">{{ item.actual_amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('rec.r_w3')}}</view>
						<view class="">{{ item.fee }}</view>
					</view>
					
					<view class="vvItem" v-if="item.remark">
						<view class="f26">{{t('rec.r_r2')}}</view>
						<view class="">{{ item.remark }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('rec.r_w4')}}</view>
						<view class="">
							<text v-if="item.status ==1" class="cancle">{{t('rec.r_w5')}}</text>
							<text v-if="item.status ==2" class="pass">{{t('rec.r_w6')}}</text>
							<text v-if="item.status ==3" class="error">{{t('rec.r_w7')}}</text>
							<text v-if="item.status ==4" class="cancle">{{t('rec.r_w8')}}</text>

						</view>
					</view>

					<view class="vvItem">
						<view class="f26">{{t('rec.r_w9')}}</view>
						<view class="pass">
							<text v-if="item.pay_status ==1" class="cancle">{{t('rec.r_w10')}}</text>
							<text v-if="item.pay_status ==2" class="pass">{{t('rec.r_w11')}}</text>
							<text v-if="item.pay_status ==3" class="error">{{t('rec.r_w12')}}</text>
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
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'user/record/withdraw',
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

</style>
