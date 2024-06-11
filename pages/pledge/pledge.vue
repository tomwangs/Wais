<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="back wow fadeIn">
				<view class="mname">
					质押
				</view>
			</view>
			<view class="card wow slideInLeft">
				<view class="boxs">
					<view class="box">
						<view class="opers">
							<image src="../../static/del.png" class="del" @click="delSol"></image>
							<view class="token">
								<image src="../../static/sol.png" class="sol"></image>
								<view class="tname">
									SOL
								</view>
							</view>
							<image src="../../static/add.png" class="add" @click="addSol"></image>
						</view>
						<view class="nums">
							<input class="in" v-model="sol" />
						</view>
						<progress :percent="precent" stroke-width="8" background-color="#323438"
							active-color="#9947FF" />
						<view class="yue">
							余额: {{balance | cutOutNums}}
						</view>
					</view>
				</view>
				<view class="oper">
					<button class="btn" @click="pledge" v-if="zy == 0">质押</button>
					<button class="btn" v-if="zy == 1">质押中...</button>
				</view>
			</view>
			<view class="card wow slideInRight">
				<view class="boxss">
					<view class="box">
						<view class="token">
							<image src="../../static/sol.png" class="sol"></image>
							<view class="tname">
								SOL
							</view>
						</view>
						<view class="ings">
							<view class="ing">
								<view class="tit">
									锁仓中
								</view>
								<view class="inum">
									{{infos.lock}}
								</view>
							</view>
							<view class="ing">
								<view class="tit">
									已释放
								</view>
								<view class="inum">
									{{infos.unLock}}
								</view>
							</view>
						</view>
						<view class="operc">
							<button class="rec">领取</button>
						</view>
					</view>
				</view>
			</view>
			<view class="tips wow fadeInUp">
				<view class="tits">
					提示
				</view>
				<view class="tcont">
					质押收益达到3倍以后才会退回质押的金额
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Connection,
		PublicKey,
		Transaction,
		SystemProgram,
		LAMPORTS_PER_SOL
	} from '@solana/web3.js';
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	import Menu from '@/components/menu/menu.vue';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				precent: '',
				sol: 1,
				balance: '',
				recAddress: '',
				zy: 0,
				infos: '',
				rpc: 'https://rpc.ankr.com/solana_devnet/62dda2675fb44c9059568e753a09d689a944abb7b95480388a0f4f58b3e5786b'
			}
		},
		filters: {
			cutOutNums(num) {
				if (num) {
					return cutOutNum(num, 4)
				} else {
					return '0.00'
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		onShow() {
			this.getUserInfo();
			this.getSatkeInfo();
			this.getZyAddress()
		},
		watch: {
			'$store.state.token': function(newData) {
				if (newData) {
					this.getUserInfo();
				} else {
					uni.showToast({
						title: this.$t('common.txt2'),
						icon: 'error'
					})
				}
			}
		},
		methods: {
			async getUserInfo() {
				const wallet = await window.solana.connect();
				const address = wallet.publicKey.toString();
				const connection = new Connection(this.rpc);
				const publicKey = new PublicKey(address);
				const yues = await connection.getBalance(publicKey);
				this.balance = parseFloat(yues / LAMPORTS_PER_SOL);
				this.precent = parseFloat(this.sol / this.balance * 100).toFixed(2)
			},
			getZyAddress() {
				this.$apiFun.getZyAddr().then(res => {
					this.recAddress = res.data;
				})
			},
			async pledge() {
				if (this.recAddress) {
					try {
						this.zy = 1;
						const connection = new Connection(this.rpc);
						const wallet = await window.solana.connect();
						const address = wallet.publicKey.toString();
						const fromPublicKey = new PublicKey(address);
						const toPublicKey = new PublicKey(this.recAddress);
						const amount = parseFloat(this.sol * LAMPORTS_PER_SOL);
						const recentBlockhash = await connection.getRecentBlockhash();
						const feePayerPublicKey = fromPublicKey;
						const transaction = new Transaction({
							recentBlockhash: recentBlockhash.blockhash,
							feePayer: feePayerPublicKey
						}).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey,
								lamports: amount
							})
						);
						const signature = await window.solana.signTransaction(transaction);
						const txid = await connection.sendRawTransaction(signature.serialize());
						if (txid) {
							this.zy = 0;
							uni.showToast({
								title: '质押成功',
								icon: 'success'
							});
						} else {
							this.zy = 0;
						}
					} catch (error) {
						console.log('err', error)
						this.zy = 0;
					}
				} else {
					this.getZyAddress();
				}
			},
			getSatkeInfo() {
				this.$apiFun.getZyInfos().then(res => {
					if (res.code == 200) {
						this.infos = res.data;
					}
				})
			},
			delSol() {
				if (this.sol > 1) {
					this.sol = parseFloat(this.sol - 1);
					this.precent = parseFloat(this.sol / this.balance * 100).toFixed(2)
				} else {
					uni.showToast({
						title: '质押数量需≥1',
						icon: 'error'
					})
				}
			},
			addSol() {
				if (this.sol > 0 && parseFloat(this.sol) <= parseFloat(this.balance - 1)) {
					this.sol = parseFloat(this.sol + 1);
					this.precent = parseFloat(this.sol / this.balance * 100).toFixed(2)
				} else {
					uni.showToast({
						title: '余额不足',
						icon: 'error'
					})
				}
			},
			back() {
				let canNavBack = getCurrentPages();
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			},
		}
	}
