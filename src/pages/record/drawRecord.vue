<template>
	<view>
		<topNav title="Lotter Record"></topNav>
		<view class="pdlr30 pt50">

			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
				:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
				:loading-more-fail-text="t('rec.r_a4')">
				<view class=" listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">Lottery result</view>
						<view class="">{{item.gift?item.gift.name:''}}</view>
					</view>
				
					<view class="vvItem">
						<view class="f26">{{t('rec.r_r10')}}</view>
						<view class="">
							{{ item.createTime}}
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
			url: 'activity/lottery/log',
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
