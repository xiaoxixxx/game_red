<template>
	<view>
		<topNav :title="'USDT binding'"></topNav>
		<view class="pdlr45 mt70">
			<view>
				{{t('setting.s_s2')}}
			</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('setting.s_s2')"   placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;color: #333;" v-model="formData.address">
			</view>
			
			
			<view class="inpBtn center " style="margin-top:180rpx" :style="{background:store.$state.contentColor}" @click="saveHandle">
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
		Toast
	} from '@nutui/nutui';
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
	
	const showLoading = ref(null)
	const formData = ref({
		address: ''
	})
	const getData = () => {
		request({
			methods: 'get',
			url: 'user/attribute/wallet',
		}).then(res => {
			if (res.address) {
				formData.value.address = res.address
			} 
		})
	}
	
	const saveHandle =()=> {
		showLoading.value.loading = true
		request({
			methods: 'post',
			url: 'user/attribute/wallet',
			data: {
				address: formData.value.address
			}
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('setting.s_s3'));
			history.back()
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message);
		})
		showLoading.value.loading = false
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">

</style>
