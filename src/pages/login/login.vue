<template>
	<view class="  l_bg">

		<view class="topBox">
			<view class="">
				<image src="../../static/images/back.png" mode="widthFix" style="width: 54rpx;height: 54rpx;"></image>
			</view>
			<view class="mt80 between" style="">
				<text></text>
				<image src="../../static/images/headlogo.png" mode="widthFix" style="width: 240rpx;height: 60rpx;">
				</image>
			</view>
		</view>

		<view class="loginBox">
			<view class="text_center f40 text_bold title">Log in</view>
			<view class="mt40">
				<view class="color9">
					Phone number format:+91
				</view>

			</view>
			<view class="mt30">
				<view class="loginInp flex col_center">
					<view class="center" style="color: #f4453f;">
						<image src="@/static/images/phone.png" mode="widthFix" style="width:25rpx ; height: 40rpx;">
						</image>
						<text class="pl10"> +91</text>
					</view>
					<input type="number" placeholder="Phone" v-model="loginForm.phone" style="height: 100%;padding-left: 10rpx;">
				</view>

				<view class="loginInp flex col_center mt40">
					<view class="center" style="color: #f4453f;">
						<image src="@/static/images/password.png" mode="widthFix" style="width:25rpx ; height: 40rpx;">
						</image>
					</view>
					<input v-model="loginForm.password" type="number" placeholder="Password" style="height: 100%;padding-left: 20rpx;">
				</view>
			</view>

			<view class="mt60 center" style="flex-direction: column;">
				<view class="logBtns text_bold">
					log in
				</view>
				<view class="center error mt10 text_bold pdtb20">
					<view class="pr20" @click="jumpPage('./register')">register</view>
					<view style="height: 40rpx;width: 2rpx; background: #f4453f;"></view>
					<view class="pl20"  @click="jumpPage('./resetPwd')" > Retrieve Password </view>
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
		onLoad
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		computed,
		onMounted
	} from 'vue';
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const store = userStore();

	const showPwd = ref(true)
	const countryList = ref([])

	// 登录表单
	const loginForm = ref({
		phone: '',
		password: ''
	})
	const regFlag = ref(false)
	const currentInd = ref(0)
	const phoneRegFlag = ref(false)
	const country_code = ref("")
	const showPicker = ref(false)
	const showLoading = ref(null)
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'

	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}
	const isGoForgetPwd = ref(false)
	watch(loginForm, (newVal, oldVal) => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (phoneReg.test(loginForm.value.phone)) {

			phoneRegFlag.value = true
		} else {
			regFlag.value = false
			phoneRegFlag.value = false
		}

		if (phoneReg.test(loginForm.value.phone) && loginForm.value.password.length > 5 && loginForm.value.password
			.length < 25) {

			regFlag.value = true
		} else {
			regFlag.value = false
			regFlag.value = false
		}
	}, {
		deep: true
	})

	const searchCode = ref([])
	const inpSeach = ref("")
	const searchHandle = (e) => {
		if (!countryList.value) {
			return false
		}
		let temArr = []
		countryList.value.forEach(item => {
			if (item.alias.toLowerCase().includes(inpSeach.value.toLowerCase()) || item.country_code
				.toLowerCase().includes(inpSeach.value.toLowerCase())) {
				temArr.push(item)
			} else {
				return false
			}
		})
		searchCode.value = temArr
	}

	const curCountryImg = computed(() => {
			try {
				let str = country_code.value.country_code.replace('+', '')

				return `/static/guojia/${str}.png`
			} catch (e) {
				//TODO handle the exception
			}

		}
		// `/static/guojia/${country_code.country_code.replace('+','')}`
	)
	const confirm = (item, index) => {
		if (isGoForgetPwd.value) {
			let flag = item.sms_status
			if (flag == 1) {
				let code = item.code.replace("+", "")
				uni.navigateTo({
					url: './resetPwd?code=' + code
				})
			} else {
				uni.navigateTo({
					url: '../mine/service'
				})
			}
			showPicker.value = false
			return false
		}
		country_code.value = item
		currentInd.value = index
		showPicker.value = false

		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (phoneReg.test(loginForm.value.phone)) {
			phoneRegFlag.value = true
		} else {
			regFlag.value = false
			phoneRegFlag.value = false
		}
	}
	const loginHandle = () => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (!phoneReg.test(loginForm.value.phone)) {
			Toast.text(t('login.l_l3'))
			return false
		}
		if (loginForm.value.password.length < 6 || loginForm.value.password.length > 24) {
			Toast.text(t('login.l_l4'))
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			loginHandle1()
		}, 1500)
	}
	const loginHandle1 = () => {

		loginForm.value.country_code = country_code.value.text
		request({
			url: '/join/login',
			methods: 'post',
			data: loginForm.value
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('login.l_l5'))
			uni.setStorageSync('token', res.accessToken)
			setTimeout(() => {
				uni.navigateTo({
					url: '../tabbar/index'
				})
			}, 1000)
		}).catch(err => {
			showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})

		})
	}
	const forgetHandle = () => {
		isGoForgetPwd.value = true
		showPicker.value = true
	}
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const back = () => {
		history.back()
	}

	const getData = () => {
		request({
			url: '/setting/country',
			methods: 'get'
		}).then(res => {
			let tempArr = []
			for (let i = 0; i < res.length; i++) {
				res[i].text = res[i].country_code
				res[i].value = res[i].id
				tempArr.push(res[i])
			}
			searchCode.value = tempArr
			store.setCountryCode(tempArr)
			country_code.value = store.$state.countryCode[0]
			countryList.value = store.$state.countryCode
			showLoading.value.loading = false
		})

	}

	// 终于可以用了
	onShow(() => {
		let curLang = uni.getStorageSync('lang')
		uni.clearStorage()
		currentInd.value = 0
		if (curLang) {
			uni.setStorageSync('lang', curLang)
			uni.setStorageSync('setLang', true)
		} else {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				history.go(0)
			})
		}
		getData()
	})
	onMounted(() => {
		showLoading.value.loading = true
	})
</script>

<style lang="scss" scoped>
	.l_bg {
		min-height: 100vh;
		background-position: top;
		// padding: 20rpx 30rpx;
	}

	.topBox {
		height: 460rpx;
		padding: 20rpx 30rpx;
		background: url('@/static/images/login_banner.png') no-repeat 100%/100%;
	}

	.loginBox {
		border-radius: 30rpx 30rpx 0 0;
		margin-top: -50rpx;
		padding: 30rpx 50rpx;
		background-color: #fff;
	}

	.title {
		color: #750001;
	}

	.loginInp {
		border: 5rpx solid #faa09d;
		border-radius: 20rpx;
		padding: 5rpx 20rpx;
	}

	.logBtns {
		background-color: rgb(92, 186, 71);
		color: #fff;
		padding: 15rpx 120rpx;
		border-radius: 40rpx;
		box-shadow: 0 0 0.21333rem 0.02667rem rgba(92, 186, 71, .72);
	}
</style>
