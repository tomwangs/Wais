<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="banner">
				<image src="../../static/zc.png" mode="widthFix" class="zc"></image>
				<view class="sol">
					SolanaFi
				</view>
				<view class="tips">
					创造更多奇迹
				</view>
			</view>
			<view class="invite">
				<view class="itit">
					邀请好友
				</view>
				<view class="share">
					<view class="url">
						https://modao.cc/app/mwOYpXO...
					</view>
					<image src="../../static/copy.png" class="copy"></image>
				</view>
			</view>
			<view class="card">
				<view class="top">
					<view class="null">

					</view>
					<view class="ctits">
						<view class="ctit">
							{{stakes.count}} SOL
						</view>
						<view class="mzy">
							我的质押
						</view>
					</view>
					<view class="more" @click="profits">
						<view class="jls">
							记录
						</view>
						<image src="../../static/more.png" class="micon"></image>
					</view>
				</view>
				<view class="items">
					<view class="item">
						<image src="../../static/sol.png" class="sols"></image>
						<view class="num">
							100.00
						</view>
						<view class="oper">
							<button class="sale">卖出</button>
						</view>
					</view>
					<view class="item">
						<image src="../../static/sol.png" class="sols"></image>
						<view class="num">
							100.00
						</view>
						<view class="oper">
							<button class="recs">领取</button>
						</view>
					</view>
				</view>
				<view class="rules">
					<view class="rule">
						<view class="point">

						</view>
						<view class="rnr">
							卖出的F1全部销毁，51%的 U 回流底池
						</view>
					</view>
					<view class="rule">
						<view class="point">

						</view>
						<view class="rnr">
							每次领取的U会扣1%的手续费，10U起
						</view>
					</view>
				</view>
				<view class="status">
					<view class="snum">
						23,434 U / 1,212,323U
					</view>
					<view class="stis">
						未卖出收益/已领取收益
					</view>
				</view>
				<view class="process">
					<progress :percent="precent" stroke-width="8" background-color="#323438" active-color="#00E3A5" />
					<view class="sys">
						<view class="sy">
							3倍收益
						</view>
						<view class="sy">
							6倍收益
						</view>
					</view>
				</view>
			</view>
			<view class="cards">
				<view class="tops">
					<view class="mzt">
						我的直推
					</view>
					<view class="lvs">
						节点等级：F2
					</view>
				</view>
				<view class="table">
					<view class="th">
						<view class="td">
							地址
						</view>
						<view class="td">
							质押
						</view>
						<view class="td">
							总算力
						</view>
					</view>
					<view class="tbody" v-if="directList.length > 0">
						<view class="tr" v-for="(item,index) in directList" :key="index">
							<view class="td">
								{{item.address | addrFilter}}
							</view>
							<view class="td">
								{{item.stake}}
							</view>
							<view class="td">
								{{item.power}}
							</view>
						</view>
					</view>
					<view class="nulls" v-else>
						<view class="empty">
							<image src="../../static/null.png" class="nuicon"></image>
							<view class="data">
								{{$t('common.txt3')}}
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
				precent: 30,
				directList: '',
				stakes: ''
			}
		},
		filters: {
			addrFilter(value) {
				if (value) {
					const start = value.slice(0, 4);
					const end = value.slice(-6);
					return `${start}***${end}`;
				}
			},
			cutOutNums(num) {
				if (num) {
					return cutOutNum(num, 2)
				} else {
					return '0.00'
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		created() {
			this.getShares();
			this.getSatkeInfo()
		},
		methods: {
			getShares() {
				const data = {
					page: 1,
					pageSize: 10000
				}
				this.$apiFun.getShareList(data).then(res => {
					this.directList = res.data.list;
				})
			},
			getSatkeInfo() {
				this.$apiFun.getZyInfos().then(res => {
					if (res.code == 200) {
						this.stakes = res.data;
					}
				})
			},
			profits() {
				uni.navigateTo({
					url: '/pages/profit/profit'
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		padding: 50rpx;
	}

	.banner {
		padding-top: 80rpx;
		text-align: center;
	}

	.zc {
		width: 96%;
		animation: moveVs 4s linear infinite;
	}

	.sol {
		text-align: center;
		color: #16F194;
		font-size: 90rpx;
		line-height: 100rpx;
		font-family: 'Bold';
		font-weight: 600;
		margin-top: -140rpx;
		z-index: 2;
		position: relative;
	}

	.tips {
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		z-index: 2;
		position: relative;
		padding-top: 20rpx;
	}

	.invite {
		margin-top: 60rpx;
		text-align: center;
	}

	.itit {
		color: #bfc4d3;
		font-size: 30rpx;
	}

	.share {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #000000;
		border-radius: 52rpx;
		border: 1rpx solid #505050;
		margin-top: 30rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
	}

	.url {
		color: #00E3A5;
		padding-right: 40rpx;
	}

	.copy {
		width: 36rpx;
		height: 36rpx;
	}

	.card {
		margin-top: 60rpx;
		background: #101114;
		border-radius: 30rpx;
		border: 1rpx solid #505050;
		padding: 40rpx;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx dotted #505050;
		padding-bottom: 40rpx;
	}

	.ctits {
		text-align: center;
	}

	.ctit {
		color: #fff;
		font-size: 44rpx;
		font-family: 'Bold';
		line-height: 70rpx;
	}

	.mzy {
		color: #00E3A5;
	}

	.null {
		width: 100rpx;
	}

	.more {
		width: 100rpx;
		color: #00E3A5;
		display: flex;
		align-items: center;
	}

	.micon {
		width: 34rpx;
		height: 34rpx;
	}

	.sols {
		width: 60rpx;
		height: 60rpx;
	}

	.items {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.item {
		background: #000000;
		border-radius: 30rpx;
		padding: 40rpx 20rpx;
		text-align: center;
		width: 48%;
		box-sizing: border-box;
	}

	.num {
		color: #fff;
		padding: 20rpx 0;
		font-size: 34rpx;
	}

	.sale {
		background-color: #9947FF;
		font-size: 28rpx;
		font-weight: 600;
		border-radius: 20rpx;
	}

	.recs {
		background-color: #00E3A5;
		font-size: 28rpx;
		font-weight: 600;
		border-radius: 20rpx;
	}

	.rules {
		background: #000000;
		border-radius: 16rpx;
		border: 1rpx solid #9947FF;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
	}

	.point {
		width: 10rpx;
		height: 10rpx;
		border-radius: 100%;
		background-color: #9947FF;
		margin-right: 14rpx;
	}

	.rule {
		display: flex;
		align-items: center;
		color: #9947FF;
		font-size: 26rpx;
		padding: 6rpx 0;
	}

	.status {
		padding: 60rpx 0;
		text-align: center;
		border-bottom: 1rpx dotted #505050;
		border-top: 1rpx dotted #505050;
		margin: 60rpx 0;
	}

	.snum {
		color: #fff;
		font-size: 36rpx;
	}

	.stis {
		color: #00E3A5;
		font-size: 26rpx;
		padding-top: 16rpx;
	}

	/deep/.uni-progress-bar {
		border-radius: 30rpx;
		overflow: hidden;
	}

	/deep/.uni-progress-inner-bar {
		border-radius: 30rpx;
	}

	.sys {
		display: flex;
		justify-content: space-between;
		color: #fff;
		padding: 30rpx 0;
		font-size: 28rpx;
	}

	.cards {
		margin-top: 60rpx;
		background: #101114;
		border-radius: 30rpx;
		border: 1rpx solid #505050;
	}

	.tops {
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
	}

	.mzt {
		color: #fff;
		font-size: 34rpx;
		font-weight: 600;
	}

	.lvs {
		color: #fff;
		font-size: 30rpx;
	}

	.th {
		display: flex;
		align-items: center;
		color: #fff;
		border-bottom: 1rpx solid #505050;
		border-top: 1rpx solid #505050;
		padding: 26rpx 0;
	}

	.td {
		width: 33.3%;
		text-align: center;
	}

	.tbody {
		padding: 10rpx 20rpx;
		height: 400rpx;
		overflow-y: auto;
	}

	.tr {
		display: flex;
		align-items: center;
		color: #fff;
		padding: 24rpx 0;
		border-bottom: 1rpx dotted #505050;
		opacity: 0.8;
	}

	.tr:last-child {
		border-bottom: unset;
	}
</style>