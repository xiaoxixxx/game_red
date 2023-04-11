<template>
	<view>
		<topNav :title="t('setting.s_b1')"></topNav>
		<view class="pdlr45 mt70">
			<view>
				{{t('setting.s_b2')}}
			</view>
			<view class="settingInp mt30 between pr35" style="width: 400rpx;">
				<input type="text" disabled="" :placeholder="t('setting.s_b2')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 80%;color: #333;" @click="show = true" v-model="bName">
				<IconFont name="down-arrow" :color="store.$state.contentColor"></IconFont>
			</view>

			<view class="mt55">
				{{t('setting.s_b4')}}
			</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('setting.s_b4')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="formData.bank_num">
			</view>

			<view class="mt55">
				{{t('setting.s_b5')}}
			</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('setting.s_b5')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="formData.account_holder">
			</view>

			<view class="mt55">
				{{t('setting.s_b6')}}
			</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('setting.s_b6')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="formData.other_param_1">
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('setting.s_b7')}}
				</view>
				<view class="mt34 settingInp">
					<input placeholder-class="inpPlaceholder" :placeholder="t('setting.s_b7')" v-model="formData.phone"
						style="height: 100%;width: 100%;color: #333;">
				</view>
			</view>


			<view class="inpBtn center" style="margin-top:180rpx" :style="{background:store.$state.contentColor}"
				@click="saveHandle">
				{{t('all.a_c2')}}
			</view>
		</view>



		<nut-popup position="bottom" v-model:visible="show">
			<nut-picker :text="'text2'" :columns="columns" @confirm="confirm" :cancel-text="'cancel'"
				:ok-text="'confirm'" @cancel="show = false" />
		</nut-popup>
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

	const {
		t
	} = useI18n();

	const show = ref(false)
	const columns = ref([])
	const showLoading = ref(null)
	const formData = ref({
		bankId: "",
		bank_num: '',
		account_holder: '',
		phone: '',
		other_param_1: ""
	})
	const bName = ref("")
	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		bName.value = selectedOptions[0].text
		formData.value.bankId = selectedOptions[0].value
	}

	const canEdit = ref(false)
	const getData = () => {
		request({
			url: 'user/attribute/bankcard',
			methods: 'get',
		}).then(res => {
			// columns.value = res.banks
			if (res.banks.length > 0) {
				let temArr = []
				for (let i = 0; i < res.banks.length; i++) {
					res.banks[i].text = res.banks[i].name
					res.banks[i].value = res.banks[i].id
					temArr.push(res.banks[i])
				}
				columns.value = temArr
			}

			res.bank_card_can_edit == 1 ? canEdit.value = true : canEdit.value = false

			if (res.bankcard) {
				formData.value.account_holder = res.bankcard.account_holder
				formData.value.phone = res.bankcard.phone
				formData.value.bank_num = res.bankcard.bank_num
				formData.value.bankId = res.bankcard.bankId
				try {
					formData.value.other_param_1 = res.bankcard.other_param_1
				} catch (e) {
					//TODO handle the exception
				}
				for (let i in columns.value) {
					if (columns.value[i].id == formData.value.bankId) {
						bName.value = columns.value[i].text
					}
				}
			}
		})
	}

	const saveHandle = () => {
		// if (!showTag.value) {
		// 	return false
		// }
		console.log(formData.value);
		if (!formData.value.bankId) {
			showToast.text(t('setting.s_b2'));
			return false
		}

		if (!formData.value.bank_num) {
			showToast.text(t('setting.s_b4'));
			return false
		}
		if (!formData.value.account_holder) {
			showToast.text(t('setting.s_b5'));
			return false
		}
		if (!formData.value.phone) {
			showToast.text(t('setting.s_b7'));
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			saveHandle1()
		}, 2000)
	}
	const saveHandle1 = () => {

		request({
			url: 'user/attribute/bankcard',
			methods: 'post',
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

<style lang="scss">

</style>
