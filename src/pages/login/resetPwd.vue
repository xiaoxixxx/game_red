<template>
	<view class="  l_bg">
		<view class="between nav" style="padding: 20rpx 30rpx;">
			<image @click="methods.back" src="../../static/images/back.png" mode="widthFix"
				style="width: 54rpx;height: 54rpx;"></image>
			<view class="text_white"> {{t('login.l_f1')}} </view>
			<view></view>
		</view>
		<view class="pdlr70">

			<view style="margin-top:114rpx">
				<view class="flex between l_inpS l_inpBg pdlr30 ">
					<view class=" center l_inpS pdlr20 " style="width:100rpx;color:#f4453f" @click="showPicker = true">
						<text class="f22" style="width: 70%;"> {{regisForm.country_code}}</text>
						<IconFont name="triangle-down"></IconFont>
					</view>
					<view class="   flex col_center pl20" style="width:100%;height: 100%;">
						<input type="text" :placeholder="t('login.l_l1')" style="color:#333" v-model="regisForm.phone">
						<IconFont name="Check" v-if="phoneRegFlag" class="phoneCheck animate__animated animate__fadeIn "
							color="green"></IconFont>
					</view>
				</view>

				<view class="flex between l_inpS mt40 l_inpBg pdlr30">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="ml39" :type="showPwd?'password':'text'" :placeholder="t('login.l_l2')"
							style="color:#333" v-model="regisForm.password">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>



				<view class="flex between l_inpS l_inpBg  mt40">

				<view>
					<image src="@/static/images/verifie.png"  style="width:25rpx ; height: 40rpx;">
					</image>
				</view>
					<view class=" l_inpS  flex col_center pdlr50" style="width:100%">
						<input type="text" :placeholder="t('login.l_r2')" style="color:#333"
							v-model="regisForm.sms_code">
					</view>
					<view v-if="!hasSend" @click="sendHandle" class=" center  l_inpS pdlr20  ml20 text_white"
						style="width:220rpx;" :style="{background:store.$state.contentColor}">
						OTP
					</view>
					<view v-else class="l_inpBg center  l_inpS pdlr20  ml20 text_white" style="width:220rpx;"
						:style="{background:store.$state.contentColor}">
						{{hasSecond}}s
					</view>
				</view>


				<view @click="forgetHandle" class="inpBtn center l_inpS mt40  pdlr30 text_white"
					style="margin-top:112rpx" :style="{background:store.$state.contentColor}">
					{{t('login.l_f2')}}
				</view>

			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		showToast
	} from '@nutui/nutui';
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const store = userStore();


	const showPwd = ref(true)
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const back = () => {
		history.back()
	}
	const regisForm = ref({
		phone: '',
		password: '',
		sms_code: '',
		country_code: ""
	})
	const btnDis = ref(false)
	// 　const { t } = useI18n()
	const country_code = ref('')
	const showPicker = ref(false)

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {


		if (regisForm.value.password.length < 6 || regisForm.value.password.length > 24) {
			return false
		}
		if (!regisForm.value.phone || !regisForm.value.sms_code) {
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}

	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {
		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: regisForm.value.country_code,
			type: 2
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			showToast.text(t('login.l_f3'))
		}).catch(err => {
			showToast.text(err.message)
		})
	}

	const timer = ref(null)
	const forgetHandle = () => {
		showLoading.value.loading = true
		request({
			url: 'join/forget',
			methods: 'post',
			data: regisForm.value
		}).then(res => {
			showToast.text(t('login.l_f4'))
			showLoading.value.loading = true
			setTimeout(() => {
				uni.navigateTo({
					url: './login'
				})
			}, 1000)
		}).catch(err => {
			showLoading.value.loading = false
			showToast.text(err.message)
		})
	}
	const startTimer = () => {
		timer.value = setInterval(() => {
			if (hasSecond.value == 0) {
				clearInterval(timer.value)
				hasSecond = false
			}
			hasSecond.value--;
		}, 1000)

	}
	const currentInd = ref(0)

	const showLoading = ref(null)

	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../mine/langSetting'
			})
		},

		openPwdHandle(type) {
			if (type == 'second') {
				openCpwd.value = !openCpwd.value
			}
			if (type == 'first') {
				openPwd.value = !openPwd.value
			}
		}
	};

	const countryList = ref([])


	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onLoad((e) => {
		if (e.code) {
			regisForm.value.country_code = "+" + e.code
		}

	})
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
	}

	.l_inpBg {
		border: 5rpx solid #faa09d;
		border-radius: 20rpx;
		padding: 5rpx 20rpx;
	}

	.logBtns {
		color: #fff;
		padding: 15rpx 120rpx;
		border-radius: 40rpx;
	}
</style>
