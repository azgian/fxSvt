<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import {
		addCommas,
		lvNameElm,
		getEmailMatch,
		writableBrkList,
		setWritableBrkList,
		scrollToId,
		sys7Lv,
		changeClass
	} from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { scale } from 'svelte/transition';
	import { toastStore, SlideToggle } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { mb } from '$lib/store/mbstore';
	if ($mb.mb_level < sys7Lv) goto('/');
	let ibList: any[];
	const getIbList = async () => {
		const params = {
			mbLevel: 4
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		ibList = data.data;
	};
	getIbList();
	setWritableBrkList();
	let mbId = '';
	let mbEmail = '';
	let mbName = '';
	let brkId: number;
	let ibFee: number;
	let ibActive = false;
	let showGsSetIb = false;
	let btnDisabledSetIb = false;
	let altBtnText = '신규IB 등록';
	let altBtnColor = 'variant-filled-primary';
	const setIBList = async () => {
		if (!(mbEmail && mbName && brkId) || !getEmailMatch(mbEmail)) return false;
		const params = {
			mbId,
			mbEmail,
			mbName,
			brkId,
			ibFee,
			ibActive
		};
		btnDisabledSetIb = showGsSetIb = true;
		const { data } = await instanceWithAuth.post('sys/member/Set_ib_list/', params);
		const msg = data.data.msg;
		const mb_id = data.data.mb_id;
		const toastMsg = msg === 'exist' ? '회원가입된 이메일입니다.' : 'IB회원정보 등록되었습니다.';
		const ToastSettings = {
			message: toastMsg,
			timeout: 3000
		};
		toastStore.trigger(ToastSettings);
		btnDisabledSetIb = showGsSetIb = false;
		if (msg === 'success') {
			undoSetIB();
			getIbList();
			scrollToId('td' + mb_id);
			changeClass('tr' + mb_id, 'variant-filled-warning', 2000);
		}
	};
	const updateIBInfo = (
		mb_id: string,
		mb_email: string,
		mb_name: string,
		brk_id: number,
		ib_fee: number,
		ib_active: boolean
	) => {
		mbId = mb_id;
		mbEmail = mb_email;
		mbName = mb_name;
		brkId = brk_id;
		ibFee = ib_fee;
		ibActive = ib_active;
		altBtnText = 'IB정보 수정';
		altBtnColor = 'variant-filled-warning';
		scrollToId('formSetIbList');
	};
	const undoSetIB = () => {
		mbId = '';
		mbEmail = '';
		mbName = '';
		brkId = '';
		ibFee = '';
		ibActive = false;
		altBtnText = '신규IB 등록';
		altBtnColor = 'variant-filled-primary';
	};
</script>

<div in:scale={{ duration: 150 }}>
	<div class="wrap-box pos-relative">
		<span class="pos-abs-top_100" id="formSetIbList" />
		<form>
			<input type="hidden" bind:value={mbId} />
			<input type="email" class="input mb-2" placeholder="이메일" required bind:value={mbEmail} />
			<input type="text" class="input mb-2" placeholder="이름" required bind:value={mbName} />
			<select class="select mb-2" bind:value={brkId}>
				<option value="">회사 선택</option>
				{#if $writableBrkList}
					{#each $writableBrkList as brk, i}
						<option value={Number(brk.brk_id)} selected={Number(brk.brk_id) === brkId}>
							{brk.brk_name}
						</option>
					{/each}
				{/if}
			</select>
			<!-- selected={brk.brk_id === brkId} -->
			<input
				type="number"
				class="input mb-2"
				placeholder="수수료 (소수점 1자리까지)"
				bind:value={ibFee}
			/>
			<div class="flex justify-between">
				<div>
					<SlideToggle name="slide" bind:checked={ibActive} />
				</div>
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
						showGs={showGsSetIb}
						onClick={setIBList}
						btnType="submit"
						btnDisabled={btnDisabledSetIb}
					/>
				</div>
			</div>
		</form>
	</div>

	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Info</th>
					<th>Set</th>
				</tr>
			</thead>
			<tbody>
				{#if ibList}
					{#each ibList as row, i}
						{@const rowMbHp = row.mb_hp ? row.mb_hp : ''}
						{@const rowBrkId = row.brk?.brk_id ? Number(row.brk.brk_id) : 0}
						{@const rowBrkName = row.brk?.brk_name ? row.brk.brk_name : ''}
						{@const rowIbFee = row.ib?.ib_fee ? Number(row.ib.ib_fee) : 0}
						{@const rowMbName = row.mb_name ? row.mb_name : ''}
						{@const rowIbActive = row.ib?.ib_active ? row.ib.ib_active : false}
						<tr id="tr{row.mb_id}">
							<td class="table-cell-fit">
								{#if rowIbActive == false}
									<IconXi iconName="pause-circle-o" fontSize="2rem" addClass="text-surface-500" />
								{:else}
									<IconXi iconName="play-circle" fontSize="2rem" />
								{/if}
							</td>
							<td class="pos-relative">
								{rowMbName}
								<p>{row.mb_id}</p>
								<div class="lvName">
									{@html lvNameElm(Number(row.mb_level))}
								</div>
								<span class="pos-abs-top_100" id="td{row.mb_id}" />
							</td>
							<td class="info">
								<p><IconXi iconName="park" /> {addCommas(Number(row.mb_point))}</p>
								<p><IconXi iconName="mail" /> {row.mb_email}</p>
								<p><IconXi iconName="mobile" /> {rowMbHp}</p>
								<p>
									<IconXi iconName="external-link" />
									{rowBrkName}
									{#if rowIbFee}
										({rowIbFee} %)
									{/if}
								</p>
							</td>
							<td class="table-cell-fit">
								<Button
									addClass="btn-icon btn-icon-sm variant-filled-surface"
									iconNameE="cog"
									iconNameAlt="cog"
									onClick={() =>
										updateIBInfo(
											row.mb_id,
											row.mb_email,
											rowMbName,
											rowBrkId,
											rowIbFee,
											rowIbActive
										)}
								/>
							</td>
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
	select option {
		text-align: center;
	}
	.wrap-box {
		margin: 15px auto 45px;
		max-width: 450px;
		width: 90%;
	}
</style>
