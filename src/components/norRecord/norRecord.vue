<template>
	<view>
		<view class="proItem mb41" v-for="item in recData" @click="jumpPage('../construct/index?id='+item.id)">
			<view style="padding: 35rpx 20rpx;">
				<view class="flex">
					<view style="height: 200rpx;width: 200rpx; border-radius: 20rpx;overflow: hidden;" class="center">
						<image :src="item.full_poster" style="width: 100%; height: 100%; border-radius: 20rpx;"></image>
					</view>
					<view class="ml35" style="flex: 1;">
						<view class="textHiddenTwo" style="width: 100%;height: 90rpx;">
							{{item.title}}
						</view>
						<view class="mt16 between">


							<view style="width: 240rpx; ">

								<nut-progress style="height: 28rpx;"
									:percentage="Number(((item.sale_panel>item.total_panel?item.total_panel:item.sale_panel) /item.total_panel * 100).toFixed(2))"
									:is-show-percentage="true" :text-inside="false"
									:text-color="store.$state.contentColor" :stroke-color="store.$state.contentColor" />
								<view class="f20 mt23">
									{{item.sale_panel>item.total_panel?item.total_panel:item.sale_panel }}/{{item.total_panel}}
								</view>
							</view>

							<!-- 右边盒子 -->
							<view class="rightBox join center flex-col" v-if="item.status == 1">
								<image src="../../static/themeNum1/icon/join.png" style="width: 40rpx; height: 42rpx;">
								</image>
								<view class="text_white f20 mt14">
									{{t('construct.c_t3')}}
								</view>
							</view>

							<view class="rightBox pre_pay center flex-col" v-if="item.status == 2">
								<image src="../../static/themeNum1/icon/pre_pay.png"
									style="width: 40rpx; height: 42rpx;">
								</image>
								<view class="text_white f20 mt14">
									{{t('construct.c_c13')}}
								</view>
							</view>
							<!-- <view class="rightBox pre_pay center flex-col" v-if="item.status == 1">
							<image src="../../static/themeNum1/icon/pre_pay.png"
								style="width: 40rpx; height: 42rpx;"></image>
							<view class="text_white f20 mt14">
								Pay deposit
							</view>
						</view> -->

							<!-- <view class="rightBox join center flex-col" v-if="item.status == 2">
							<image src="../../static/themeNum1/icon/join.png" style="width: 40rpx; height: 42rpx;">
							</image>
							<view class="text_white f20 mt14">
								Participate
							</view>
						</view> -->

							<view class="rightBox out center flex-col" v-if="item.status == 3">
								<image src="../../static/themeNum1/icon/out.png" style="width: 40rpx; height: 42rpx;">
								</image>
								<view class="text_white f20 mt14">
									{{t('construct.c_t4')}}
								</view>
							</view>

							<view class="rightBox join center flex-col" v-if="item.status == 4">
								<image src="../../static/themeNum1/icon/pre_suc.png"
									style="width: 40rpx; height: 42rpx;">
								</image>
								<view class="text_white f20 mt14">
									{{t('construct.c_c14')}}
								</view>
							</view>

						</view>
					</view>
				</view>
				<view class="mt39 pt34" style="border-top: 1rpx solid #eee;">
					<view class="flex between text_center">
						<view>
							<view class="text_bold">{{item.profit_per}}</view>
							<view class="color9">{{t('construct.c_t5')}}</view>
						</view>
						<view>
							<view class="text_bold">{{item.period}}</view>
							<view class="color9" v-if="item.is_experience == 1">  {{t('construct.c_c4')}}</view>
							<view class="color9" v-else-if="item.is_experience == 0">  {{t('construct.c_c5')}}</view>
							<view class="color9" v-else>  {{t('construct.c_t6')}}</view>
						</view>
						<view>
							<view class="text_bold">{{item.price}}</view>
							<view class="color9">{{t('construct.c_t7')}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- saleOut -->
			<view class="saleOut" v-if="item == 3">
				<image src="../../static/themeNum1/img/saleOut.png" mode="widthFix"
					style="width: 139rpx;height: 139rpx;">
				</image>
			</view>
		</view>

		<view class="loadData text_center mt80 color9">
			<view v-if="hasMore" @click="loadMoreData">{{t('rec.r_a2')}}</view>
			<view v-else>- {{t('rec.r_a1')}} -</view>
		</view>
	</view>

</template>


<script>
	import {
		defineComponent
	} from 'vue';
	import request from '../../../comm/request.ts';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		userStore
	} from "@/store/themeNum.js";
	export default defineComponent({
		props: ['vipId', ],
		name: "preRecord",
		setup(props, {
			emit
		}) {

			const store = userStore()

			const recData = ref([])
			const {
				t
			} = useI18n();
			const jumpPage = url => {
				uni.navigateTo({
					url
				})
			}
			const vipId = ref(props.vipId)
			const pages = ref({
				page: 1,
				size: 10,
			})
			// /获取数据
			const getData = async (id) => {
				request({
					methods: 'get',
					url: 'invest/list',
					data: {
						...pages.value,
						vipId:id,
					}
				}).then(res => {
					vipId.value = id
			
					recData.value.push(...res.project.data)
					if(res.project.data.length <10){
						hasMore.value = false
					}else{
						hasMore.value = true
						pages.value.page += 1
					}
				})
			}
			const hasMore = ref(null)
			const loadMoreData = () => {
				// console.log(vipId.value);
				getData(vipId.value)
			}
			return {
				recData,
				store,
				t,hasMore,
				loadMoreData,
				getData,
				pages,
				jumpPage
			}
		},
	})
</script>
<style lang="scss" scoped>
	.proItem {

		box-shadow: 0rpx 1rpx 20rpx 1rpx rgba(197, 197, 197, 0.35);
		border-radius: 10rpx;
		background-color: #fff;
		position: relative;

		.rightBox {
			width: 158rpx;
			padding: 15rpx 0;
			// height: 110rpx;
			border-radius: 10rpx;

			.text_white {
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
			}
		}

		.join {
			background-color: #FFA115;
		}

		.out {
			background-color: #999999;
		}

		.pre_pay {
			// background-color: #FFA115;
			background-color: #FD6260;
		}

		.saleOut {
			position: absolute;
			top: 0;
			left: 0;
		}

		.pre {
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.color9 {
		margin-top: 24rpx;
		color: #999;
		font-size: 20rpx;
	}
</style>
