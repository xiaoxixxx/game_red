<template>
	<view class="minBox">
		<view class="topBorder flex">
			<view class="items" v-for="(item,index) in topData" style="position: relative;">
				<image src="/static/images/ask1.png" mode="widthFix" @tap.stop="changeMaskContent(item,index)"
					style="width: 30rpx;height: 30rpx;position: absolute;top: -20rpx;z-index:10" v-if="actInd==index">
				</image>
				<image src="/static/images/ask.png" mode="widthFix" @tap.stop="changeMaskContent(item,index)"
					style="width: 30rpx;height: 30rpx;position: absolute;top: -20rpx;z-index:10" v-else></image>

				<image src="/static/images/timer1.png" class="mt10" mode="widthFix" style="width: 60rpx;height: 60rpx;"
					v-if="actInd==index" @tap.stop="changeActInd(item,index)"></image>
				<image src="/static/images/timer.png" class="mt10" mode="widthFix" style="width: 60rpx;height: 60rpx;"
					@tap.stop="changeActInd(item,index)" v-else>
				</image>

				<image src="/static/images/g_down1.png" mode="widthFix" style="width: 30rpx;height: 30rpx;"
					v-if="actInd==index"></image>
				<image src="/static/images/g_down.png" mode="widthFix" style="width: 30rpx;height: 30rpx;" v-else>
				</image>

				<text class="f24" :style="actInd == index?{'color':'#fa4e46'}:{'color':'#ccc'}">{{item.name}}</text>
			</view>
		</view>
		<!-- {{dataList}} -->
		<nut-popup :style="{ padding: '0 0' }" v-model:visible="showBasic" :close-on-click-overlay="false"
			:round="true">
			<view style="width: 650rpx;">
				<view class="maskHead text_center text_white pdtb20"> {{t('add1.a_a6')}}</view>
				<view style="height: 600rpx; overflow: scroll;" class="maskContent pdlr30 pt20">
					<view v-html="contents"></view>
				</view>
				<view class="mt20 flex center">
					<view class="maskBtns" @click="showBasic = false">{{t('add1.a_a5')}}</view>
				</view>
			</view>
		</nut-popup>
	</view>
</template>


<script>
	import {
		defineComponent
	} from 'vue';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		userStore
	} from "@/store/themeNum.js";
	export default defineComponent({
		props: ['topData'],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const actInd = ref(0)
			const contents = ref('')
			const showBasic = ref(false)
			const changeMaskContent = (item, index) => {
				contents.value = item.rule
				showBasic.value = true
			}
			const topData = props.topData

			const changeActInd = (item, index) => {
				actInd.value = index
				emit('changeActInd', {
					item,
					index
				})
			}

			return {
				actInd,
				topData,
				t,
				showBasic,
				contents,
				changeActInd,
				changeMaskContent
			}
		},
	})
</script>

<style lang="scss" scoped>
	.minBox {
		background-color: #fff;
		padding: 20rpx 0;
		border-radius: 20rpx;
		box-shadow: 0 0 0.21333rem 0.02667rem rgba(187, 191, 205, .3);

		.topBorder {

			border-top: 10rpx solid #eee;

			.items {
				width: 25%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				padding: 10rpx 0;
			}
		}

		.maskHead {
			background: #f74345 url('static/images/Rule-bg.webp') no-repeat 100%/100%;

			// height: 60rpx;
			img {
				width: 100%;
			}
		}

		.maskBtns {
			background-color: rgb(242, 65, 59);
			color: #fff;
			padding: 20rpx 60rpx;
			margin-bottom: 20rpx;
			border-radius: 40rpx;
			min-width: 180rpx;
			text-align: center;
		}
	}
</style>
