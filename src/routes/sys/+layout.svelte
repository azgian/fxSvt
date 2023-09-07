<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import { goto } from '$app/navigation';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { ibLv, brLv, sys9Lv } from '$lib/config';
	if ($mb.mb_level < 4 || !$isLogin) goto('/');
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '회원', mbLv: ibLv },
		{ link: 'setIB', name: 'IB', mbLv: brLv },
		{ link: 'setBR', name: 'BR', mbLv: brLv },
		{ link: 'setCO', name: 'CO', mbLv: sys9Lv }
	];
</script>

<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
<slot />
