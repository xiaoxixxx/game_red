<template>
	<div class="loader" v-if="loading">
		<div class="cssload-container">
			<div class="cssload-shaft1"></div>
			<div class="cssload-shaft2"></div>
			<div class="cssload-shaft3"></div>
			<div class="cssload-shaft4"></div>
			<div class="cssload-shaft5"></div>
			<div class="cssload-shaft6"></div>
			<div class="cssload-shaft7"></div>
			<div class="cssload-shaft8"></div>
			<div class="cssload-shaft9"></div>
			<div class="cssload-shaft10"></div>
		</div>
	</div>
</template>

<script setup>
	
	const loading = ref(false)
	defineExpose({loading})
	
</script>

<style lang="scss">
	.loader {
	    background: rgba(0,0,0,0.8);
	    bottom: 0;
	    left: 0;
	    overflow: hidden;
	    position: fixed;
	    right: 0;
	    top: 0;
	    z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.cssload-container *, .cssload-container *:before, .cssload-container *:after{
		box-sizing: border-box;
			-o-box-sizing: border-box;
			-ms-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
	}
	
	.cssload-container {
		margin: 49px auto;
		position: relative;
		width: 97px;
		height: 97px;
	}
	.cssload-container > div {
		float: left;
		background: rgb(185,108,255);
		height: 100%;
		width: 5px;
		margin-right: 1px;
		display: inline-block;
	}
	
	.cssload-container {
		position: relative;
		width: 97px;
		height: 97px;
	}
	.cssload-container > div {
		background: transparent;
		border: 8px solid transparent;
		border-color: rgb(185,108,255) transparent;
		border-radius: 100%;
			-o-border-radius: 100%;
			-ms-border-radius: 100%;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate"("-50%, -50%")";
			-o-transform: translate"("-50%, -50%")";
			-ms-transform: translate"("-50%, -50%")";
			-webkit-transform: translate"("-50%, -50%")";
			-moz-transform: translate"("-50%, -50%")";
		transform: translate(-50%, -50%) rotate(0);
			-o-transform: translate(-50%, -50%) rotate(0);
			-ms-transform: translate(-50%, -50%) rotate(0);
			-webkit-transform: translate(-50%, -50%) rotate(0);
			-moz-transform: translate(-50%, -50%) rotate(0);
		animation: cssload-wave 2.3s infinite ease-in-out;
			-o-animation: cssload-wave 2.3s infinite ease-in-out;
			-ms-animation: cssload-wave 2.3s infinite ease-in-out;
			-webkit-animation: cssload-wave 2.3s infinite ease-in-out;
			-moz-animation: cssload-wave 2.3s infinite ease-in-out;
	}
	.cssload-container .cssload-shaft1 {
		animation-delay: 0.12s;
			-o-animation-delay: 0.12s;
			-ms-animation-delay: 0.12s;
			-webkit-animation-delay: 0.12s;
			-moz-animation-delay: 0.12s;
		width: 19px;
		height: 19px;
	}
	.cssload-container .cssload-shaft2 {
		animation-delay: 0.23s;
			-o-animation-delay: 0.23s;
			-ms-animation-delay: 0.23s;
			-webkit-animation-delay: 0.23s;
			-moz-animation-delay: 0.23s;
		width: 24px;
		height: 24px;
	}
	.cssload-container .cssload-shaft3 {
		animation-delay: 0.35s;
			-o-animation-delay: 0.35s;
			-ms-animation-delay: 0.35s;
			-webkit-animation-delay: 0.35s;
			-moz-animation-delay: 0.35s;
		width: 34px;
		height: 34px;
	}
	.cssload-container .cssload-shaft4 {
		animation-delay: 0.46s;
			-o-animation-delay: 0.46s;
			-ms-animation-delay: 0.46s;
			-webkit-animation-delay: 0.46s;
			-moz-animation-delay: 0.46s;
		width: 44px;
		height: 44px;
	}
	.cssload-container .cssload-shaft5 {
		animation-delay: 0.58s;
			-o-animation-delay: 0.58s;
			-ms-animation-delay: 0.58s;
			-webkit-animation-delay: 0.58s;
			-moz-animation-delay: 0.58s;
		width: 54px;
		height: 54px;
	}
	.cssload-container .cssload-shaft6 {
		animation-delay: 0.69s;
			-o-animation-delay: 0.69s;
			-ms-animation-delay: 0.69s;
			-webkit-animation-delay: 0.69s;
			-moz-animation-delay: 0.69s;
		width: 63px;
		height: 63px;
	}
	.cssload-container .cssload-shaft7 {
		animation-delay: 0.81s;
			-o-animation-delay: 0.81s;
			-ms-animation-delay: 0.81s;
			-webkit-animation-delay: 0.81s;
			-moz-animation-delay: 0.81s;
		width: 73px;
		height: 73px;
	}
	.cssload-container .cssload-shaft8 {
		animation-delay: 0.92s;
			-o-animation-delay: 0.92s;
			-ms-animation-delay: 0.92s;
			-webkit-animation-delay: 0.92s;
			-moz-animation-delay: 0.92s;
		width: 78px;
		height: 78px;
	}
	.cssload-container .cssload-shaft9 {
		animation-delay: 1.04s;
			-o-animation-delay: 1.04s;
			-ms-animation-delay: 1.04s;
			-webkit-animation-delay: 1.04s;
			-moz-animation-delay: 1.04s;
		width: 83px;
		height: 83px;
	}
	.cssload-container .cssload-shaft10 {
		animation-delay: 1.15s;
			-o-animation-delay: 1.15s;
			-ms-animation-delay: 1.15s;
			-webkit-animation-delay: 1.15s;
			-moz-animation-delay: 1.15s;
		width: 88px;
		height: 88px;
	}
	
	
	
	@keyframes cssload-wave {
		50% {
			transform: translate(-50%, -50%) rotate(360deg);
			border-color: rgb(86,215,198) transparent;
		}
	}
	
	@-o-keyframes cssload-wave {
		50% {
			-o-transform: translate(-50%, -50%) rotate(360deg);
			border-color: rgb(86,215,198) transparent;
		}
	}
	
	@-ms-keyframes cssload-wave {
		50% {
			-ms-transform: translate(-50%, -50%) rotate(360deg);
			border-color: rgb(86,215,198) transparent;
		}
	}
	
	@-webkit-keyframes cssload-wave {
		50% {
			-webkit-transform: translate(-50%, -50%) rotate(360deg);
			border-color: rgb(86,215,198) transparent;
		}
	}
	
	@-moz-keyframes cssload-wave {
		50% {
			-moz-transform: translate(-50%, -50%) rotate(360deg);
			border-color: rgb(86,215,198) transparent;
		}
	}
</style>