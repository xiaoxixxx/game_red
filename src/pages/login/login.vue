<template>
	<view>

		<view class="topBox">
			<view class=" pt30 between">
				<image src="../../static/images/back.png" mode="widthFix" style="width: 54rpx;height: 54rpx;"
					@click="back"></image>
			</view>
		</view>

		<view class="  l_bg loginBox">
			<view class="pdlr40">
				<view class="pt30  text_bold text_center title f40">
					{{t('login.l_b1')}}
				</view>
				<view class="mt60">
					<view class="flex between l_inpS l_inpBg pdlr30 ">
						<view class=" center l_inpS pdlr20 " style="width:100rpx" @click="showPicker = true">
							<text class=" f22" style="width: 70%;"> {{country_code.country_code}}</text>
							<IconFont name="triangle-down" color="#f4453f"></IconFont>
						</view>
						<view class="   flex col_center pl20" style="width:100%;height: 100%;">
							<input type="text" :placeholder="t('login.l_l1')" style="color:#333"
								v-model="loginForm.phone">
							<IconFont name="Check" v-if="phoneRegFlag"
								class="phoneCheck animate__animated animate__fadeIn " color="#f4453f"></IconFont>
						</view>
					</view>

					<view class="flex between l_inpS mt40 l_inpBg pdlr30">
						<view>
							<image src="@/static/images/password.png" style="width:40rpx ; height: 40rpx;">
							</image>
						</view>
						<view class="l_inpS  flex col_center " style="width:100%">
							<input class="ml39" :type="showPwd?'password':'text'" :placeholder="t('login.l_l2')"
								style="color:#333" v-model="loginForm.password">
						</view>
						<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
							@click="showPwd = !showPwd" v-if="!showPwd"></image>
						<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
							@click="showPwd = !showPwd" v-if="showPwd"></image>
					</view>

					<view class="mt30 f24 flex" :style="{color:store.$state.contentColor}"
						style="flex-direction: row-reverse;">
						<view @click="forgetHandle">
							{{t('login.l_l6')}}
						</view>
					</view>




					<view class=" center l_inpS inpBtn mt40  pdlr30 text_white f32" style="margin-top:114rpx"
						:style="{background:store.$state.contentColor}" @click="loginHandle">
						{{t('login.l_b1')}}
					</view>

					<view class=" center l_inpS mt40 inpBtn  pdlr30 text_white mt40 f32 signBtn">
						<view @click="jumpPage('./register')" style="height: 100%;width: 100%;" class="center">
							{{t('login.l_b2')}}
						</view>
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
		showToast 
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
			showToast .text(t('login.l_l3'))
			return false
		}
		if (loginForm.value.password.length < 6 || loginForm.value.password.length > 24) {
			showToast .text(t('login.l_l4'))
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
			showToast .text(t('login.l_l5'))
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
	onMounted(() => {
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
	page{
		background: #fff;
	}
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

	.topBox {
		height: 280rpx;
		padding: 20rpx 30rpx;
		background: url('@/static/images/loginBg.png') no-repeat 100%/100%;
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

	.l_inpBg {
		border: 5rpx solid #faa09d;
		border-radius: 20rpx;
		padding: 5rpx 20rpx;
	}

	.signBtn{
		border: 5rpx solid #faa09d;
		color: #f4453f;
	}
</style>
