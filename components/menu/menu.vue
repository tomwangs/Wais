<template>
	<view class="header">
		<view class="top">
			<image src="../../static/logo.png" class="logo"></image>
			<view class="yue">
				<image src="../../static/asset.png" class="asicon"></image>
				<view class="asset">
					$ {{solfi | cutOutNums}}
				</view>
			</view>
			<block v-if="address">
				<view class="conn" @click="openDis">
					{{address | addrFilter}}
				</view>
				<view class="disc" v-if="disConn" @click="disConnect">
					<view class="disname">
						{{$t('common.txt20')}}
					</view>
					<image src="../../static/out.png" class="out"></image>
				</view>
			</block>
			<block v-else>
				<view class="conn" @click="connentMatemask">
					{{$t('common.txt1')}}
				</view>
			</block>
			<view class="lvs">
				{{lv}}
			</view>
			<image src="../../static/menu.png" class="micon" @click="showMenu"></image>
		</view>
		<uni-drawer ref="popup" mode="right">
			<view class="menus">
				<view class="topsm">
					<view class="tops">
						<image src="../../static/close.png" class="clicon" @click="closeMenu"></image>
						<view class="mname">
							SolanaFi
						</view>
					</view>
				</view>
				<view class="menu">
					<view class="me" @click="toHome">
						<image src="../../static/m1.png" class="micons"></image>
						<view class="mnames">
							{{$t('common.txt14')}}
						</view>
					</view>
					<view class="me" @click="toNode">
						<image src="../../static/m2.png" class="micons"></image>
						<view class="mnames">
							{{$t('common.txt15')}}
						</view>
					</view>
					<view class="me" @click="toPledge">
						<image src="../../static/m3.png" class="micons"></image>
						<view class="mnames">
							{{$t('common.txt16')}}
						</view>
					</view>
					<view class="me" @click="toAssets">
						<image src="../../static/m4.png" class="micons"></image>
						<view class="mnames">
							{{$t('common.txt17')}}
						</view>
					</view>
					<view class="me" @click="changeLang">
						<image src="../../static/lang.png" class="micons"></image>
						<view class="mnames">
							{{$t('common.txt18')}}
						</view>
						<image src="../../static/arrow.png" class="open" v-if="lang == 0"></image>
						<image src="../../static/downs.png" class="open" v-if="lang == 1"></image>
					</view>
					<view class="langs" v-if="isLang">
						<view class="lang" @click="English">
							English
						</view>
						<view class="lang" @click="Chinese">
							繁体中文
						</view>
						<view class="lang" @click="Korean">
							한국인
						</view>
						<view class="lang" @click="Japanese">
							日本語
						</view>
					</view>
					<view class="connsm" v-if="address">
						{{address | addrFilter}}
					</view>
					<view class="connsm" v-else @click="connentMatemask">
						{{$t('common.txt1')}}
					</view>
				</view>
			</view>
		</uni-drawer>
		<uni-popup ref="reg" type="center">
			<view class="regs">
				<view class="rtit">
					{{$t('common.txt8')}}
				</view>
				<view class="rbt">
					{{$t('common.txt9')}}
				</view>
				<view class="ins">
					{{uper}}
				</view>
				<view class="oks">
					<button class="btnok" @click="before" v-if="bind == 0">{{$t('common.txt10')}}</button>
					<button class="btnok" v-if="bind == 1">{{$t('common.txt12')}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import axios from 'axios';
	import {
		ethers
	} from 'ethers';
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	export default {
		data() {
			return {
				address: '',
				isLang: false,
				lang: 0,
				uper: '9jPzz6z4eh9LCfLdSiAVWna4SEbe9iXnhLFqXDKB7Ha',
				bind: 0,
				disConn: false,
				solfi: 0,
				lv: '--',
				signature: ''
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
		created() {
			this.checkToken();
			const uper = this.$route.query.inviter;
			const reffer = uni.getStorageSync('uper');
			if (uper) {
				this.uper = uper;
				uni.setStorageSync('uper', uper);
			} else {
				if (reffer) {
					this.uper = reffer;
				} else {
					this.uper = '';
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		methods: {
			showMenu() {
				this.$refs.popup.open();
			},
			closeMenu() {
				this.$refs.popup.close();
			},
			changeLang() {
				this.isLang = !this.isLang;
				if (this.lang == 0) {
					this.lang = 1;
				} else {
					this.lang = 0;
				}
			},
			English() {
				this.isLang = false;
				this.lang = 0;
				this.$i18n.locale = 'en';
				uni.setStorageSync('lang', 'en');
				this.$refs.popup.close();
			},
			Chinese() {
				this.isLang = false;
				this.$i18n.locale = 'cn';
				this.lang = 0;
				uni.setStorageSync('lang', 'cn');
				this.$refs.popup.close();
			},
			Korean() {
				this.isLang = false;
				this.$i18n.locale = 'kr';
				this.lang = 0;
				uni.setStorageSync('lang', 'kr');
				this.$refs.popup.close();
			},
			Japanese() {
				this.isLang = false;
				this.$i18n.locale = 'jp';
				this.lang = 0;
				uni.setStorageSync('lang', 'jp');
				this.$refs.popup.close();
			},
			toHome() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
				this.$refs.popup.close();
			},
			toNode() {
				uni.navigateTo({
					url: '/pages/node/node'
				})
				this.$refs.popup.close();
			},
			toPledge() {
				uni.navigateTo({
					url: '/pages/pledge/pledge'
				})
				this.$refs.popup.close();
			},
			toAssets() {
				uni.navigateTo({
					url: '/pages/assets/assets'
				})
				this.$refs.popup.close();
			},
			async connentMatemask() {
				const wallet = await window.solana.connect();
				const address = wallet.publicKey.toString();
				this.signWallet(address);
			},
			async signWallet(address) {
				const data = {
					address: address
				}
				this.$apiFun.randomCode(data).then(res => {
					if (res.code == 200) {
						if (res.data.isRegister) {
							this.getSignature(address, res.data.random);
						} else {
							this.openRegs(address, res.data.random);
						}
					}
				});
			},
			async getSignature(address, random) {
				const message = new TextEncoder().encode(random, 'utf-8');
				await window.solana.signMessage(message).then(signature => {
					if (signature) {
						this.address = address;
						const sign = Buffer.from(signature.signature);
						const signs = sign.toString('hex');
						this.signature = signs;
						this.loginAddr(address, signs);
						this.$refs.reg.close();
					}
				}).catch(error => {
					console.error('Error:', error);
				});
			},
			async openRegs(address, random) {
				const message = new TextEncoder().encode(random, 'utf-8');
				await window.solana.signMessage(message).then(signature => {
					if (signature) {
						this.address = address;
						const signs = Buffer.from(signature.signature);
						this.signature = signs.toString('hex');
						this.$refs.reg.open();
					}
				}).catch(error => {
					console.error('Error:', error);
				});
			},
			async loginAddr(address, signature) {
				const data = {
					address: address,
					sig: signature,
					inviter: ''
				}
				const that = this;
				this.$apiFun.login(data).then(res => {
					if (res.code == 200) {
						setTimeout(() => {
							localStorage.setItem(address, res.data.token);
							this.$store.commit('setToken', res.data.token)
						}, 1500)
					}
				});
			},
			openDis() {
				this.disConn = !this.disConn
			},
			disConnect() {
				this.address = '';
				this.disConn = false;
				this.$store.commit('cleanToken', '');
			},
			async checkToken() {
				const wallet = await window.solana.connect();
				const address = wallet.publicKey.toString();
				const token = this.$store.state.token;
				const tokens = localStorage.getItem(address);
				if (token == tokens) {
					this.address = address;
					try {
						this.$store.commit('setToken', tokens);
					} catch (e) {
						console.log('e', e)
					}
				} else {
					this.address = '';
					this.$store.commit('cleanToken', '')
				}
			},
			before() {
				if (this.uper) {
					this.register()
				} else {
					uni.showToast({
						title: this.$t('common.txt19'),
						icon: 'error'
					})
				}
			},
			async register() {
				if (this.uper) {
					this.bind = 1;
					const wallet = await window.solana.connect();
					const addr = wallet.publicKey.toString();
					const data = {
						address: addr,
						sig: this.signature,
						inviter: this.uper
					}
					this.$apiFun.login(data).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: this.$t('common.txt11'),
								icon: 'success'
							})
							setTimeout(() => {
								this.$store.commit('setToken', res.data.token);
								localStorage.setItem(addr, res.data.token)
								this.$refs.reg.close();
							}, 1500)
						} else {
							this.bind = 0;
							uni.showToast({
								title: this.$t('common.txt13'),
								icon: 'error'
							})
						}
					});
				} else {
					this.bind = 0;
					uni.showToast({
						title: this.$t('common.txt13'),
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: transparent;
		transition: background-color 0.5s ease;
	}

	.top {
		max-width: 800rpx;
		margin: 0 auto;
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #454545;
		position: relative;
	}

	.logo {
		width: 56rpx;
		height: 56rpx;
	}

	.asicon {
		width: 44rpx;
		height: 44rpx;
	}

	.micon {
		width: 48rpx;
		height: 40rpx;
	}

	.yue {
		display: flex;
		align-items: center;
		border: 1rpx solid #454545;
		padding: 12rpx 26rpx;
		border-radius: 10rpx;
	}

	.asset {
		color: #9397A3;
		padding-left: 16rpx;
	}

	.conn {
		border: 1rpx solid #454545;
		padding: 12rpx 26rpx;
		border-radius: 10rpx;
		color: #9397A3;
		box-sizing: border-box;
	}

	.lvs {
		border: 1rpx solid #454545;
		padding: 12rpx 26rpx;
		border-radius: 10rpx;
		color: #FFC809;
	}

	/deep/.uni-drawer__content {
		background: rgba(16, 17, 20, 0.8);
		backdrop-filter: blur(10rpx);
		border-top-left-radius: 60rpx;
		border-bottom-left-radius: 60rpx;
	}

	.clicon {
		width: 48rpx;
		height: 32rpx;
	}

	.menu {
		padding: 30rpx;
	}

	.topsm {
		border-bottom: 1rpx solid #323438;
	}

	.tops {
		padding: 60rpx 40rpx 40rpx 40rpx;
		display: flex;
		align-items: center;
	}

	.mname {
		color: #fff;
		font-size: 34rpx;
		padding-left: 90rpx;
	}

	.me {
		display: flex;
		align-items: flex-end;
		border-bottom: 1rpx solid #323438;
		padding: 50rpx 0 50rpx 100rpx;
	}

	.micons {
		width: 40rpx;
		height: 40rpx;
	}

	.mnames {
		color: #fff;
		padding-left: 30rpx;
		font-size: 32rpx;
	}

	.open {
		width: 34rpx;
		height: 34rpx;
		margin-left: 16rpx;
		opacity: 0.8;
	}

	.lang {
		color: #fff;
		text-align: center;
		border-bottom: 1rpx solid #323438;
		padding: 30rpx 0;
	}

	.lang:last-child {
		border-bottom: unset;
	}

	.connsm {
		background-color: #9947FF;
		text-align: center;
		padding: 20rpx 0;
		margin-top: 60rpx;
		border-radius: 10rpx;
		font-family: 'Bold';
	}

	.regs {
		background: #101114;
		border-radius: 26rpx;
		border: 1rpx solid #505050;
		padding: 50rpx 30rpx;
		width: 600rpx;
	}

	.rtit {
		color: #fff;
		text-align: center;
		font-size: 38rpx;
		font-family: 'Bold';
	}

	.rbt {
		margin-top: 50rpx;
		color: #9397A3;
		text-align: center;
		padding-bottom: 20rpx;
	}

	.ins {
		background: #000000;
		border-radius: 52rpx;
		border: 1rpx solid #505050;
		padding: 16rpx 40rpx;
		color: #00E3A5;
		text-align: center;
		font-size: 26rpx;
		word-break: break-all;
	}

	.oks {
		margin-top: 50rpx;
	}

	.btnok {
		width: 80%;
		background-color: #9947FF;
		font-weight: bold;
		font-size: 32rpx;
	}

	.disc {
		position: absolute;
		top: 130rpx;
		right: 110rpx;
		background-color: #101114;
		border: 1rpx solid #505050;
		padding: 20rpx;
		border-radius: 10rpx;
		display: flex;
	}

	.disname {
		color: #fff;
		padding-right: 120rpx;
		opacity: 0.7;
	}

	.out {
		width: 44rpx;
		height: 44rpx;
	}
</style>