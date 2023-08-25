<script lang="ts">
	import { page } from '$app/stores';
	import SetIb from './SetIB.svelte';
	import SetBR from './SetBR.svelte';
</script>

{#if $page.params.slug === 'tab1'}
	<SetIb />
{/if}
{#if $page.params.slug === 'tab2'}
	<SetBR />
{/if}
