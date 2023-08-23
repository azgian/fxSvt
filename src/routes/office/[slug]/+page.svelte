<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.params.slug === 'tab1'}
	tab1 페이지
{/if}
{#if $page.params.slug === 'tab2'}
	tab2 페이지
{/if}
