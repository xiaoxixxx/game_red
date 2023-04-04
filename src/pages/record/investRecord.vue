<template>
	<view>
		<topNav :title="t('add1.a_a11')"></topNav>
		<view class="pdlr30 pt50">
			
			<view class=" topBox" >
				
				<view class=" between">
					<view class="f26">{{t('add1.a_a6')}}</view>
					<view class="f26  ">{{topData.create_time_format}}</view>
				</view>
				<view class=" between mt20">
					<view class="f26">{{t('add1.a_a7')}}</view>
					<view class="f26  ">{{topData.expire_time_format}}</view>
				</view>	
				<view class="between flex mt20" >
					<!-- <view></view> -->
					<view class="f24" style="width: 50%;">{{t('add1.a_a8')}}</view>
					<!-- <view class="f26 ">returned</view> -->
					<view class="f26 " v-if="topData.back_price >0">{{t('add1.a_a9')}}</view>
					<view class="f26 " v-else>{{t('add1.a_a10')}}</view>
				</view>
				
			<view class="between mt30 text_center">
				<view class="topItem">
					<view class="f26 title textHiddenTwo">{{t('mine.m_s5')}} </view>
					<view class="f26 value mt10"> {{topData.price}}</view>
				</view>
			
				<view class="topItem">
					<view class="f26 title textHiddenTwo">{{t('add1.a_a5')}}</view>
					<view class="f26 value mt10"> {{topData.total_profit}}</view>
				</view>
			</view>
			</view>
			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
				:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
				:loading-more-fail-text="t('rec.r_a4')">
				<view class=" listItem" v-for="(item, index) in recordsList" :key="index">
					
				
					<view class="vvItem" >
						<view class="f26">{{t('mine.m_t11')}} </view>
						<view class="flex row_center pass"> +{{ item.profit }}</view>
					</view>
				<view class="vvItem" >
					<view class="f26">{{t('rec.r_r2')}}</view>
					<view class="flex row_center pass">{{t('add1.a_a1')}} </view>
				</view>
					
					<view class="vvItem">
						<view class="f26"> {{t('add1.a_a4')}}</view>
						<view class="">
							{{ item.create_time }}
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
		size: 10,
		invest_id:1
	})

	const handleClick = () => {
		// console.log('触发返回顶部');
	};
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'machine/profitDetail',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const topData = ref({})
	const getTopData = ()=>{
		request({
			methods: 'get',
			url: 'machine/detail',
			data: {
				invest_id:pages.value.invest_id
			}
		}).then(res => {
			topData.value = res
			console.log(res);
		})
	}
	const id = ref()
	// 终于可以用了
	onLoad((e) => {
		if(e.id){
			pages.value.invest_id = e.id
			getTopData()
		}else{
			history.back()
		}
	})
</script>

<style lang="scss" scoped>
	.pass {
		color: #60B661;
	}
	.topBox{
		padding: 30rpx 40rpx ;
		background-color: #8dc68c;
		border-radius: 20rpx;
		margin-bottom: 50rpx;
		color: #fff;
		.topItem{
			width: calc(45% - 40rpx);
			background-color: #fff;
			height: 90rpx;
			border-radius: 20rpx;
			color: #000;
			padding: 30rpx 20rpx;
			.textHiddenTwo{
				height: 60rpx;
				text-align: center;
			}
			.value{
				color: #60B661;
			}
		}
	}
</style>
