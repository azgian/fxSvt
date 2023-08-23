<script lang="ts">
	import { page } from '$app/stores';
	import { resetTimer } from '$lib/config';
	import { scale } from 'svelte/transition';
	export let tabsArr: { link: string; name: string }[];
	export let currUrl: string;
	export let baseUrl: string;
</script>

<div id="tabMenuBox" in:scale={{ duration: 150 }}>
	<div class="tabMenuBox btn-group variant-ringed">
		{#each tabsArr as tab}
			{@const isBaseUrl = $page.url.pathname === '/' + baseUrl ? baseUrl + '/' : ''}
			{@const tabLink = tab.link === baseUrl ? './' : tab.link}
			{@const isCurrUrl = !currUrl ? './' : currUrl}
			<a
				href={isBaseUrl + tabLink}
				class="btn {tabLink === isCurrUrl ? 'variant-ghost-tertiary' : ''}"
				on:click={resetTimer}
				>{tab.name}
			</a>
		{/each}
	</div>
</div>

<style>
	#tabMenuBox {
		width: 100%;
		display: flex;
		justify-content: end;
		margin-bottom: 15px;
	}
</style>
