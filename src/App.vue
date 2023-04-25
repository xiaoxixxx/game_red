<script>
	import pageAnimation from '@/components/yy-PageAnimation';
	import {
		useI18n
	} from "vue-i18n";


	export default {
		mixins: [pageAnimation],
		onLaunch: function() {

		},
		onShow: function() {
			// console.log('App Show')


		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	@font-face {
		// font-family: "PingFangSC";
		// src: url('@/static/PingFang.ttf');
	}

	/*每个页面公共css */
	.nut-navbar {
		padding: 0 !important;
	}

	.maskItem img,
	.mt70 img {
		width: calc(100% - 45rpx) !important;
		max-height: 100% !important;
	}

	page {
		font-family: Avenir,Helvetica,Arial,sans-serif;
		background-color: #f5f5f5;
		color: #2c3e50;
		font-size: 30rpx;
		animation: .3s linear all;
		// text-transform: capitalize;
	}

	.secondClo {
		font-weight: bold;
		color: #2A5F64;
	}

	.maskContent {
		img {
			width: 100%;
		}
	}

	.inp {
		padding: 44rpx 49rpx;
		background: #FFFFFF;
		box-shadow: 0px 1rpx 51rpx 0px rgba(64, 46, 197, 0.05);
		border-radius: 30rpx;
		font-size: 28rpx;
	}

	.btns {
		transition: .3s linear all;
	}

	.collapse-content {
		font-size: 23rpx !important;
		color: #666666 !important;
	}

	.collapse-icon-title {
		font-size: 32rpx !important;
		color: #000 !important;
	}

	.drawTable-name{
		color: #000 !important;
	}
	// .turntable{
	// 	background-color: #B3DDF7;
	// 	border-radius: 30%;
	// }
	.nut-noticebar__page {
		border-radius: 10rpx !important;
		height: 80rpx !important;
		padding-left: 10rpx !important;
		// .left-icon {
		// 	margin: 0 20rpx 0 0 !important;
		// }
	}

	.nut-input-number {
		input {
			border: none !important;
			margin: 0 10rpx;
		}
	}

	uni-page {
		max-width: 790rpx;
		margin: 0 auto;
		// display: webkit-box;
		// overflow: auto;
		// paddingb-bottom: 10rpx;
		// margin-bottom: -10rpx; // overflow: hidden;
		// font-family: SF UI Text;
	}

	::-webkit-scrollbar {
		scrollbar-face-color: #B3DDF7;
		scrollbar-shadow-color: #B3DDF7;
		scrollbar-highlight-color: #B3DDF7;
		scrollbar-3dlight-color: #EBEBE4;
		scrollbar-darkshadow-color: #EBEBE4;
		scrollbar-track-color: #F4F4F0;
		scrollbar-arrow-color: #000000;
	}

	// 签名大小
	.nut-signature .nut-signature-inner {
		height: 70vh !important;
	}

	.sign {
		.nut-button {
			width: 90% !important;
			margin: 20rpx 5% !important;
			height: 100rpx;
			border-radius: 20rpx;
		}
	}

	.desc {
		img {
			width: 100% !important;
		}
	}

	.nut-button--primary {
		background-color: rgb(22, 183, 57) !important;
	}
</style>
