<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
	<view class="tqb-tabbar ">
		<view class="tqb-tabbar-body animate__fadeInUp animate__animated" style="animation-duration:.3s">
			<view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index"
				@click="switchClick(item, index)">
				<view v-if="index !== 2" class="tabbar-item-body">
					<view class="tabbar-item-icon">
						<image :src="index===activeIndex ?item.selectPath:item.iconPath"
							style="width:45rpx; height: 45rpx;"></image>
					</view>
					<view class='tab-bar-text' :class="index===activeIndex ? 'actCho': ''">{{ item.text }}
					</view>
				</view>
				<view v-else class="add-icon">
					<image :src="item.iconPath" style="width: 115rpx; height: 115rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";

	export default defineComponent({
		props: ["activeIndex"],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const activeIndex = ref(props.activeIndex)
			const tabBarList = ref([{
				text: 'Home',
				iconPath: '/static/tabbar/home1.png',
				selectPath: '/static/tabbar/home.png',
				pagePath: '/',
			}, {
				text: 'Activity',
				iconPath: '/static/tabbar/check1.png',
				selectPath: '/static/tabbar/check.png',
				pagePath: '/pages/tabbar/news',
			}, {
				text: '',
				iconPath: '/static/tabbar/invite.png',
				pagePath: '/pages/tabbar/team'
			}, {
				text: 'wallet',
				iconPath: '/static/tabbar/wallet1.png',
				selectPath: '/static/tabbar/wallet.png',
				pagePath: '/pages/tabbar/wallet',
			}, {
				text: 'me',
				iconPath: '/static/tabbar/me1.png',
				selectPath: '/static/tabbar/me.png',
				pagePath: '/pages/tabbar/mine',
			}])

			const switchClick = (data, index) => {
				if (index == activeIndex.value) {
					return;
				}
				activeIndex.value == index;
				uni.navigateTo({
					url: data.pagePath
				});
			}
			return {
				tabBarList,
				switchClick,
				activeIndex
			}
		},
	})
</script>

<style lang="scss" scoped>
	.tqb-tabbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-width: 790rpx;
		z-index: 1000;
	}

	.tqb-tabbar-body {
		border-top: 2px solid #e1e1e1;
		background: #fff;
		height: 76rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 100;
		padding: 22rpx 0;
		width: 100%;

		.tqb-tabbar-item {
			flex: 1;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;

			// width: 18%;
			.tabbar-item-body {}

			.tabbar-item-icon {
				display: flex;
				justify-content: center;
				transition: all 0.6s ease;

			}

			.tab-bar-text {
				font-size: 20rpx;
				font-weight: 400;
				margin-top: 10rpx;
				color: #333;
			}


			.add-icon {
				// width: 230rpx;
				// height: 230rpx;
				position: relative;
				top: -25rpx;
			}


		}
	}

	.actCho {
		color: #f2413b !important;
	}

	// .tqb-tabbar-popup {
	// 	position: fixed;
	// 	bottom: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.49) 32%, rgba(0, 0, 0, 0.66) 100%);
	// 	height: 660rpx;

	// 	.mask-close {
	// 		position: absolute;
	// 		top: 32rpx;
	// 		right: 32rpx;
	// 	}

	// 	.popup-body {
	// 		display: flex;
	// 		flex-wrap: wrap;
	// 		position: absolute;
	// 		top: 142rpx;
	// 		width: 100%;

	// 		.popup-item {
	// 			width: 20%;
	// 			margin-bottom: 20rpx;
	// 			text-align: center;

	// 			.popup-item-icon {
	// 				display: flex;
	// 				justify-content: center;
	// 			}

	// 			.popup-item-text {
	// 				font-size: 24rpx;
	// 				color: #fff;
	// 			}
	// 		}
	// 	}
	// }
</style>
