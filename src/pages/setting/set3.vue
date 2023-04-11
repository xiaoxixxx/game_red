<template>
	<view>
			<topNav :title="t('setting.s_p1')"></topNav>
		<view class="pdlr45 mt70">
			<view v-if="showOld">
				<view class="" >
					{{t('setting.s_p2')}}
				</view>
				<view class="settingInp mt30 between">
					<input :type="showPwd?'password':'text'" :placeholder="t('setting.s_p2')"
						placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;color: #333;" v-model="formData.old_password">
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>
			</view>

			<view class="mt55">
				{{t('setting.s_p4')}}
			</view>
			<view class="settingInp mt30 between">

				<input :type="showPwd?'password':'text'" :placeholder="t('setting.s_p4')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="formData.password">

				<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="!showPwd"></image>
				<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="showPwd"></image>
			</view>

			<view class="mt55">
				{{t('setting.s_p5')}}
			</view>
			<view class="settingInp mt30 between">
				<input :type="showPwd?'password':'text'" :placeholder="t('setting.s_p5')" v-model="formData.password2"
					placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;color: #333;">
				<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="!showPwd"></image>
				<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="showPwd"></image>
			</view>

			<view class="inpBtn center" style="margin-top:180rpx" :style="{background:store.$state.contentColor}" @click="saveHandle">
				{{t('all.a_c2')}}
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
	import {
		showToast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const showPwd = ref(true)
	const {
		t
	} = useI18n();
	
	const showLoading = ref(null)
	const formData = ref({
		old_password: '',
		password: '',
		password2: '',
		type: 1
	})
	// 
	const showOld = ref(false)
	const getData = () => {
		request({
			url: 'user/attribute/password',
			methods: 'get',
			data: {}
		}).then(res => {
			if(res.payment_password){
				showOld.value = true
			}
		})
	}
	
	const saveHandle =()=> {
		if (!formData.value.old_password && showOld.value) {
			showToast.text(t('setting.s_p6'));
			return false
		}
		if (formData.value.password.length < 6 || formData.value.password.length > 24) {
			showToast.text(t('setting.s_p7'))
			return false
		}
		if (formData.value.password !== formData.value.password2) {
			showToast.text(t('setting.s_p8'));
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			saveHandle1()
		}, 1500)
	}
	const saveHandle1 = ()=> {
		request({
			methods: 'post',
			url: 'user/attribute/password',
			data: formData.value
		}).then(res => {
			showLoading.value.loading = false
			showToast.text(t('setting.s_s3'));
			history.back()
	
		}).catch(err => {
			showLoading.value.loading = false
			showToast.text(err.message);
		})
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss" scoped>
	.between {
		padding-right: 30rpx;
	}
</style>
