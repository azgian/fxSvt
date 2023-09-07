<script lang="ts">
	import { goto } from '$app/navigation';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { mb } from '$lib/store/mbstore';
	import { sys7Lv } from '$lib/config';
	import Button from '$lib/components/Button.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
	if ($mb.mb_level < sys7Lv) goto('/');
	let company_id = $mb.company_id;
	let company_name = $mb.company_name;
	let company_fee = $mb.company_fee;
	let company_active = $mb.company_active;
	let showGsSet = false;
	let btnDisabledSet = false;
	const setCompanyInfo = async () => {
		const params = {
			company_id,
			company_name,
			company_fee,
			company_active
		};
		const { data } = await instanceWithAuth.post('member/auth/Set_company_list', params);
		const coInfo = data.data;
		mb.update((info) => {
			return {
				...info,
				company_name: coInfo.company_name,
				company_fee: coInfo.company_fee,
				company_active: coInfo.company_active
			};
		});
		if (dev) console.log('coInfo: ', coInfo);
	};
</script>

<div class="wrap" in:scale={{ duration: 150 }}>
	<form>
		<input type="hidden" bind:value={company_id} />
		<label class="label mb-2">
			<span>회사명</span>
			<input class="input" type="text" placeholder="회사명" bind:value={company_name} />
		</label>
		<label class="label mb-2">
			<span>수수료</span>
			<input
				class="input"
				type="number"
				placeholder="수수료 (소수점 1자리까지)"
				bind:value={company_fee}
			/>
		</label>
		<div class="flex justify-between">
			<SlideToggle name="slide" bind:checked={company_active} />
			<Button
				addClass="variant-filled-secondary"
				iconNameS="upload"
				iconNameAlt="upload"
				showGs={showGsSet}
				btnDisabled={btnDisabledSet}
				onClick={setCompanyInfo}
				btnType="submit"
			/>
		</div>
	</form>
</div>

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
