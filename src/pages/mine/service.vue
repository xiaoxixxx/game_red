<template>
	<view>
		<topNav :title="t('mine.m_c5')"></topNav>
		
		<view class="topbg"></view>
		<view class="botList">
			<view class="pdlr30 pt50">
			
				<view class="items mb40" v-for="item in serviceList"   @click="jumpWin(item)">
					<view class="flex col_center">
						<!-- 	<image v-if="item ==1" src="../../static/themeNum1/icon/tg.png" mode="widthFix"
							style="width: 78rpx;height: 78rpx;">
						</image> -->
						<image :src="item.avatar" mode="widthFix"
							style="width: 78rpx;height: 78rpx;">
						</image>
						<view class="mglr40 f34">
							{{item.service_name}} ({{item.start_working_time}} -
							{{item.end_working_time}})
						</view>
					</view>
					<nut-icon name="right"></nut-icon>
			
				</view>
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

	const choStyle = {
		background: store.$state.contentColor,
		color: "#fff",

	}
	const noChoStyle = {
		background: "#fff",
		color: "#000"
	}

	const {
		t
	} = useI18n();
	const serviceList = ref([])
	const showLoading = ref(null)
	const getData = () => {
		try {
			showLoading.value.loading = true

		} catch (e) {
			//TODO handle the exception
		}
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			res.list ? serviceList.value = res.list : ''
		})
		setTimeout(() => {
			showLoading.value.loading = false
		}, 500)
	}
	
	const jumpWin = (item)=>{
		window.open(item.contact_link)
	}
	// 终于可以用了
	onMounted(() => {
		getData()
	})
</script>

<style lang="scss">
	.items {
		height: 128rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 0 0  10rpx 1rpx #ccc;
	}
	
	
	.topbg{
		background: url('/static/images/serviceBg.png') no-repeat 100%/100%;
		width: 100%;
		height: 600rpx;
		background-position: top;
		margin-top: -100rpx;
	}
	.botList{
		height: calc( 100vh - 500rpx);
		overflow: scroll;
		background-color: #fff;
		margin-top: -150rpx;
		border-radius: 50rpx 50rpx 0 0;
	}
</style>
