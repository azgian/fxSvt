<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import { addCommas, lvNameElm, getBrkInfo, getEmailMatch, scrollToId } from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { scale } from 'svelte/transition';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	let memberList: any[];
	const getMemberList = async (lv: number) => {
		const params = {
			mb_level: lv
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		memberList = data.data;
		console.log('memberList: ', memberList);
	};
	getMemberList(4);
	const setMbBrk = async (mbId: string, newBrk: number, thisSel: any, mbBrk: number) => {
		if (!confirm('회사선택 설정을 진행하시겠습니까?')) {
			thisSel.value = mbBrk;
			return false;
		}
		const params = {
			mbId,
			fld: 'mb_1',
			info: newBrk
		};
		const { data } = await instanceWithAuth.post('member/auth/Set_mb_info', params);
		const mbInfo = data.data;
		const brkNameElm = thisSel.closest('tr').querySelector('.brkName');
		const brkInfo = await getBrkInfo(mbInfo.mb_1);
		brkNameElm.innerHTML = brkInfo.name;
	};
	let brkList: any[];
	const getBrkList = async () => {
		const { data } = await instanceWithAuth.post('sys/member/Get_brk_list');
		brkList = data.data;
	};
	getBrkList();
	const setBrkFee = (mb_id: string, fee: string) => {
		console.log('mb_id:', mb_id);
		console.log('fee.length:', fee.length);
	};
	let mbId: string;
	let mbEmail: string;
	let mbName: string;
	let mbBrkId: number;
	let mbFee: number;
	let showSetNewMbGs = false;
	let btnDisabledSetNewMb: any;
	let altBtnText = '신규IB 등록';
	let altBtnColor = 'variant-filled-primary';
	const setIBInfo = async () => {
		if (!(mbEmail && mbName) || !getEmailMatch(mbEmail)) return false;
		const params = {
			mbId,
			mbEmail,
			mbName,
			mbBrkId,
			mbFee
		};
		btnDisabledSetNewMb = showSetNewMbGs = true;
		const { data } = await instanceWithAuth.post('sys/member/Set_mbIB/', params);
		const msg = data.data.msg;
		const toastMsg = msg === 'exist' ? '회원가입된 이메일입니다.' : '회원가입되었습니다.';
		const ToastSettings = {
			message: toastMsg,
			timeout: 3000
		};
		toastStore.trigger(ToastSettings);
		if (msg === 'success') {
			mbId = '';
			mbEmail = '';
			mbName = '';
			mbBrkId = 0;
			mbFee = '';
			getMemberList(4);
		}
		btnDisabledSetNewMb = showSetNewMbGs = false;
	};
	const updateIBInfo = (
		mb_id: string,
		mb_email: string,
		mb_name: string,
		mb_brkId: number,
		mb_fee: number
	) => {
		mbId = mb_id;
		mbEmail = mb_email;
		mbName = mb_name;
		mbBrkId = mb_brkId;
		mbFee = mb_fee;
		altBtnText = 'IB정보 수정';
		altBtnColor = 'variant-filled-warning';
		scrollToId('container-box');
	};
	const undoSetIB = () => {
		mbId = '';
		mbEmail = '';
		mbName = '';
		mbBrkId = '';
		mbFee = '';
		altBtnText = '신규IB 등록';
		altBtnColor = 'variant-filled-primary';
	};
</script>

<div in:scale={{ duration: 150 }}>
	<div class="wrap-box">
		<form>
			<input type="hidden" bind:value={mbId} />
			<input type="email" class="input mb-2" placeholder="이메일" required bind:value={mbEmail} />
			<input type="text" class="input mb-2" placeholder="이름" required bind:value={mbName} />
			<select class="select mb-2" bind:value={mbBrkId}>
				<option value="">회사 선택</option>
				{#if brkList}
					{#each brkList as brk}
						<option value={brk.id} selected={brk.id === mbBrkId}>
							{brk.name}
						</option>
					{/each}
				{/if}
			</select>
			<input
				type="number"
				class="input mb-2"
				placeholder="수수료 (소숫점 1자리까지)"
				bind:value={mbFee}
			/>
			<div class="flex justify-between">
				<div />
				<div>
					<Button
						addClass="variant-filled-surface me-2 btn-icon btn-icon-sm"
						iconNameE="undo"
						iconNameAlt="undo"
						onClick={undoSetIB}
					/>
					<Button
						addClass="{altBtnColor} btn-sm"
						btnText={altBtnText}
						iconNameE="user-plus"
						iconNameAlt="user-plus"
						showGs={showSetNewMbGs}
						onClick={setIBInfo}
						btnType="submit"
						btnDisabled={btnDisabledSetNewMb}
					/>
				</div>
			</div>
		</form>
	</div>

	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Info</th>
					<th>Set</th>
				</tr>
			</thead>
			<tbody>
				{#if memberList}
					{#each memberList as row, i}
						{@const lvNum = Number(row.mb_level)}
						{@const mbEmail = row.mb_email ? row.mb_email : ''}
						{@const mbHp = row.mb_hp ? row.mb_hp : ''}
						{@const mbBrkName = row.brk_name ? row.brk_name : ''}
						{@const mbBrkFee = row.mb_2 ? row.mb_2 : ''}
						<tr>
							<td>
								{row.mb_name}
								<p>{row.mb_id}</p>
								<div class="lvName">
									{@html lvNameElm(lvNum)}
								</div>
							</td>
							<td class="info">
								<p><IconXi iconName="park" /> {addCommas(row.mb_point)}</p>
								<p><IconXi iconName="mail" /> {mbEmail}</p>
								<p><IconXi iconName="mobile" /> {mbHp}</p>
								<p>
									<IconXi iconName="external-link" />
									{mbBrkName}
									{#if mbBrkFee}
										({mbBrkFee}%)
									{/if}
								</p>
							</td>
							<td class="table-cell-fit">
								<Button
									addClass="btn-icon btn-icon-sm variant-filled-surface"
									iconNameE="cog"
									iconNameAlt="cog"
									onClick={() =>
										updateIBInfo(row.mb_id, row.mb_email, row.mb_name, row.mb_1, row.mb_2)}
								/>
							</td>
							<!-- <td>
								<select
									class="select"
									on:change={() => setMbBrk(row.mb_id, row.ref.value, row.ref, mbBrk)}
									bind:this={row.ref}
								>
									<option>회사 선택</option>
									{#if brkList}
										{#each brkList as brk}
											<option value={brk.id} selected={brk.id === mbBrk}>
												{brk.name}
											</option>
										{/each}
									{/if}
								</select>

								<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] mt-3">
									<input
										type="number"
										placeholder="수수료"
										on:keyup={() => setBrkFee(row.mb_id, row.mb_2.value)}
									/>
								</div>
							</td> -->
						</tr>
					{/each}
				{/if}
			</tbody>
			<tfoot>
				<!-- <tr>
					<th colspan="3"> 페이지 버튼 </th>
				</tr> -->
			</tfoot>
		</table>
	</div>
</div>

<style>
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
	.info {
		text-align: start;
	}
	form input {
		text-align: center;
	}
	.wrap-box {
		margin: 15px auto 45px;
		max-width: 450px;
		width: 90%;
	}
</style>
