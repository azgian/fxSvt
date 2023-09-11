<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import { goto } from '$app/navigation';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { sys7Lv } from '$lib/config.js';
	if (!$isLogin) goto('/');
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const slugName = Number($mb.mb_level) < sys7Lv ? '회원정보' : '회사정보';
	const tabsArr = [
		{ link: baseUrl, name: '신청내역', mbLv: 2 },
		{ link: 'info', name: slugName, mbLv: 2 }
	];
</script>

<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
<slot />
