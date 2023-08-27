<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import { goto } from '$app/navigation';
	import { isLogin } from '$lib/store/mbstore';
	// if (!$isLogin) goto('/');
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '회원정보', mbLv: 2 },
		{ link: 'tradeLog', name: '거래내역', mbLv: 2 }
	];
</script>

<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
<slot />
