<script lang="ts">
	import { page } from '$app/stores';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { sys7Lv } from '$lib/config';
	import InfoMb from './InfoMb.svelte';
	import InfoCompany from './InfoCompany.svelte';
</script>

{#if $page.params.slug === 'info'}
	{#if Number($mb.mb_level) >= sys7Lv}
		<InfoCompany />
	{:else}
		<InfoMb />
	{/if}
{/if}