</script>

<style scoped>
	.main {
		padding: 50rpx;
	}

	.back {
		padding-top: 140rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.bicon {
		width: 32rpx;
		height: 34rpx;
	}

	.mname {
		color: #fff;
		font-size: 36rpx;
		font-family: 'Bold';
		padding-left: 6rpx;
	}

	.card {
		margin: 50rpx 0;
	}

	.boxs {
		border-radius: 20rpx;
		padding: 1rpx;
		box-sizing: border-box;
		background: linear-gradient(90deg, rgba(153, 71, 255, 1), rgba(22, 241, 148, 1));
	}

	.box {
		border-radius: 20rpx;
		background: #000000;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 40rpx;
	}

	.opers {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.add {
		width: 60rpx;
		height: 60rpx;
	}

	.del {
		width: 60rpx;
		height: 60rpx;
	}

	.token {
		display: flex;
		align-items: center;
	}

	.sol {
		width: 46rpx;
		height: 46rpx;
	}

	.tname {
		padding-left: 14rpx;
		color: #fff;
		font-family: 'Bold';
		font-size: 32rpx;
	}

	.nums {
		margin: 40rpx 0;
	}

	/deep/.uni-progress-bar {
		border-radius: 30rpx;
		overflow: hidden;
	}

	/deep/.uni-progress-inner-bar {
		border-radius: 30rpx;
	}

	.yue {
		color: #fff;
		text-align: right;
		padding: 20rpx 0;
	}

	.in {
		font-size: 36rpx;
		text-align: center;
		color: #fff;
		font-family: 'Bold';
		border-radius: 20rpx;
		padding: 20rpx 0;
		background-color: #191919;
	}

	.oper {
		margin-top: 80rpx;
		margin-bottom: 40rpx;
	}

	.btn {
		background: #9947FF;
		font-size: 30rpx;
		font-weight: 'Bold';
		padding: 8rpx 0;
		font-weight: bold;
	}

	.boxss {
		border-radius: 20rpx;
		padding: 1rpx;
		box-sizing: border-box;
		background: linear-gradient(90deg, #384c42, #3e594c);
	}

	.ings {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0;
	}

	.ing {
		background: #000000;
		border-radius: 20rpx;
		border: 1rpx solid #505050;
		padding: 30rpx;
		width: 48%;
		box-sizing: border-box;
	}

	.tit {
		color: #9397A3;
	}

	.inum {
		color: #fff;
		font-size: 36rpx;
		padding-top: 10rpx;
	}

	.operc {}

	.rec {
		background: #00E3A5;
		font-size: 30rpx;
		font-weight: 'Bold';
		padding: 8rpx 0;
		font-weight: bold;
	}

	.tips {
		margin-top: 50rpx;
	}

	.tits {
		color: #FFBB00;
		font-size: 32rpx;
		padding-bottom: 30rpx;
	}

	.tcont {
		background: #101114;
		border-radius: 25rpx;
		border: 1rpx solid #FFBB00;
		color: #FFBB00;
		padding: 30rpx;
		font-size: 26rpx;
	}
</style>