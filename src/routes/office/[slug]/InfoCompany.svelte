<script lang="ts">
	import { goto } from '$app/navigation';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { mb } from '$lib/store/mbstore';
	import { sys7Lv, getCompanyInfo, writableCompanyInfo } from '$lib/config';
	import Button from '$lib/components/Button.svelte';
	import { scale } from 'svelte/transition';
	import IconXi from '$lib/components/IconXi.svelte';
	if ($mb.mb_level < sys7Lv) goto('/');
	let companyId = $writableCompanyInfo.company_id;
	let companyName = $writableCompanyInfo.company_name;
	let companyFee = $writableCompanyInfo.company_fee;
	let companyBank = $writableCompanyInfo.company_bank;
	let companyAddress = $writableCompanyInfo.company_address;
	let companyTel = $writableCompanyInfo.company_tel;
	let companyDomain = $writableCompanyInfo.company_domain;
	let companyEmail = $writableCompanyInfo.company_email;
	let companyActive = $writableCompanyInfo.company_active;
	let btnDisabledSet = false;
	let showGsSet = false;
	const sysLevel = $mb.mb_level;
	const setCompanyInfo = async () => {
		const params = {
			companyId,
			companyName,
			companyFee,
			companyBank,
			companyAddress,
			companyTel,
			companyDomain,
			companyEmail,
			companyActive,
			sysLevel
		};
		btnDisabledSet = showGsSet = true;
		const { data } = await instanceWithAuth.post('sys/member/Set_company_list', params);
		const coInfo = data.data;
		console.log(coInfo);
		getCompanyInfo(companyId);
		btnDisabledSet = showGsSet = false;
		// mb.update((info) => {
		// 	return {
		// 		...info,
		// 		mb.company.company_name: coInfo.company.company_name,
		// 		company_fee: coInfo.company_fee,
		// 		company_active: coInfo.company_active
		// 	};
		// });
		// if (dev) console.log('coInfo: ', coInfo);
	};
	getCompanyInfo($mb.company?.company_id);
</script>

<div class="wrap" in:scale={{ duration: 150 }}>
	<form>
		<h4 class="text-center text-surface-500">
			<IconXi iconName="home" />:
			{companyDomain}
		</h4>
		<input type="hidden" bind:value={companyId} />
		<label class="label mb-2">
			<span>회사명</span>
			<input class="input" type="text" placeholder="회사명" bind:value={companyName} />
		</label>
		<label class="label mb-2">
			<span>수수료</span>
			<input
				class="input"
				type="number"
				placeholder="수수료 (소수점 1자리까지)"
				bind:value={companyFee}
			/>
		</label>
		<label class="label mb-2">
			<span>회사 주소</span>
			<input class="input" type="text" bind:value={companyAddress} />
		</label>
		<label class="label mb-2">
			<span>회사 전화번호</span>
			<input class="input" type="text" bind:value={companyTel} />
		</label>
		<label class="label mb-2">
			<span>회사 계좌</span>
			<input class="input" type="text" bind:value={companyBank} />
		</label>
		<label class="label mb-2">
			<span>회사 이메일</span>
			<input class="input" type="text" bind:value={companyEmail} />
		</label>
		<div class="flex justify-end">
			<Button
				addClass="variant-filled-secondary"
				iconNameS="pen"
				iconNameAlt="pen"
				btnText="회사정보수정"
				showGs={showGsSet}
				btnDisabled={btnDisabledSet}
				onClick={setCompanyInfo}
				btnType="submit"
			/>
		</div>
	</form>
</div>

<!-- <pre>
	{JSON.stringify($mb)}
</pre> -->

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
	input {
		text-align: center;
	}
</style>
