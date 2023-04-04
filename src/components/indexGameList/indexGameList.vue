<template>
	<view class="">
		<view class="game mt40">
			<view class="gameList game1">
				<view class="f50 text_bold">
					WIN GO
				</view>
				<view class="mt20 f24">
					 Guess green/purple/red to win
				</view>
				<view class="rightImg">
					<image src="../../static/images/logo-wingo.webp" style="width: 240rpx;height: 170rpx;"></image>
				</view>
			</view>
			<view class="pdtb20 pdlr30 gameBot" >
				<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true"
				:vertical="true" style="height: 90rpx;">
					<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
						<view class="flex col_center">
							<image src="@/static/images/avatar.svg"  style="width:56rpx ; height: 60rpx;"></image>
							<text class="textHiddenOne pl20" style="width: 250rpx;">MemberYOdFb</text>
						</view>
						<view class="f26">
							<text>Có</text>
							 317887.00 ₫
						</view>
					</swiper-item>
				</swiper>
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
			<view class="pdtb20 pdlr30 gameBot" >
				<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true"
				:vertical="true" style="height: 90rpx;">
					<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
						<view class="flex col_center">
							<image src="@/static/images/avatar.svg"  style="width:56rpx ; height: 60rpx;"></image>
							<text class="textHiddenOne pl20" style="width: 250rpx;">MemberYOdFb</text>
						</view>
						<view class="f26">
							<text>Có</text>
							 317887.00 ₫
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
				
		
		<view class="game mt40">
			<view class="gameList game3">
				<view class="f50 text_bold">
					K3 Lotre
				</view>
				<view class="mt20 f24">
					 Guess the number/big/small/odd/even
				</view>
				<view class="rightImg">
					<image src="../../static/images/logo-wingo.webp" style="width: 240rpx;height: 170rpx;"></image>
				</view>
			</view>
			<view class="pdtb20 pdlr30 gameBot" >
				<swiper :autoplay="true" :interval="2000" :duration="500" :disable-touch="true"
				:vertical="true" style="height: 90rpx;">
					<swiper-item v-for="(item, index) in 5" :key="index" class="between ">
						<view class="flex col_center">
							<image src="@/static/images/avatar.svg"  style="width:56rpx ; height: 60rpx;"></image>
							<text class="textHiddenOne pl20" style="width: 250rpx;">MemberYOdFb</text>
						</view>
						<view class="f26">
							<text>Có</text>
							 317887.00 ₫
						</view>
					</swiper-item>
				</swiper>
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
			
			return {
			
			}
		},
	})
</script>

<style lang="scss" scoped>
	.game{
		box-shadow: 0 0.02667rem 0.48rem 0 rgba(203,202,220,.56);
		border-radius: 30rpx;
		.gameList{
			    
			    background-size: 100% 100%;
				height: 160rpx;
				position: relative;
				padding: 60rpx 0 0 30rpx;
				border-radius: 30rpx 30rpx 0 0;
				color: #fff;
				.rightImg{
					position: absolute;
					right: -30rpx;
					top: -30rpx;
				}
		}
		.game1{
			background: url('static/images/game-card-bg.webp') no-repeat 50%,linear-gradient(135deg,#64bfff,#2b5dfe);
		}	
		.game2{
			background: url('static/images/game-card-bg.webp') no-repeat 50%,linear-gradient(135deg,#a373ff,#7850f9);
		}
		.game3{
			background: url('static/images/game-card-bg.webp') no-repeat 50%,linear-gradient(135deg,#fc3a3a,#ff0);
		}
	}
</style>