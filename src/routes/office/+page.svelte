<script lang="ts">
	import { goto } from '$app/navigation';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { siteHost, getCopyText, ibLv, sys7Lv } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import { scale } from 'svelte/transition';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import ForSys from './ForSys.svelte';
	if (!$isLogin) goto('/');
</script>

{#if $mb.mb_level >= sys7Lv}
	SYS 신청내역
{:else}
	MB 신청내역
{/if}

<style>
	.wrap {
		margin: 25px auto;
		max-width: 450px;
		width: 90%;
	}
	form {
		margin-bottom: 10px;
	}
	.label span {
		padding-top: 5px;
		margin-left: 15px;
	}
</style>
