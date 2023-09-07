<script lang="ts">
	import { mb } from '$lib/store/mbstore';
	import { page } from '$app/stores';
	import Send from './Send.svelte';
	import Retn from './Retn.svelte';
	import { goto } from '$app/navigation';
</script>

{#if $page.params.slug === 'send'}
	<Send />
{/if}
{#if $page.params.slug === 'retn'}
	<Retn />
{/if}
