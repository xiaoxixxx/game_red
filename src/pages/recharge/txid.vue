<template>
	<view>
		<topNav :title="t('recharge.r_r1')"></topNav>
		<view class="pdlr45 mt70">
			<view class="pl14">
				Txid
			</view>
			<view class="mt34">

				<input class="inp" placeholder="txid" placeholder-class="colorC" v-model="formData.tx_id">
			</view>


			<view class="pl14 mt59">
				{{t('recharge.r_r7')}}
			</view>
			<view class="mt34 flex" style="position: relative;">

				<nut-uploader :url="uploadHost +'api/uploads'" name="cert" type="image/jpeg" @success="successHandle"
					style="border-radius: 20rpx;"></nut-uploader>

				<view class="" v-if="showImg" style="position: absolute; left: 0;">
					<image :src="uploadHost+ formData.cert" style="width: 200rpx;height: 200rpx;border-radius: 20rpx;">
					</image>
				</view>
				
				<nut-icon name="close-little"  v-if="showImg" size="15" style="position: absolute; top: -10rpx;left: 180rpx;" @click="clearImg"></nut-icon>
			</view>

			<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white mt40 f32" @click="jumpPage('../tabbar/index')"
				:style="{background:store.$state.contentColor}">
				{{t('recharge.r_r11')}}
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
	import {
		Toast,
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
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

	const uploadHost = ref("")

	const showImg = ref(false)
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				uni.switchTab({
					url: '../tabbar/index'
				})
				return false
			}
			uploadHost.value = res.upload_host
			try {
				formData.value.tx_id = res.order.tx_id
				formData.value.order_no = res.order.order_no
				formData.value.cert = res.order.cert
				if (res.order.cert) {
					showImg.value = true

				}
			} catch (e) {}
		})
	}

	const successHandle = (responseText, option, fileItem) => {
		showImg.value = false
		formData.value.cert = JSON.parse(responseText.responseText).data
	}

	const formData = ref({
		tx_id: '',
		order_no: "",
		cert: ""
	})
	const clearImg = ()=>{
		showImg.value = false
	}
	const jumpPage = (url) => {
		// uni.navigateTo({
		// 	url
		// })
		request({
			url: '/finance/usdt/recharge/cert',
			methods: 'post',
			data: {
				...formData.value
			}
		}).then(res => {
			Toast.text('Success')
			setTimeout(() => {
				uni.navigateTo({
					url: '../tabbar/index'
				})
			}, 500)
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	// 终于可以用了
	onShow(() => {
		getData()
		Locale.use('en-US', enUS);
	})

	onLoad(e => {
		if (e.order) {
			formData.value.order_no = e.order
		}
	})
</script>

<style lang="scss">

</style>
