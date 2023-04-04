<template>
	<view>
		<view class="">

			<view class="proItem mb41" v-for="item in recData" @click="jumpPage(item)">
				<view style="padding: 35rpx 20rpx;">
					<view class="flex">
						<view style="height: 200rpx;width: 200rpx; border-radius: 20rpx;overflow: hidden;" class="center">
							<image :src="item.full_poster" style="width: 100%; height: 100%; border-radius: 20rpx;"></image>

						</view>
						<view class="ml35" style="flex: 1;">
							<view class="textHiddenTwo" style="width: 100%;">
								{{item.title}}
							</view>
							<view class="mt16 between">
								<!-- // 1 未开始  2  已结束  3  进行中 -->
								<view style="color: #FD6260; width: 240rpx; " v-if="item.hasStart  == 1">
									<view class="f20">
										{{t('construct.c_c2')}}：
									</view>
									<view class="mt24 f36">
										{{item.showTime}}
									</view>
								</view>
								<view style="color: #FD6260; width: 240rpx; " v-if="item.hasStart  == 3">
									<view class="f20">
										{{t('construct.c_c1')}}：
									</view>
									<view class="mt24 f36">
										{{item.showTime}}
									</view>
								</view>

								<view style="color: #FD6260; width: 240rpx; " v-if="item.hasStart  == 2">
									<view class="f20">
										{{t('construct.c_c2')}}：
									</view>
									<view class="mt24 f36">
										{{item.showTime}}
									</view>
								</view>

								<!-- //状态：1.可预购  2.等级不满足  3.已售罄  4.已预购 -->
								<view class="rightBox pre_pay center flex-col" v-if="item.status == 1">
									<image src="../../static/themeNum1/icon/pre_pay.png"
										style="width: 40rpx; height: 42rpx;"></image>
									<view class="text_white f20 mt14">
										{{t('construct.c_c13')}}
									</view>
								</view>

								<view class="rightBox join center flex-col" v-if="item.status == 2">
									<image src="../../static/themeNum1/icon/join.png"
										style="width: 40rpx; height: 42rpx;">
									</image>
									<view class="text_white f20 mt14">
										{{t('construct.c_t3')}}
									</view>
								</view>

								<view class="rightBox out center flex-col" v-if="item.status == 3">
									<image src="../../static/themeNum1/icon/out.png"
										style="width: 40rpx; height: 42rpx;">
									</image>
									<view class="text_white f20 mt14">
										{{t('construct.c_t4')}}
									</view>
								</view>

								<view class="rightBox join center flex-col" v-if="item.status == 4">
									<image src="../../static/themeNum1/icon/pre_suc.png"
										style="width: 40rpx; height: 42rpx;"></image>
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
								<view class="text_bold">{{item.profit_per }}</view>
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
				<view class="between f20" style="background-color: #FCE7E6;padding: 20rpx 0;">
					<view class="between " style="width: 40%;padding: 0 5%;border-right: 1rpx solid #FFC8C7;">
						<view>{{t('construct.c_t8')}}</view>
						<view style="color: #FD6260;" class="f28 text_bold">
							{{item.fake_sold}}
						</view>
					</view>
					<view class="between" style="width: 40%;padding: 0 5%;">
						<view>{{t('construct.c_t9')}}</view>

						<view style="color: #FD6260;" class="f28 text_bold">
							{{item.price_per}}
						</view>
					</view>
				</view>
				<view class="pre">
					<image src="../../static/themeNum1/img/pre.png" mode="widthFix"
						style="width: 139rpx;height: 139rpx;">
					</image>
				</view>

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
		props: [],
		name: "preRecord",
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const store = userStore()
			const recData = ref([])

			const jumpPage = item => {
				if (item.hasStart == 2) {
					return false
				}

				uni.navigateTo({
					url: '../construct/index?id=' + item.id + '&pre=1'
				})
			}

			const pages = ref({
				page: 1,
				size: 10
			})
			// /获取数据
			const getData = (page) => {
				request({
					methods: 'get',
					url: 'invest/preList',
					data: pages.value
				}).then(res => {
					recData.value.push(...res.project.data)

					recData.value.forEach((item, index) => {
						// 1 未开始  2  已结束  3  进行中
						// res.time - item.start_time  
						// 是否开始了
						if (res.time > item.end_time) {
							item.hasStart = 2 //已结束
							item.showTime = "sale out"
						} else if (res.time < item.start_time) {
							// 未开始
							item.hasStart = 1 //未开始 
							item.showTime = ""
							item.seconds = item.start_time - res.time
							startTimer(item)
						} else if (res.time > item.start_time) {
							item.hasStart = 3 //进行中
							item.showTime = ""
							item.seconds = item.end_time - res.time
							startTimer(item)
						}
					})
					
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
				getData()
			}
			const timer = ref(null)
			const startTimer = (item) => {
				timer.value = setInterval(() => {
					if (item.seconds === 0) {
						getData()
						item.showTime =t('construct.c_t4')
						clearInterval(timer.value);
					}
					item.seconds--;
					const hours = Math.floor(item.seconds / 3600);
					const minutes = Math.floor((item.seconds % 3600) / 60);
					const seconds = item.seconds % 60;
					item.showTime =
						`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
				}, 1000);
			}

			onMounted(() => {
				getData()
				if (timer.value) {
					clearInterval(timer.value)
				}
			})

			onUnmounted(() => {
				if (timer.value) {
					clearInterval(timer.value)
				}
			})

			return {
				recData,
				store,
				t,
				hasMore,
				pages,
				loadMoreData,
				getData,
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
		margin-bottom: 41rpx;

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
