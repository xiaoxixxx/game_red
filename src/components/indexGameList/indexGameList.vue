<template>
	<view class="">
		<view class="game mt40" @click="jumpPage('../game/win')">
			<view class="gameList game1">
				<view class="f50 text_bold">
					{{t('win.w_i1')}}
				</view>
				<view class="mt20 f24">
					{{t('win.w_i2')}}
				</view>
				<view class="rightImg">
					<image src="../../static/images/logo-wingo.webp" style="width: 240rpx;height: 170rpx;"></image>
				</view>
			</view>
			<view class="pdtb20 pdlr30 gameBot">
				<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true" :vertical="true"
					:circular="true" style="height: 90rpx;">
					<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
						<view class="flex col_center">
							<image src="@/static/images/avatar.svg" style="width:56rpx ; height: 60rpx;"></image>
							<text class="textHiddenOne pl20" style="width: 250rpx;">Member{{item}}YOdF</text>
						</view>
						<view class="f26">
							{{parseInt(Math.random()* 100) *100 }} {{currency}}
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="game mt40">
			<!--  -->
			<view class="gameList game3" @click="jumpPage('../game/k3',1)">
				<view class="f50 text_bold">
					K3 Lotre
				</view>
				<view class="mt20 f24">
					Guess the number/big/small/odd/even
				</view>
				<view class="rightImg">
					<image src="../../static/images/logo-k333.webp" style="width: 240rpx;height: 170rpx;"></image>
				</view>
			</view>
			<view class="pdtb20 pdlr30 gameBot">
				<view class="f40 text_center text_bold">
					Coming soon
				</view>
				<!-- <swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true"
					:vertical="true" :circular="true" style="height: 90rpx;">
						<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
							<view class="flex col_center">
								<image src="@/static/images/avatar.svg"  style="width:56rpx ; height: 60rpx;"></image>
								<text class="textHiddenOne pl20" style="width: 250rpx;">MemberYOdFb</text>
							</view>
							<view class="f26">
								 317887.00 {{currency}}
							</view>
						</swiper-item>
					</swiper> -->
			</view>
		</view>

		<view class="game mt40">
			<view class="gameList game2">
				<view class="f50 text_bold">
					5D Lotre
				</view>
				<view class="mt20 f24">
					Guess the number/big/small/odd/even
				</view>
				<view class="rightImg">
					<image src="../../static/images/logo-lottery.webp" style="width: 240rpx;height: 170rpx;"></image>
				</view>
			</view>
			<view class="pdtb20 pdlr30 gameBot">
				<view class="f40 text_center text_bold">
					Coming soon
				</view>
				<!--	<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true"
				:vertical="true" :circular="true" style="height: 90rpx;">
					<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
						<view class="flex col_center">
							<image src="@/static/images/avatar.svg"  style="width:56rpx ; height: 60rpx;"></image>
							<text class="textHiddenOne pl20" style="width: 250rpx;">MemberYOdFb</text>
						</view>
						<view class="f26">
							 317887.00 {{currency}}
						</view>
					</swiper-item>
				</swiper> -->
			</view>
		</view>




	</view>

</template>


<script>
	import COUNTRY from '../../../setting.js'
	import {
		defineComponent
	} from 'vue';
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
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const currency = uni.getStorageSync('currency')
			const jumpPage = (item,index) => {
				if(item == '../game/k3'){
					if(COUNTRY.url == 'hldev.task777.com'){
						uni.navigateTo({
							url:item
						})
						return false
					}
				}else{
					uni.navigateTo({
						url:item
					})
				}
				
				
			}
			return {
				jumpPage,
				currency,
				t
			}
		},
	})
</script>

<style lang="scss" scoped>
	.game {
		box-shadow: 0 0.02667rem 0.48rem 0 rgba(203, 202, 220, .56);
		border-radius: 30rpx;

		.gameList {

			background-size: 100% 100%;
			height: 160rpx;
			position: relative;
			padding: 60rpx 0 0 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			color: #fff;

			.rightImg {
				position: absolute;
				right: -30rpx;
				top: -30rpx;
			}
		}

		.game1 {
			background: url('static/images/game-card-bg.webp') no-repeat 50%, linear-gradient(135deg, #64bfff, #2b5dfe);
		}

		.game2 {
			background: url('static/images/game-card-bg.webp') no-repeat 50%, linear-gradient(135deg, #a373ff, #7850f9);
		}

		.game3 {
			background: url('static/images/game-card-bg.webp') no-repeat 50%, linear-gradient(135deg, #fc3a3a, #ff0);
		}
	}
</style>
