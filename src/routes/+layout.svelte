<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import './app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import MenuBox from '$lib/components/MenuBox.svelte';
	import LogoutTimer from '$lib/components//LogoutTimer.svelte';
	import TopBar from '$lib/components//TopBar.svelte';
	import { isLogin, mb } from '$lib/store/mbstore';
	import { getCompanyInfo, sys7Lv, writableCompanyInfo } from '$lib/config';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	if (Number($mb.mb_level) === sys7Lv) getCompanyInfo($mb.company?.company_id);
</script>

<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-10"
	slotSidebarLeft="bg-surface-900"
	slotPageFooter="bg-surface-900 z-10"
>
	<svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<TopBar />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $isLogin}
					<LogoutTimer />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="paddingLeft320">
		<div id="container-box">
			<slot />
			<!-- <pre class="pt-6">
				{JSON.stringify($writableCompanyInfo)}
				{JSON.stringify($mb)}
			</pre> -->
		</div>
	</div>
	<MenuBox />
</AppShell>

<style>
	.paddingLeft320 {
		padding-left: 320px;
	}
	#container-box {
		position: relative;
		max-width: 800px;
		width: 100%;
		height: 100%;
		padding: 15px;
		padding-bottom: 150px;
	}
	@media (max-width: 400.98px) {
	}
	@media (max-width: 1020.98px) {
		.paddingLeft320 {
			padding-left: 0px;
		}
		#container-box {
			margin: 0 auto;
		}
	}
</style>
