<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { mb } from '$lib/store/mbstore';
	import { addCommas, lvArray, lvArray2, lvNameElm, sys7Lv } from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { scale } from 'svelte/transition';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { GoogleSpin } from 'svelte-loading-spinners';
	let memberList: any[];
	let selectLv: number;
	const isMblv = $mb.mb_level;
	const mbId = $mb.mb_id;
	const getMemberList = async (lv: number) => {
		const params = {
			mb_level: lv,
			isMblv,
			mbId
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		memberList = data.data;
		if (dev) {
			console.log('memberList: ', memberList);
		}
	};
	getMemberList(0);
	const setMbLv = async (mbId: string, newLv: number, thisSel: any, mbLv: number) => {
		if (!confirm('회원등급 설정을 진행하시겠습니까?')) {
			thisSel.value = mbLv;
			return false;
		}
		const params = {
			mbId,
			fld: 'mb_level',
			info: newLv
		};
		const { data } = await instanceWithAuth.post('member/auth/Set_mb_info', params);
		const mb_level = data.data.mb_info;
		const lvName = thisSel.closest('tr').querySelector('.lvName');
		lvName.innerHTML = lvNameElm(Number(mb_level));
	};
	let showSetNewMb = false;
	let showSpinner = false;
	let btnSetNewMb: any;
	let newMbEmail: string;
	let newMbName: string;
	const setNewMb = async () => {
		if (!(newMbEmail && newMbName)) return false;
		const params = {
			newMbEmail,
			newMbName
		};
		btnSetNewMb.disabled = showSpinner = true;
		const { data } = await instanceWithAuth.post('sys/member/Set_mbIB/', params);
		const msg = data.data.msg;
		const toastMsg = msg === 'exist' ? '회원가입된 이메일입니다.' : '회원가입되었습니다.';
		const ToastSettings = {
			message: toastMsg,
			timeout: 3000
		};
		toastStore.trigger(ToastSettings);
		if (msg === 'success') {
			showSetNewMb = false;
			newMbEmail = '';
			newMbName = '';
			getMemberList(0);
		}
		btnSetNewMb.disabled = showSpinner = false;
	};
</script>

{#if $mb.mb_level >= sys7Lv}
	<div class="flex justify-between mt-5">
		<div class="p-2">
			{#if showSetNewMb}
				<form id="newMbForm">
					<input
						type="email"
						class="input mb-2"
						placeholder="이메일"
						required
						bind:value={newMbEmail}
					/>
					<input
						type="text"
						class="input mb-2"
						placeholder="이름"
						required
						bind:value={newMbName}
					/>
					<div class="flex justify-end">
						<button
							class="btn variant-filled-primary btn-sm"
							on:click={setNewMb}
							bind:this={btnSetNewMb}
						>
							{#if showSpinner}
								<GoogleSpin size="1.5rem" />
							{/if}
							신규회원 등록
						</button>
					</div>
				</form>
			{/if}
		</div>
		<div>
			<button
				class="btn variant-filled-surface btn-sm"
				on:click={() => (showSetNewMb = !showSetNewMb)}
			>
				{#if showSetNewMb === false}
					신규회원 등록
					<IconXi iconName="user-plus" addClass="ms-2" />
				{:else}
					닫기
					<IconXi iconName="close-thin" addClass="ms-2" />
				{/if}
			</button>
		</div>
	</div>
{/if}
<div in:scale={{ duration: 150 }}>
	{#if $mb.mb_level >= sys7Lv}
		<div class="flex mb-3">
			<select
				class="select"
				id="selectLv"
				bind:value={selectLv}
				on:change={() => getMemberList(selectLv)}
			>
				<option value="0" selected>전체 등급</option>
				{#each lvArray as lv}
					{#if lv.id <= 7}
						<option value={lv.id}>{lv.id}: {lv.name}</option>
					{/if}
				{/each}
			</select>
		</div>
	{/if}
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>이름</th>
					<th>정보</th>
					{#if $mb.mb_level >= sys7Lv}
						<th>설정</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if memberList}
					{#each memberList as row, i}
						{@const lvNum = Number(row.mb_level)}
						{@const mbEmail = row.mb_email ? row.mb_email : ''}
						{@const mbHp = row.mb_hp ? row.mb_hp : ''}
						{@const mbBrkName = row.brk_name ? row.brk_name : ''}
						<tr>
							<td>
								{row.mb_name}
								<p>{row.mb_id}</p>
								<div class="lvName">
									{@html lvNameElm(lvNum)}
								</div>
							</td>
							<td class="info">
								<p><IconXi iconName="park" />: {addCommas(row.mb_point)}</p>
								<p><IconXi iconName="mail" />: {mbEmail}</p>
								<p><IconXi iconName="mobile" />: {mbHp}</p>
								{#if mbBrkName}
									<p><IconXi iconName="log" />: {mbBrkName}</p>
								{/if}
							</td>
							{#if $mb.mb_level >= sys7Lv}
								<td>
									<select
										class="select"
										on:change={() => setMbLv(row.mb_id, row.ref.value, row.ref, lvNum)}
										bind:this={row.ref}
									>
										{#each lvArray2 as lv}
											<option value={lv.id} selected={lvNum === lv.id}>
												{lv.id}: {lv.name}
											</option>
										{/each}
									</select>
								</td>
							{/if}
						</tr>
					{/each}
				{/if}
			</tbody>
			<!-- <tfoot>
				<tr>
					<th colspan="3"> 페이지 버튼 </th>
				</tr>
			</tfoot> -->
		</table>
	</div>
</div>

<style>
	#newMbForm input {
		text-align: center;
	}
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
	.info {
		text-align: start;
	}
	#selectLv {
		width: 150px;
	}
</style>
