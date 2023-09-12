<script lang="ts">
	import { page } from '$app/stores';
	import { instance } from '$lib/common/api';
	import { dev } from '$app/environment';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';
	import { scale } from 'svelte/transition';
	import { recommendId } from '$lib/store/mbstore';
	import { ibLv } from '$lib/config'; // 4
	let member: any;
	let ib: any;
	let isMember: boolean;
	const mbId = $page.params.id;
	const getMember = async () => {
		const params = {
			mbId
		};
		const { data } = await instance.post('member/auth/Get_IBId', params);
		isMember = data?.data?.isMember;
		member = data?.data?.member;
		ib = data?.data?.ib;
		if (dev) console.log('D in [id] ', member);
		if (isMember && Number(member.mb_level) === ibLv && ib.ib_active) recommendId.set(member.mb_id);
		else recommendId.set('');
		console.log($recommendId);
	};
	getMember();
</script>

{#if isMember && Number(member.mb_level) === ibLv && ib.ib_active}
	<LoginPage agentId={$recommendId} />
{:else}
	<div class="mt-4" in:scale={{ duration: 150 }}>
		<AlertBox title="Invalid Account" />
	</div>
{/if}
