<template>
	<view>
		<view class="between" :style="{background:store.$state.contentColor}" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 48rpx;height: 48rpx;">
				<!-- <image src="/static/images/back.png" style="width: 100%;height: 100%;" @click="back"></image> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">Team
			</view>
			<view style="width: 32rpx;height: 34rpx;">
			</view>
		</view>
		<view class="pdlr30 mt70">
			<view>
				<view class="flex between">
					<view class="topItem  flex-wrap">
						<view class="f24">{{t('mine.m_t2')}}</view>
						<view class="f40 text_bold mt27" style="color:#FFA115 ;">{{pageData.member_today_commission}}
						</view>
					</view>
					<view class="topItem  flex-wrap">
						<view class="f24">{{t('mine.m_t3')}}</view>
						<view class="f40 text_bold mt27" style="color:#FFA115 ;">{{pageData.member_commission}}</view>
					</view>
				</view>
				<view class="flex between mt35">
					<view class="topItem  flex-wrap">
						<view class="f24">{{t('mine.m_t4')}}</view>
						<view class="f40 text_bold mt27" style="color:#FFA115 ;">{{pageData.member}}</view>
					</view>
					<view class="topItem  flex-wrap">
						<view class="f24">{{t('mine.m_t5')}}</view>
						<view class="f40 text_bold mt27" style="color:#FFA115 ;">{{pageData.member_invest_amount}}
						</view>
					</view>
				</view>
			</view>

			<view class="flex mt50">
				<view :style="{background:store.$state.contentColor}" class="text_white f26"
					style="padding:20rpx 30rpx ; border-radius: 50rpx;">{{t('mine.m_t6')}}</view>
			</view>


			<view class="mt60" style="background-color: #fff;border-radius: 30rpx;overflow: hidden;"
				:style="{'border-color':store.$state.contentColor}">

				<view class="table_head text_white" :style="{background:store.$state.contentColor}">
					<view> Level</view>
					<view class="f22" :style="{color:store.$state.contentColor}">{{t('mine.m_t10')}}</view>
					<view class="f22" :style="{color:store.$state.contentColor}">{{t('mine.m_t11')}}</view>
				</view>

				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('mine.m_t7')}}</view>
					<view class="f25">{{botData.A.number}}</view>
					<view class="f25">{{botData.A.invest_amount}}</view>
					<!-- <view class="f25">{{botData.C.number}}</view> -->
				</view>
				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('mine.m_t8')}}</view>
					<view class="f25">{{botData.B.number}}</view>
					<view class="f25">{{botData.B.invest_amount}}</view>
				</view>
				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('mine.m_t9')}}</view>
					<view class="f25">{{botData.C.number}}</view>
					<view class="f25">{{botData.C.invest_amount}}</view>
				</view>

			<!-- 	<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('game.g_a5')}}</view>
					<view class="f25">{{botData.D.number}}</view>
					<view class="f25">{{botData.D.invest_amount}}</view>
				</view>

				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('game.g_a6')}}</view>
					<view class="f25">{{botData.E.number}}</view>
					<view class="f25">{{botData.E.invest_amount}}</view>
				</view>

				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view>{{t('game.g_a7')}}</view>
					<view class="f25">{{botData.F.number}}</view>
					<view class="f25">{{botData.F.invest_amount}}</view>
				</view> -->

				<view class="flex mt16 mb18 mr31" style="flex-direction: row-reverse;"
					@click="jumpPage('../mine/teamDetail')">
					<view :style="{background:store.$state.contentColor}" class="text_white f26 flex col_center"
						style="padding:14rpx 24rpx ; border-radius: 50rpx;">{{t('mine.m_t12')}}
						<view class="center ml10"
							style="background-color: #fff; width: 42rpx;height: 42rpx;border-radius: 50%;">
							<IconFont name="right" color="#333" size="10"></IconFont>
						</view>
					</view>
				</view>
			</view>

			<view class="mt59 linkEl between">
				<view style="width: 80%;">
					<view>{{t('mine.m_t13')}}:</view>
					<view class="mt20 textHiddenOne">{{inviteUrl}}</view>
				</view>
				<view :style="{background:store.$state.contentColor}" class="text_white f26"
					style="padding:18rpx 39rpx ; border-radius: 50rpx;" @tap="copyHandle(inviteUrl)">{{t('all.a_c3')}}
				</view>
			</view>

			<view style="height: 200rpx;"></view>
		</view>
		<tqbTabbar :actIndex="2"></tqbTabbar>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		showToast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
import { onMounted } from "vue";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const inviteUrl = ref("")
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			showToast.text(t('all.a_c4'))
		} catch (e) {
			console.error(e)
		}
	}
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const showLoading = ref(null)
	const pageData = ref({
		// member: 0, //团队人数
		// member_commission: 0.00, //总团队收益
		// member_today_commission: 0.00, //今日团队收益
		// member_invest_amount: 0, //团队建设金额
	})
	const botData = ref({
		A: {},
		B: {},
		C: {},
		D: {},
		E: {},
		F: {}
	})
	const inviteCode = ref("")
	const getData = () => {
		request({
			url: 'user/record/team/report',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			botData.value = res.member_detail
		})

		request({
			url: 'user/index',
			methods: 'get',
			data: {}
		}).then(res => {
			inviteUrl.value = window.location.protocol + "//" + window.location.host +
				"/\#/pages/login/register\?code=" + res.invite_code
			// pageData.value = res
		})
	}
	onMounted(() => {
		
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1500)
	})
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
	}

	.topItem {
		background-color: #FFF8EB;
		border-radius: 15rpx;
		width: 48%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 35rpx 0;
		height: 120rpx;
	}

	.levelText {
		font-family: PingFang SC;
		font-weight: 600;
		color: #6068FF;
		-webkit-text-stroke: 1rpx #FFFFFF;
		text-stroke: 1rpx #FFFFFF;
	}

	.table_head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 27rpx 0;

		view {
			width: 33%;
			text-align: center;
			line-height: 100%;
		}
	}

	.linkEl {
		height: 88rpx;
		background: linear-gradient(135deg, #fe9b0c, #ffcc51);
		color: #fff;
		// width: 100%;
		border-radius: 20rpx;
		padding: 44rpx 50rpx;
	}
</style>
