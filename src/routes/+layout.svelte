<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import './app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import MenuBox from '$lib/components/MenuBox.svelte';
	import LogoutTimer from '$lib/components//LogoutTimer.svelte';
	import TopBar from '$lib/components//TopBar.svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import { onMount } from 'svelte';
	// beforeUpdate(() => {
	// 	writableTrSort.set($page.url.searchParams.get('trSort') ?? '');
	// 	writableCoinId.set($page.url.searchParams.get('coinId') ?? '');
	// });
	// mb.set({});
	// if ($mb.mb_level >= 2) isLogin.set(true);
	// else isLogin.set(false);
	// if (!$isLogin) alert('접근불가');
	// goto('/');
	// $page.url.host
	const sectName = String($page.route.id)?.split('/')[1];
	// if (!$isLogin && !$page.route.id?.startsWith('/u')) goto('/');
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
			<!-- {#if dev}
				<pre class="mt-4">
				{JSON.stringify($mb)}
				{JSON.stringify($isLogin)}
				{JSON.stringify($page.route.id)}
				{sectName}
				{$page.route.id?.startsWith('/office')}
				{JSON.stringify($page.params.slug)}
				{JSON.stringify($page.url.host)}
				{JSON.stringify($page.params.slug)}
			</pre>
			{/if} -->
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
