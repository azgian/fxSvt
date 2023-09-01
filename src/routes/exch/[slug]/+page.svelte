<script lang="ts">
	import { mb } from '$lib/store/mbstore';
	import { page } from '$app/stores';
	// import SetIb from './SetIB.svelte';
	// import SetBR from './SetBR.svelte';
	import { goto } from '$app/navigation';
</script>

{#if $page.params.slug === 'tab1'}
	환전
{/if}
{#if $page.params.slug === 'tab2'}
	충전
{/if}
