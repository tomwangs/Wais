<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="part">
				<view class="back wow fadeIn">
					<image src="../../static/back.png" class="bicon" @click="back"></image>
					<view class="mname">
						{{$t('node.txt1')}}
					</view>
					<view class="null">

					</view>
				</view>
				<view class="banner wow flipInX">
					<image src="../../static/node.png" mode="widthFix" class="nicon"></image>
				</view>
				<view class="card wow slideInLeft">
					<view class="title">
						{{$t('node.txt2')}}
					</view>
					<view class="infos">
						<view class="bt">
							{{$t('node.txt3')}}
						</view>
						<view class="inps">
							<view class="token">
								<image src="../../static/sol.png" class="sol"></image>
								<view class="tname">
									SOL
								</view>
							</view>
							<input class="in" v-model="small" disabled />
							<view class="unit">
								SOL
							</view>
						</view>
						<view class="balance">
							<view class="left">
								{{$t('node.txt15')}}: {{nodes.node1}}
							</view>
							<view class="yues">
								{{$t('node.txt4')}} {{balance | cutOutNums}}
							</view>
						</view>
						<view class="oper">
							<button class="btns" v-if="bitty == 0" @click="beforeS">{{$t('node.txt6')}}</button>
							<button class="btns" v-if="bitty == 1">{{$t('node.txt13')}}...</button>
						</view>
					</view>
				</view>
				<view class="card wow slideInRight">
					<view class="titleb">
						{{$t('node.txt5')}}
					</view>
					<view class="infos">
						<view class="bt">
							{{$t('node.txt3')}}
						</view>
						<view class="inps">
							<view class="token">
								<image src="../../static/sol.png" class="sol"></image>
								<view class="tname">
									SOL
								</view>
							</view>
							<input class="in" v-model="big" disabled />
							<view class="unit">
								SOL
							</view>
						</view>
						<view class="balance">
							<view class="left">
								{{$t('node.txt15')}}: {{nodes.node2}}
							</view>
							<view class="yues">
								{{$t('node.txt4')}} {{balance | cutOutNums}}
							</view>
						</view>
						<view class="oper">
							<button class="btnb" v-if="large == 0" @click="beforeB">{{$t('node.txt6')}}</button>
							<button class="btnb" v-if="large == 1">{{$t('node.txt13')}}...</button>
						</view>
					</view>
				</view>
				<view class="retit">
					{{$t('node.txt16')}}:
				</view>
				<view class="ref">
					<view class="refaddr">
						{{referrer.address | refFilter}}
					</view>
				</view>
			</view>
			<view class="invite">
				<view class="link wow fadeInDown">
					<view class="mname">
						{{$t('node.txt7')}}
					</view>
					<view class="urls">
						<view class="url">
							{{share}}
						</view>
						<view class="copy" id="copyBtn" @click="copy" :data-clipboard-text="share"
							data-clipboard-action="copy">
							{{$t('common.txt5')}}
						</view>
					</view>
					<view class="mname">
						{{$t('node.txt8')}}
					</view>
				</view>
				<view class="table wow fadeInUp">
					<view class="th">
						<view class="tdi">

						</view>
						<view class="tda">
							{{$t('node.txt9')}}
						</view>
						<view class="td">
							{{$t('node.txt10')}}
						</view>
						<view class="td">
							{{$t('node.txt11')}}
						</view>
					</view>
					<view class="tbody" v-if="nodeList.length > 0">
						<view class="tr" v-for="(item,index) in nodeList" :key="index">
							<view class="tdi">
								<span class="one" v-if="index == 0">{{index + 1}}</span>
								<span class="two" v-else-if="index == 1">{{index + 1}}</span>
								<span class="three" v-else-if="index == 2">{{index + 1}}</span>
								<span v-else>{{index + 1}}</span>
							</view>
							<view class="tda">
								{{item.address | addrFilter}}
							</view>
							<view class="td">
								{{item.min}}
							</view>
							<view class="td">
								{{item.max}}
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
	import {
		Connection,
		PublicKey,
		Transaction,
		SystemProgram,
		LAMPORTS_PER_SOL
	} from '@solana/web3.js';
	import Clipboard from 'clipboard';
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
				solana: '',
				share: 'https://solfi.me?inviter=',
				small: '',
				big: '',
				nodeList: [],
				balance: 0,
				bitty: 0,
				large: 0,
				smallReceiver: 'EheZ6BZ9iov1XD7fWjkB1aKwZJ2cKFpCfFkEmfpA3uzs',
				bigReceiver: '2RQqB3G6bB4ZmmpNoy35qcZB3BMBJKJWyzA7jB1xEv6u',
				users: '',
				referrer: '',
				nodes: '',
				rpc: 'https://rpc.ankr.com/solana/3ee045b76a80a4d3c89c9aa2874527fa9bde7210cbe26faa5c91ea25d8e722c8'
				// rpc: 'https://solana-mainnet.core.chainstack.com/19ec0eff065b68829026c6374579215b',
				// rpc: 'https://rpc.ankr.com/solana_devnet/62dda2675fb44c9059568e753a09d689a944abb7b95480388a0f4f58b3e5786b'
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
			refFilter(value) {
				if (value) {
					const start = value.slice(0, 16);
					const end = value.slice(-16);
					return `${start}***${end}`;
				}
			},
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
			this.getNodePrice();
			const token = this.$store.state.token;
			if (token) {
				this.getShare();
				this.getUsers();
				this.getDirect()
			} else {
				uni.showToast({
					title: this.$t('common.txt2'),
					icon: 'error'
				})
			}
		},
		watch: {
			'$store.state.token': function(newData) {
				if (newData) {
					this.getShare();
					this.getUserInfo();
					this.getUsers();
					this.getDirect()
				} else {
					this.share = 'https://solfi.me?inviter=';
					uni.showToast({
						title: this.$t('common.txt2'),
						icon: 'error'
					})
				}
			}
		},
		methods: {
			getUsers() {
				this.$apiFun.userInfo().then(res => {
					this.users = res.data.user;
					this.referrer = res.data.referrer;
					this.nodes = res.data.node;
				})
			},
			getDirect() {
				const data = {
					page: 1,
					pageSize: 10000
				}
				this.$apiFun.getShare(data).then(res => {
					this.nodeList = res.data.list;
				})
			},
			getNodePrice() {
				this.$apiFun.getNodePrice().then(res => {
					this.small = parseFloat(1000 / res.data).toFixed(2);
					this.big = parseFloat(3000 / res.data).toFixed(2);
				})
			},
			async getUserInfo() {
				const wallet = await window.solana.connect();
				const address = wallet.publicKey.toString();
				const connection = new Connection(this.rpc);
				const publicKey = new PublicKey(address);
				const yues = await connection.getBalance(publicKey);
				this.balance = parseFloat(yues / LAMPORTS_PER_SOL);
			},
			async getShare() {
				const wallet = await window.solana.connect();
				const address = wallet.publicKey.toString();
				this.share = 'https://solfi.me?inviter=' + address;
			},
			beforeS() {
				if (parseFloat(this.balance) >= parseFloat(this.small)) {
					this.buySmallNode()
				} else {
					uni.showToast({
						title: this.$t('common.txt4'),
						icon: 'error'
					})
				}
			},
			beforeB() {
				if (parseFloat(this.balance) >= parseFloat(this.big)) {
					this.buyBigNode()
				} else {
					uni.showToast({
						title: this.$t('common.txt4'),
						icon: 'error'
					})
				}
			},
			async buySmallNode() {
				try {
					this.bitty = 1;
					const connection = new Connection(this.rpc);
					const wallet = await window.solana.connect();
					const address = wallet.publicKey.toString();
					const fromPublicKey = new PublicKey(address);
					const toPublicKey1 = new PublicKey(this.smallReceiver);
					const amount = parseFloat(this.small * LAMPORTS_PER_SOL);
					const recentBlockhash = await connection.getRecentBlockhash();
					const feePayerPublicKey = fromPublicKey;
					if (this.referrer.node > 0) {
						const toPublicKey2 = new PublicKey(this.referrer.address);
						const amount1 = parseFloat(this.small * LAMPORTS_PER_SOL * 0.8);
						const amount2 = parseFloat(this.small * LAMPORTS_PER_SOL * 0.2);
						const transaction = new Transaction({
							recentBlockhash: recentBlockhash.blockhash,
							feePayer: feePayerPublicKey
						}).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey1,
								lamports: amount1
							})
						).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey2,
								lamports: amount2
							})
						);
						const signature = await window.solana.signTransaction(transaction);
						const txid = await connection.sendRawTransaction(signature.serialize());
						if (txid) {
							this.bitty = 0;
							uni.showToast({
								title: this.$t('node.txt12'),
								icon: 'success'
							});
						} else {
							this.bitty = 0;
						}
						console.log("ID:", txid);
					} else {
						const transaction = new Transaction({
							recentBlockhash: recentBlockhash.blockhash,
							feePayer: feePayerPublicKey
						}).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey1,
								lamports: amount
							})
						);
						const signature = await window.solana.signTransaction(transaction);
						const txid = await connection.sendRawTransaction(signature.serialize());
						if (txid) {
							this.bitty = 0;
							uni.showToast({
								title: this.$t('node.txt12'),
								icon: 'success'
							});
						} else {
							this.bitty = 0;
						}
					}
				} catch (error) {
					console.log('err', error)
					this.bitty = 0;
				}
			},
			async buyBigNode() {
				try {
					this.large = 1;
					const connection = new Connection(this.rpc);
					const wallet = await window.solana.connect();
					const address = wallet.publicKey.toString();
					const fromPublicKey = new PublicKey(address);
					const toPublicKey1 = new PublicKey(this.bigReceiver);
					const amount = parseFloat(this.big * LAMPORTS_PER_SOL);
					const recentBlockhash = await connection.getRecentBlockhash();
					const feePayerPublicKey = fromPublicKey;
					if (this.referrer.node > 0) {
						const toPublicKey2 = new PublicKey(this.referrer.address);
						const amount1 = parseFloat(this.big * LAMPORTS_PER_SOL * 0.8);
						const amount2 = parseFloat(this.big * LAMPORTS_PER_SOL * 0.2);
						const transaction = new Transaction({
							recentBlockhash: recentBlockhash.blockhash,
							feePayer: feePayerPublicKey
						}).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey1,
								lamports: amount1
							})
						).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey2,
								lamports: amount2
							})
						);
						const signature = await window.solana.signTransaction(transaction);
						const txid = await connection.sendRawTransaction(signature.serialize());
						if (txid) {
							this.large = 0;
							uni.showToast({
								title: this.$t('node.txt12'),
								icon: 'success'
							});
						} else {
							this.large = 0;
						}
					} else {
						const transaction = new Transaction({
							recentBlockhash: recentBlockhash.blockhash,
							feePayer: feePayerPublicKey
						}).add(
							SystemProgram.transfer({
								fromPubkey: fromPublicKey,
								toPubkey: toPublicKey1,
								lamports: amount
							})
						);
						const signature = await window.solana.signTransaction(transaction);
						const txid = await connection.sendRawTransaction(signature.serialize());
						if (txid) {
							this.large = 0;
							uni.showToast({
								title: this.$t('node.txt12'),
								icon: 'success'
							});
						} else {
							this.large = 0;
						}
					}
				} catch (error) {
					this.large = 0;
					console.error("error", error);
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
			copy() {
				let clipboard = new Clipboard('#copyBtn');
				clipboard.on('success', e => {
					uni.showToast({
						title: this.$t('common.txt6'),
						icon: 'success'
					});
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					uni.showToast({
						title: this.$t('common.txt7'),
						icon: 'error'
					});
					clipboard.destroy()
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		padding-top: 140rpx;
	}

	.part {
		padding: 50rpx;
	}

	.back {
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
	}
	
	.null {
		width: 32rpx;
	}

	.banner {
		display: flex;
		justify-content: center;
		margin: 60rpx 0;
	}

	.nicon {
		width: 88%;
		animation: moveDown 4s linear infinite;
	}

	.card {
		background-color: #101114;
		border: 1rpx solid #505050;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.title {
		padding: 20rpx 40rpx;
		color: #00E3A5;
		border-bottom: 1rpx solid #323438;
	}

	.titleb {
		padding: 20rpx 40rpx;
		color: #9947FF;
		border-bottom: 1rpx solid #323438;
	}

	.infos {
		padding: 40rpx;
	}

	.bt {
		color: #9397A3;
	}

	.sol {
		width: 50rpx;
		height: 48rpx;
	}

	.tname {
		color: #fff;
		padding-left: 20rpx;
	}

	.inps {
		position: relative;
		margin-top: 20rpx;
	}

	.in {
		background-color: #000000;
		color: #fff;
		padding: 26rpx 90rpx 26rpx 160rpx;
		border-radius: 40rpx;
		text-align: right;
		font-size: 34rpx;
	}

	.token {
		display: flex;
		align-items: center;
		position: absolute;
		top: 24rpx;
		left: 20rpx;
	}

	.unit {
		color: #fff;
		position: absolute;
		top: 28rpx;
		right: 20rpx;
	}

	.balance {
		color: #fff;
		padding-top: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.oper {
		margin-top: 50rpx;
	}

	.btns {
		background-color: #00E3A5;
		font-size: 30rpx;
		font-weight: bold;
		padding: 10rpx 0;
	}

	.btneds {
		background-color: #00E3A5;
		font-size: 30rpx;
		font-weight: bold;
		padding: 10rpx 0;
		opacity: 0.6;
	}

	.btnb {
		background-color: #9947FF;
		font-size: 30rpx;
		font-weight: bold;
		padding: 10rpx 0;
	}

	.btnedb {
		background-color: #9947FF;
		font-size: 30rpx;
		font-weight: bold;
		padding: 10rpx 0;
		opacity: 0.6;
	}

	.invite {
		background: url('../../static/nbg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.link {
		padding: 0 50rpx 50rpx 50rpx;
	}

	.urls {
		margin-top: 50rpx;
		background: #101114;
		border-radius: 52rpx;
		border: 1rpx solid #505050;
		padding: 10rpx 10rpx 10rpx 40rpx;
		margin-bottom: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.url {
		color: #00E3A5;
		font-size: 28rpx;
		width: 70%;
		overflow-x: auto;
	}

	.copy {
		width: 100rpx;
		text-align: center;
		background-color: #00E3A5;
		padding: 16rpx 30rpx;
		border-radius: 60rpx;
		font-weight: bold;
	}

	.table {
		width: 100%;
		background-color: #101114;
		padding: 50rpx;
		box-sizing: border-box;
	}

	.th {
		color: #9397A3;
		display: flex;
		border-bottom: 1rpx solid #323438;
		padding-bottom: 34rpx;
	}

	.tr {
		color: #9397A3;
		display: flex;
		border-bottom: 1rpx solid #323438;
		padding: 30rpx 0;
	}

	.tdi {
		width: 15%;
		text-align: center;
	}

	.tda {
		width: 35%;
	}

	.td {
		width: 25%;
		text-align: center;
	}

	.one {
		color: #FF7A00;
	}

	.two {
		color: #ADA1E6;
	}

	.three {
		color: #FEB59E;
	}

	.tbody {
		height: 500rpx;
		overflow-y: auto;
	}

	.nuicon {
		width: 64rpx;
		height: 72rpx;
	}

	.ref {
		color: #00E3A5;
		padding: 40rpx;
		border-radius: 20rpx;
		border: 1rpx solid #505050;
		word-break: break-all;
		background: #101114;
		font-size: 26rpx;
	}
	
	.retit {
		padding-bottom: 20rpx;
		font-size: 30rpx;
		color: #fff;
		font-size: 32rpx;
		font-family: 'Bold';
		padding: 40rpx 0;
	}
</style>