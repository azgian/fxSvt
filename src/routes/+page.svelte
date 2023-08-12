<script lang="ts">
	import { mb, isLogin } from '$lib/store/mbstore';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconXi from '$lib/components/IconXi.svelte';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';
	import { scale } from 'svelte/transition';
</script>

{#if !$isLogin}
	<LoginPage />
{:else}
	<div in:scale={{ duration: 150 }}>메인페이지</div>
{/if}
