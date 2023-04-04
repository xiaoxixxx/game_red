<template>
	<view class="  l_bg">
		<view class="between nav" style="padding: 20rpx 30rpx;">
			<image @click="methods.back" src="../../static/images/back.png" mode="widthFix" style="width: 54rpx;height: 54rpx;"></image>
			<view class="text_white"> Register </view>
			<view></view>
			<!-- <image src="../../static/images/audio.webp" ode="widthFix" style="width: 54rpx;height: 54rpx;"></image> -->
			<!-- <image src="../../static/images/audio.png" mode="widthFix" style="width: 54rpx;height: 54rpx;"></image> -->
		</view>

		<view class="loginBox">
			<view class="mt20">
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
					<input type="number" placeholder="Phone" style="height: 100%;padding-left: 10rpx;">
				</view>

			

				<view class="loginInp flex col_center mt40">
					<view class="center" style="color: #f4453f;">
						<image src="@/static/images/password.png" mode="widthFix" style="width:25rpx ; height: 40rpx;">
						</image>
					</view>
					<input type="number" placeholder="Password" style="height: 100%;padding-left: 20rpx;">
				</view>
				
				<view class="loginInp flex col_center mt40">
					<view class="center" style="color: #f4453f;">
						<image src="@/static/images/invite.png" mode="widthFix" style="width:25rpx ; height: 40rpx;">
						</image>
					</view>
					<input type="number" placeholder="Referral code" style="height: 100%;padding-left: 20rpx;">
				</view>
			</view>
			
			<view class="mt60 flex">
				 <nut-checkbox v-model="checkbox1" label="复选框" ></nut-checkbox>
				I agree  <text class="pl20 error">Privacy Policy</text>
			</view>
			
			<view class="mt60 center" style="flex-direction: column;">
				<view class="logBtns text_bold">
					create command
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
		Toast
	} from '@nutui/nutui';
	import {
		useI18n
	} from "vue-i18n";
	const store = userStore();
	const {
		t
	} = useI18n();

	const showPwd = ref(true)
	const checkbox1 = ref(false)
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const back = () => {
		history.back()
	}
	const openPwd = ref(true) // 密码可见
	const openCpwd = ref(true) // 第二次密码可见

	// 登录表单
	const regisForm = ref({
		phone: '',
		password: '',
		password2: '',
		invite_code: '',
		sms_code: '',
	})
	const btnDis = ref(false)
	// 　const { t } = useI18n()
	const country_code = ref('')
	const showPicker = ref(false)

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {
		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

		if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
			.length > 24 || regisForm.value.password2.length > 24) {
			regFlag.value = false
			return false
		}
		if (regisForm.value.password !== regisForm.value.password2) {
			regFlag.value = false
			return false
		}
		if (smsFlag.value && !regisForm.value.sms_code) {
			regFlag.value = false
			return false
		}
		if (codeFlag.value && !regisForm.value.invite_code) {
			regFlag.value = false
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
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
	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (!phoneReg.test(regisForm.value.phone)) {
			Toast.text(t('login.l_l3'))
			return false
		}

		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: country_code.value.text,
			type: 1
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			Toast.text(t('login.l_r8'))
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const openPicker = () => {
		if (canChoCountry.value) {
			showPicker.value = true
		}
	}
	const timer = ref(null)
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

	const confirm = (item, index) => {
		country_code.value = item
		currentInd.value = index
		showPicker.value = false
		regFlag.value = false
		country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false


		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

	}
	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../mine/langSetting'
			})
		},
		regisHandle(fn) {
			// if(!regFlag.value){
			// 	return false
			// }

			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				Toast.text(t('login.l_l3'))

				return false
			}

			if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
				.length > 24 || regisForm.value.password2.length > 24) {
				Toast.text(t('login.l_l4'))
				return false
			}
			if (regisForm.value.password !== regisForm.value.password2) {
				Toast.text(t('login.l_r4'))
				return false
			}
			if (smsFlag.value && !regisForm.value.sms_code) {
				Toast.text(t('login.l_r5'))
				return false
			}
			if (codeFlag.value && !regisForm.value.invite_code) {
				Toast.text(t('login.l_r6'))
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				fn()
			}, 1500)
		},
		regisHandle1() {
			regisForm.value.country_code = country_code.value.text;
			request({
				url: '/join/register',
				methods: 'post',
				data: regisForm.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_r7'))
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})

		},



	};

	const smsFlag = ref(false)
	const codeFlag = ref(false)
	const countryList = ref([])
	const getSetting = () => {
		request({
			url: 'setting/register',
			methods: 'get'
		}).then(res => {

			// 邀请码 状态 1.必填 0.选填
			res.registerInviteCode.status == 1 ? codeFlag.value = true : codeFlag.value = false
		})
		if (store.$state.countryCode.length > 0) {
			countryList.value = store.$state.countryCode
			country_code.value = countryList.value[0]
			searchCode.value = countryList.value
			// /状态 1.开启 0关闭 短信
			country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
			// console.log(country_code.value);
		} else {
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
				countryList.value = store.$state.countryCode
				// showLoading.value.loading = false
				if (canChoCountry.value) {
					country_code.value = store.$state.countryCode[0]
				} else {
					store.$state.countryCode.forEach(item => {
						let str = "+" + countryVal.value
						if (item.country_code == str) {
							country_code.value = item
						}
					})
					if (!country_code.value) {
						country_code.value = store.$state.countryCode[0]
					}
				}
				country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
			})

		}
	}
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
	// 终于可以用了
	onShow(() => {
		getSetting()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1500)
	})
	const canInpCode = ref(true)
	const canChoCountry = ref(true)
	const countryVal = ref(0)
	onLoad((e) => {
		if (e.code) {
			regisForm.value.invite_code = e.code
			canInpCode.value = false

		}
		if (e.country) {
			canChoCountry.value = false
			countryVal.value = e.country
		}
		if (!uni.getStorageSync('setLang')) {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				history.go(0)
			})
		}
	})
</script>

<style lang="scss" scoped>
	.nav {
		background: linear-gradient(90deg, #cd0103, #f64841);
	}

	.l_bg {
		min-height: 100vh;
		background-position: top;
	}

	.topBox {
		height: 460rpx;
		padding: 20rpx 30rpx;
		background: url('@/static/images/login_banner.png') no-repeat 100%/100%;
	}

	.loginBox {
		border-radius: 30rpx 30rpx 0 0;
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

	.loginOtp {
		border: 6rpx solid #faa09d;
		border-radius: 20rpx;
		padding-left: 20rpx;
		height: 80rpx;
	}

	.logBtns {
		background-color: rgb(92, 186, 71);
		color: #fff;
		padding: 15rpx 120rpx;
		border-radius: 40rpx;
		box-shadow: 0 0 0.21333rem 0.02667rem rgba(92, 186, 71, .72);
	}

	.otp {
		padding: 0 20rpx;
		background-color: #ffebeb;
		height: 100%;
		line-height: 80rpx;
		border-radius: 0 15rpx 15rpx 0;
	}
</style>
