<script>
	export default {
		
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #000000;
		font-family: 'Regular';
		max-width: 800rpx;
		margin: 0 auto;
	}
	
	.nulls {
		height: 500rpx;
		display: flex;
		justify-content: center;
	}

	.empty {
		text-align: center;
		padding-top: 200rpx;
		opacity: 0.8;
	}

	.data {
		text-align: center;
		color: #9397A3;
		font-size: 24rpx;
		padding-top: 10rpx;
	}
	
	.nuicon {
		width: 64rpx;
		height: 72rpx;
	}
	
	@keyframes moveDown {
		0% {
			transform: translateY(0);
		}
	
		50% {
			transform: translateY(-20rpx);
		}
	
		100% {
			transform: translateY(0);
		}
	}
	
	@keyframes moveVs {
		0% {
			transform: scale(1);
		}
	
		50% {
			transform: scale(1.03);
		}
	
		100% {
			transform: scale(1);
		}
	}

	/* #endif */
</style>
