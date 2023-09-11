<script lang="ts">
	import { instanceWithAuth } from '$lib/common/api';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import { scrollToId } from '$lib/config';
	import { toastStore, SlideToggle } from '@skeletonlabs/skeleton';
	import IconXi from '$lib/components/IconXi.svelte';
	import { mb } from '$lib/store/mbstore';
	let companyList: any[];
	const getCompanyList = async () => {
		const { data } = await instanceWithAuth.post('sys/member/Get_company_list/');
		companyList = data.data;
	};
	getCompanyList();
	let mbId: string;
	let mbName: string;
	let mbEmail: string;
	let companyId: number;
	let companyName: string;
	let companyFee: number;
	let companyBank: string;
	let companyAddress: string;
	let companyTel: string;
	let companyDomain: string;
	let companyEmail: string; //신규등록시 mb_email로도 등록
	let companyActive = false;
	let showGsSet = false;
	let btnDisabledSet = false;
	let altBtnText = '신규회사 등록';
	let altBtnColor = 'variant-filled-tertiary';
	const sysLevel = $mb.mb_level;
	const setCompanyList = async () => {
		if (!(companyName && mbName && mbEmail)) return false;
		btnDisabledSet = showGsSet = true;
		const params = {
			companyId,
			mbId,
			mbName,
			mbEmail,
			companyName,
			companyDomain,
			companyActive,
			sysLevel
		};
		const { data } = await instanceWithAuth.post('sys/member/Set_company_list/', params);
		const msg = data.data.msg;
		const toastMsg = msg === 'exist' ? '존재하는 이메일입니다.' : '회사정보 등록되었습니다.';
		const ToastSettings = {
			message: toastMsg,
			timeout: 3000
		};
		toastStore.trigger(ToastSettings);
		btnDisabledSet = showGsSet = false;
		if (msg === 'success') {
			undoSetCompany();
			getCompanyList();
		}
	};
	const updateCompanyInfo = (
		company_id: number,
		company_name: string,
		company_domain: string,
		mb_id: string,
		mb_name: string,
		mb_email: string,
		company_active: boolean
	) => {
		companyId = company_id;
		companyName = company_name;
		companyDomain = company_domain;
		companyActive = company_active;
		mbId = mb_id;
		mbName = mb_name;
		mbEmail = mb_email;
		scrollToId('formSetCompany');
		altBtnText = '회사정보 수정';
		altBtnColor = 'variant-filled-success';
	};
	const undoSetCompany = () => {
		companyId = 0;
		mbId = '';
		mbName = '';
		mbEmail = '';
		companyName = '';
		companyDomain = '';
		companyActive = false;
		altBtnText = '신규회사 등록';
		altBtnColor = 'variant-filled-tertiary';
	};
</script>

<div in:scale={{ duration: 150 }}>
	<div class="wrap-box pos-relative">
		<span class="pos-abs-top_100" id="formSetCompany" />
		<form>
			<input type="hidden" bind:value={companyId} />
			<input
				class="input mb-2"
				type="text"
				placeholder="회사명"
				bind:value={companyName}
				required
			/>
			<input
				class="input mb-2"
				type="text"
				placeholder="관리자 이름"
				bind:value={mbName}
				required
			/>
			<input
				class="input mb-2"
				type="email"
				placeholder="관리자 이메일"
				bind:value={mbEmail}
				required
			/>
			<input
				class="input mb-2"
				type="text"
				placeholder="도메인"
				bind:value={companyDomain}
				required
			/>
			<input type="hidden" bind:value={mbId} />
			<div class="flex justify-between">
				<Button
					addClass="variant-filled-surface me-2 btn-icon btn-icon-sm"
					iconNameE="undo"
					iconNameAlt="undo"
					onClick={undoSetCompany}
				/>
				<SlideToggle name="slide" bind:checked={companyActive} />
				<Button
					addClass="{altBtnColor} btn-sm ms-3"
					btnText={altBtnText}
					iconNameE="upload"
					iconNameAlt="upload"
					showGs={showGsSet}
					btnDisabled={btnDisabledSet}
					onClick={setCompanyList}
					btnType="submit"
				/>
			</div>
		</form>
	</div>

	<div class="table-container mt-5" in:scale={{ duration: 150 }}>
		<table class="table table-hover table-compact">
			<thead>
				<tr>
					<th />
					<th>Company</th>
					<th>Name</th>
					<th>Set</th>
				</tr>
			</thead>
			<tbody>
				{#if companyList}
					{#each companyList as row, i}
						<tr id="tr{row.company_id}">
							<td class="table-cell-fit">
								{#if row.company_active == 0}
									<IconXi iconName="pause-circle-o" fontSize="2rem" addClass="text-surface-500" />
								{:else}
									<IconXi iconName="play-circle" fontSize="2rem" />
								{/if}
							</td>
							<td class="pos-relative">
								<span class="pos-abs-top_100" id="td{row.company_id}" />
								<p>
									{row.company_name}
								</p>
								{row.company_domain}
							</td>
							<td>
								<p>
									{row.mb_name}
								</p>
								{row.mb_email}
							</td>
							<td>
								<Button
									addClass="btn-icon btn-icon-sm variant-filled-surface"
									iconNameE="cog"
									iconNameAlt="cog"
									onClick={() =>
										updateCompanyInfo(
											row.company_id,
											row.company_name,
											row.company_domain,
											row.mb_id,
											row.mb_name,
											row.mb_email,
											row.company_active
										)}
								/>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
			<!-- <tfoot>
			<tr>
				<th colspan="3" />
			</tr>
		</tfoot> -->
		</table>
	</div>
</div>

<style>
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
	.wrap-box {
		margin: 10px auto 45px;
		max-width: 450px;
		width: 90%;
	}
	input {
		text-align: center;
	}
	/* #logo-box {
		text-align: center;
	} */
</style>
