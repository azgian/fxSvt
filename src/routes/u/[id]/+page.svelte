<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { instance } from '$lib/common/api';
	import { dev } from '$app/environment';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';
	import { scale } from 'svelte/transition';
	import { recommendId } from '$lib/store/mbstore';
	import { ibLv } from '$lib/config'; // 4
	let member: any;
	let isMember: boolean;
	const mb_id = data.mb_id;
	const getMember = async () => {
		const params = {
			mb_id
		};
		const { data } = await instance.post('member/info/Get_member_info', params);
		isMember = data?.data?.isMember;
		member = data?.data?.member;
		if (dev) console.log('D in [id] ', member);
		if (isMember && member.mb_level >= ibLv) recommendId.set(member.mb_id);
		else recommendId.set('');
	};
	getMember();
</script>

{#if isMember && member.mb_level >= ibLv}
	<LoginPage agentId={$recommendId} />
{:else}
	<div class="mt-4" in:scale={{ duration: 150 }}>
		<AlertBox title="Invalid Account" />
	</div>
{/if}
