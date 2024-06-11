<template>
	<view class="container">
		<Menu></Menu>
		<view class="banner">
			<image src="../../static/banner.png" mode="widthFix" class="bicon"></image>
		</view>
		<view class="main  wow fadeInDown">
			<view class="title">
				SolanaFi
			</view>
			<view class="dec">
				{{$t('index.txt1')}}
			</view>
			<view class="node">
				<button class="btn" @click="toNode">SOLFI {{$t('index.txt2')}}</button>
			</view>
			<view class="project">
				<view class="ptit">
					{{$t('index.txt5')}}
				</view>
				<view class="intro">
					{{$t('index.txt3')}}
				</view>
				<image src="../../static/intro.png" mode="widthFix" class="iicon wow flipInX"></image>
				<view class="ibgs">
					<view class="intro">
						{{$t('index.txt4')}}
					</view>
					<view class="itit">
						{{$t('index.txt6')}}<br>
						{{$t('index.txt61')}}
					</view>
					<view class="card wow slideInLeft">
						<image src="../../static/icon1.png" class="icons"></image>
						<view class="ctit">
							{{$t('index.txt7')}}
						</view>
						<view class="cdec">
							{{$t('index.txt8')}}
						</view>
					</view>
					<view class="card wow slideInRight">
						<image src="../../static/icon2.png" class="icons"></image>
						<view class="ctit">
							{{$t('index.txt9')}}
						</view>
						<view class="cdec">
							{{$t('index.txt10')}}
						</view>
					</view>
					<view class="intro inc">
						{{$t('index.txt11')}}
					</view>
				</view>
			</view>
		</view>
		<view class="line">

		</view>
		<view class="token wow fadeInUp">
			<view class="ttit">
				{{$t('index.txt12')}}
			</view>
			<view class="tdec">
				<!-- {{$t('index.txt13')}} -->
			</view>
			<view class="tinfos">
				<image src="../../static/chart.png" class="chart"></image>
				<view class="info">
					<view class="total">
						{{$t('index.txt14')}}
					</view>
					<view class="nums">
						1000000000
					</view>
					<!-- <view class="total">
						{{$t('index.txt15')}}
					</view> -->
				</view>
			</view>
			<view class="items">
				<view class="item">
					<view class="pers">
						<view class="per">
							85%
						</view>
						<image src="../../static/t1.png" class="ticon"></image>
					</view>
					<view class="idec">
						{{$t('index.txt16')}}
					</view>
				</view>
				<view class="item">
					<view class="pers">
						<view class="per">
							5%
						</view>
						<image src="../../static/t2.png" class="ticon"></image>
					</view>
					<view class="idec">
						{{$t('index.txt18')}}
					</view>
				</view>
			</view>
			<view class="other">
				<!-- <view class="lists">
					<view class="lnum">
						10%
					</view>
					<view class="lbts">
						{{$t('index.txt19')}}
					</view>
				</view> -->
				<view class="list center">
					<view class="lnum">
						5%
					</view>
					<view class="lbt">
						{{$t('index.txt20')}}
					</view>
				</view>
				<view class="list">
					<view class="lnum">
						5%
					</view>
					<view class="lbt">
						{{$t('index.txt21')}}
					</view>
				</view>
			</view>
			<view class="partners  wow fadeInDown">
				<view class="ttit">
					{{$t('index.txt22')}}
				</view>
				<view class="partns">
					<view class="partn">
						<image src="../../static/p1.png" mode="widthFix" class="p1"></image>
					</view>
					<view class="partn">
						<image src="../../static/p2.png" mode="widthFix" class="p1"></image>
					</view>
					<view class="partn">
						<image src="../../static/p3.png" mode="widthFix" class="p1"></image>
					</view>
					<view class="partn">
						<image src="../../static/p4.png" mode="widthFix" class="p4"></image>
					</view>
					<view class="partn">
						<image src="../../static/p7.png" mode="widthFix" class="p1"></image>
					</view>
					<view class="partn">
						<image src="../../static/p8.png" mode="widthFix" class="p1"></image>
					</view>
					<view class="partn">
						<image src="../../static/p5.png" mode="widthFix" class="p2"></image>
					</view>
					<view class="partn">
						<image src="../../static/p6.png" mode="widthFix" class="p2"></image>
					</view>
					<view class="partn more">
						{{$t('index.txt24')}}...
					</view>
				</view>
			</view>
			<image src="../../static/points.png" mode="widthFix" class="poicon wow bounceIn"></image>
			<view class="ttit">
				{{$t('index.txt23')}}
			</view>
		</view>
		<view class="medias wow fadeInDown">
			<image src="../../static/me1.png" class="meiocn"></image>
			<image src="../../static/me2.png" class="meiocn"></image>
			<image src="../../static/me3.png" class="meiocn"></image>
		</view>
		<view class="own wow fadeInUp">
			2024 SolanaFi &nbsp;&nbsp;&nbsp; Rights Resved.
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

			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		methods: {
			toNode() {
				uni.navigateTo({
					url: '/pages/node/node'
				})
			}
		}
	}
</script>

