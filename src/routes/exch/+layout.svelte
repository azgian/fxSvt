<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import { goto } from '$app/navigation';
	import { mb, isLogin } from '$lib/store/mbstore';
	if ($mb.mb_level < 2 || !$isLogin) goto('/');
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '충전', mbLv: 2 },
		{ link: 'send', name: '송금', mbLv: 2 },
		{ link: 'retn', name: '출금', mbLv: 2 }
	];
</script>

<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
<slot />
