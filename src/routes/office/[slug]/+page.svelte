<script lang="ts">
	import { sys7Lv } from '$lib/config';
	import { page } from '$app/stores';
	import { mb } from '$lib/store/mbstore';
	import InfoMb from './InfoMb.svelte';
	import InfoCompany from './InfoCompany.svelte';
</script>

{#if $page.params.slug === 'info'}
	{#if $mb.mb_level >= sys7Lv}
		<InfoCompany />
	{:else}
		<InfoMb />
	{/if}
{/if}
