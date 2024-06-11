<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="top wow fadeInDown">
				<image src="../../static/back.png" class="back" @click="back"></image>
				<view class="title">
					记录
				</view>
				<view class="null">

				</view>
			</view>
			<view class="tabs wow fadeInUp">
				<view :class="active == 0?'tabed':'tab'" @click="zysy">
					质押收益
				</view>
				<view :class="active == 1?'tabed':'tab'" @click="xjdsy">
					小节点收益
				</view>
				<view :class="active == 2?'tabed':'tab'" @click="djdsy">
					大节点收益
				</view>
				<view :class="active == 3?'tabed':'tab'" @click="cjsy">
					层级收益
				</view>
				<view :class="active == 4?'tabed':'tab'" @click="wdsy">
					维度收益
				</view>
				<view class="tabn">

				</view>
			</view>
			<view class="card">
				<view class="ctit">
					Dimension income
				</view>
				<view class="table">
					<view class="tr">
						<view class="time">
							2023/12/23
						</view>
						<view class="nums">
							<image src="../../static/usdt.png" class="usd"></image>
							<view class="dels">
								-12,323 USDT
							</view>
						</view>
					</view>
					<view class="tr">
						<view class="time">
							2023/12/23
						</view>
						<view class="nums">
							<image src="../../static/usdt.png" class="usd"></image>
							<view class="dels">
								-12,323 USDT
							</view>
						</view>
					</view>
					<view class="tr">
						<view class="time">
							2023/12/23
						</view>
						<view class="nums">
							<image src="../../static/usdt.png" class="usd"></image>
							<view class="dels">
								-12,323 USDT
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	import Menu from '@/components/menu/menu.vue';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				active: 0,
				list: []
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				const data = {
					page: 1,
					pageSize: 10
				}
				this.$apiFun.getZyBills(data).then(res => {
					this.list = res.data.list;
				})
			},
			zysy() {
				this.active = 0;
			},
			xjdsy() {
				this.active = 1;
			},
			djdsy() {
				this.active = 2;
			},
			cjsy() {
				this.active = 3;
			},
			wdsy() {
				this.active = 4;
			},
			back() {
				let canNavBack = getCurrentPages();
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			}
		}
	}
</script>

<style scoped>
	.main {
		padding: 50rpx;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 140rpx;
	}

	.back {
		width: 32rpx;
		height: 34rpx;
	}

	.title {
		color: #fff;
		font-size: 36rpx;
		font-family: 'Bold';
	}

	.null {
		width: 32rpx;
	}

	.tabs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 40rpx;
		justify-content: space-between;
	}

	.tab {
		background: #101114;
		border-radius: 14rpx;
		border: 1rpx solid #505050;
		color: #fff;
		width: 30%;
		text-align: center;
		padding: 10rpx 0;
		margin: 20rpx 0;
	}

	.tabed {
		background: #101114;
		border-radius: 14rpx;
		border: 1rpx solid #00E3A5;
		color: #16F194;
		width: 30%;
		text-align: center;
		padding: 10rpx 0;
	}

	.tabn {
		width: 30%;
	}

	.card {
		margin-top: 40rpx;
		background: #101114;
		border-radius: 30rpx;
		border: 1rpx solid #505050;
	}

	.ctit {
		color: #fff;
		font-size: 34rpx;
		font-family: 'Bold';
		border-bottom: 1rpx dotted #505050;
		padding: 40rpx;
	}

	.table {
		padding: 20rpx 40rpx;
		height: 800rpx;
		overflow-y: auto;
	}

	.tr {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx 0;
		border-bottom: 1rpx dotted #505050;
	}

	.tr:last-child {
		border-bottom: unset;
	}

	.time {
		color: #b0b5c3;
	}

	.nums {
		display: flex;
		align-items: center;
	}

	.usd {
		width: 40rpx;
		height: 40rpx;
	}

	.dels {
		color: #fff;
		padding-left: 20rpx;
		font-size: 26rpx;
	}
</style>