<style scoped>
	.banner {
		padding-top: 200rpx;
	}

	.bicon {
		width: 100%;
		animation: moveDown 6s linear infinite;
	}

	.main {
		padding: 0 50rpx 50rpx 50rpx;
	}

	.title {
		font-size: 80rpx;
		line-height: 90rpx;
		font-family: 'Bold';
		color: #16F194;
		font-weight: bold;
	}

	.dec {
		color: #fff;
		font-size: 54rpx;
		font-family: 'Bold';
		line-height: 70rpx;
		padding-top: 20rpx;
		padding-bottom: 60rpx;
	}

	.btn {
		background-color: #9947FF;
		padding: 20rpx 0;
		border-radius: 30rpx;
		font-size: 34rpx;
		font-weight: bold;
	}

	.iicon {
		width: 100%;
		margin: 50rpx 0;
	}

	.project {
		margin-top: 120rpx;
	}

	.ptit {
		color: #fff;
		font-size: 54rpx;
		font-family: 'Bold';
		line-height: 70rpx;
		padding-bottom: 50rpx;
	}

	.intro {
		font-size: 26rpx;
		color: #fff;
		line-height: 48rpx;
	}

	.itit {
		color: #fff;
		font-size: 60rpx;
		line-height: 80rpx;
		font-family: 'Bold';
		padding-top: 160rpx;
		padding-bottom: 270rpx;
	}

	.card {
		background-color: #101114;
		border: 1rpx solid #505050;
		padding: 60rpx 40rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.icons {
		width: 54rpx;
		height: 54rpx;
	}

	.ctit {
		font-size: 40rpx;
		line-height: 54rpx;
		color: #fff;
		font-family: 'Bold';
		padding: 30rpx 0;
	}

	.cdec {
		color: #fff;
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.inc {
		padding-top: 26rpx;
	}

	.ibgs {
		background: url('../../static/ibg.png');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: top right;
	}

	.line {
		width: 100%;
		height: 1rpx;
		background-color: #979797;
		margin-top: 60rpx;
	}

	.ttit {
		color: #fff;
		font-size: 60rpx;
		line-height: 80rpx;
		font-family: 'Bold';
	}

	.token {
		padding: 60rpx 50rpx;
	}

	.tdec {
		color: #fff;
		font-size: 26rpx;
		line-height: 48rpx;
		padding: 30rpx 0;
	}

	.chart {
		width: 162rpx;
		height: 162rpx;
	}

	.tinfos {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #101114;
		border: 1rpx solid #505050;
		padding: 30rpx 50rpx 30rpx 30rpx;
		border-radius: 14rpx;
	}

	.total {
		color: #9C9C9C;
		font-size: 28rpx;
		line-height: 40rpx;
		padding-bottom: 10rpx;
	}

	.nums {
		font-size: 50rpx;
		line-height: 70rpx;
		font-family: 'Bold';
		color: #fff;
	}

	.items {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 0;
	}

	.item {
		width: 48%;
		background-color: #101114;
		border: 1rpx solid #505050;
		padding: 20rpx 20rpx 40rpx 20rpx;
		box-sizing: border-box;
		border-radius: 14rpx;
	}

	.pers {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.per {
		color: #fff;
		font-size: 32rpx;
		line-height: 44rpx;
		font-family: 'Bold';
	}

	.ticon {
		width: 44rpx;
		height: 32rpx;
	}

	.idec {
		color: #fff;
		font-size: 24rpx;
		padding-top: 20rpx;
	}

	.other {
		background-color: #101114;
		border: 1rpx solid #505050;
		padding: 30rpx;
		border-radius: 14rpx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.lists {
		width: 36%;
	}

	.list {
		width: 50%;
		box-sizing: border-box;
		text-align: center;
	}

	.center {
		border-right: 1rpx solid #505050;
	}

	.last {
		padding-left: 40rpx;
	}

	.lnum {
		color: #fff;
		font-size: 32rpx;
		line-height: 44rpx;
		font-family: 'Bold';
		padding-bottom: 20rpx;
	}

	.lbts {
		font-size: 24rpx;
		color: #fff;
		opacity: 0.8;
	}

	.lbt {
		font-size: 22rpx;
		color: #9C9C9C;
	}

	.partners {
		padding-top: 80rpx;
	}

	.partns {
		margin-top: 50rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.partn {
		width: 31%;
		background: #101114;
		border-radius: 14rpx;
		border: 1rpx solid #505050;
		display: flex;
		justify-content: center;
		padding: 10rpx 0;
		margin: 10rpx 0;
	}

	.p1 {
		width: 134rpx;
	}

	.p2 {
		width: 98rpx;
	}

	.p4 {
		width: 150rpx;
	}

	.more {
		color: #fff;
		line-height: 32rpx;
		font-size: 24rpx;
	}

	.poicon {
		width: 100%;
		margin-top: 76rpx;
		margin-bottom: 98rpx;
	}

	.medias {
		border-top: 1rpx solid #505050;
		border-bottom: 1rpx solid #505050;
		padding: 30rpx 0 30rpx 50rpx;
	}

	.meiocn {
		width: 78rpx;
		height: 78rpx;
		margin-right: 70rpx;
	}

	.own {
		font-size: 24rpx;
		color: #fff;
		opacity: 0.8;
		padding: 40rpx 0 70rpx 50rpx;
	}
</style>