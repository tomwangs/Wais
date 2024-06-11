<template>
	<view class="container">
		<Menu></Menu>
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

		}
	}
</script>

<style scoped>
</style>