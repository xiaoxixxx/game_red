<template>
	<view class="  l_bg">
		<view class="between nav" style="padding: 20rpx 30rpx;">
			<image @click="methods.back" src="../../static/images/back.png" mode="widthFix" style="width: 54rpx;height: 54rpx;"></image>
			<view class="text_white"> {{t('login.l_b2')}} </view>
			<view style="width: 54rpx;height: 54rpx;"></view>
		</view>
		<view class="pdlr70">
		
			<view style="margin-top:114rpx">
				<view class="flex between l_inpS l_inpBg pdlr30 ">
					<view class=" center l_inpS pdlr20 " style="width:100rpx" @click="showPicker = true">
						<text class=" f22" style="width: 70%;"> {{country_code.country_code}}</text>
						<IconFont name="triangle-down" color="#f4453f"></IconFont>
					</view>
					<view class="   flex col_center pl20" style="width:100%;height: 100%;">
						<input type="text" :placeholder="t('login.l_l1')" style="color:#333"
							v-model="regisForm.phone">
						<IconFont name="Check" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " color="#f4453f"></IconFont>
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

				<view class="flex between l_inpS mt40 l_inpBg pdlr30">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="ml39" :type="showPwd?'password':'text'" :placeholder="t('login.l_r1')"
							style="color:#333" v-model="regisForm.password2">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>


				<view class="flex between l_inpS  mt40" v-if="smsFlag">


					<view class=" l_inpS l_inpBg flex col_center pdlr50" style="width:100%">
						<!-- <image src="@/static/themeNum1/country/en.png" mode="widthFix" style="width:43rpx;29rpx"></image> -->
						<input type="text" :placeholder="t('login.l_r2')" style="color:#333"
							v-model="regisForm.sms_code">
					</view>

					<view class=" center  l_inpS pdlr20  ml20 text_white" style="width:220rpx;"
						:style="{background:store.$state.contentColor}" v-if="!hasSend" @click="sendHandle">
						OTP
					</view>

					<view class="l_inpBg center  l_inpS pdlr20  ml20 text_white" style="width:220rpx;"
						:style="{background:store.$state.contentColor}" v-else >
						{{hasSecond}}s
					</view>
				</view>

				<view class="flex between l_inpS mt40 l_inpBg pdlr30">
					<view>
						<image src="@/static/themeNum1/l_icon/invite.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="ml39" type="text" :placeholder="t('login.l_r3')" style="color:#333"
							v-model="regisForm.invite_code" :disabled="!canInpCode">
					</view>
				</view>

				<view class=" center l_inpS inpBtn mt40  pdlr30 text_white f32" style="margin-top:112rpx"
					:style="{background:store.$state.contentColor}" @click="methods.regisHandle(methods.regisHandle1)">
					{{t('login.l_b2')}}
				</view>
			</view>
		</view>
		<nut-popup position="right" :style="{ width: '40%', height: '100%' }" v-model:visible="showPicker">
			<view class="inpSearch  ">
				<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
				<IconFont name="search" style="margin-right: 40rpx;" size="20" color="#f64841"></IconFont>
			</view>
			<view class="listItem2" v-for="(item,index) in searchCode" :style="index == currentInd?choStyle:''"
				@click="confirm(item,index)">
				{{item.text}} {{item.name}}
			</view>
		</nut-popup>
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
	const store = userStore();
	const {
		t
	} = useI18n();

	const showPwd = ref(true)
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
			showToast.text(t('login.l_l3'))
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
		showLoading.value.loading = true
		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			showLoading.value.loading = false
			hasSend.value = true
			showToast.text(t('login.l_r8'))
		}).catch(err => {
			showLoading.value.loading = false
			showToast.text(err.message)
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
				hasSend = false
				hasSecond = 59
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
			uni.navigateTo({
				url:'./login'
			})
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
				showToast.text(t('login.l_l3'))

				return false
			}

			if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
				.length > 24 || regisForm.value.password2.length > 24) {
				showToast.text(t('login.l_l4'))
				return false
			}
			if (regisForm.value.password !== regisForm.value.password2) {
				showToast.text(t('login.l_r4'))
				return false
			}
			if (smsFlag.value && !regisForm.value.sms_code) {
				showToast.text(t('login.l_r5'))
				return false
			}
			if (codeFlag.value && !regisForm.value.invite_code) {
				showToast.text(t('login.l_r6'))
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
				showToast.text(t('login.l_r7'))
				if(sessionStorage.getItem('link')){
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url:'../linkEgg/linkEgg?key='+key
					})
					return false
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				showToast.text(err.message)
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

	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onMounted(() => {
			getSetting()
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
	.listItem2 {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		margin: 10rpx 0;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #eee;
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
