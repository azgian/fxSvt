<script lang="ts">
	import { mb } from '$lib/store/mbstore';
	import { brLv, sys7Lv } from '$lib/config';
	import { page } from '$app/stores';
	import SetIb from './SetIB.svelte';
	import SetBR from './SetBR.svelte';
	import { goto } from '$app/navigation';
	if ($mb.mb_level < sys7Lv) goto('/');
</script>

{#if $page.params.slug === 'setIB'}
	<SetIb />
{/if}
{#if $page.params.slug === 'setBR'}
	<SetBR />
{/if}
