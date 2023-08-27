<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import { goto } from '$app/navigation';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { ibLv, brLv } from '$lib/config';
	if ($mb.mb_level < 4 || !$isLogin) goto('/');
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '회원관리', mbLv: ibLv },
		{ link: 'setIB', name: 'IB관리', mbLv: brLv },
		{ link: 'setBR', name: 'BR관리', mbLv: brLv }
	];
</script>

<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
<slot />
