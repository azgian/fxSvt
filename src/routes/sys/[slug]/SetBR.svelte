<script lang="ts">
	import { instanceWithAuth } from '$lib/common/api';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import { scrollToId, writableBrkList, setWritableBrkList } from '$lib/config';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import IconXi from '$lib/components/IconXi.svelte';
	let brkId: number;
	let brkName = '';
	let brkAccount = '';
	let brkFee: number;
	let brkActive = false;
	let showSpinner = false;
	let btnDisabledSetBrkList: any;
	let altBtnText = '신규BR 등록';
	let altBtnColor = 'variant-filled-tertiary';
	const setBrkInfo = async () => {
		if (!brkName || !brkAccount || !brkFee) return false;
		btnDisabledSetBrkList = showSpinner = true;
		const params = {
			brkId,
			brkName,
			brkAccount,
			brkFee,
			brkActive
		};
		const { data } = await instanceWithAuth.post('sys/member/Set_brk_info/', params);
		if (data.data.result === 'success') {
			setWritableBrkList();
			undoSetBrk();
		}
	};
	let newBrk = true;
	const updateBrkInfo = (
		brk_id: number,
		brk_name: string,
		brk_account: string,
		brk_fee: number,
		brk_active: boolean
	) => {
		brkId = brk_id;
		brkName = brk_name;
		brkAccount = brk_account;
		brkFee = brk_fee;
		brkActive = brk_active;
		newBrk = false;
		scrollToId('formSetBr');
		altBtnText = 'BR정보 수정';
		altBtnColor = 'variant-filled-success';
	};
	const undoSetBrk = () => {
		brkId = '';
		brkName = '';
		brkAccount = '';
		brkFee = '';
		brkActive = false;
		newBrk = true;
		altBtnText = '신규BR 등록';
		altBtnColor = 'variant-filled-tertiary';
		btnDisabledSetBrkList = showSpinner = false;
	};
</script>

<div in:scale={{ duration: 150 }}>
	<div class="wrap-box pos-relative">
		<span class="pos-abs-top_100" id="formSetBr" />
		<form>
			<input type="hidden" bind:value={brkId} />
			<input class="input mb-2" type="text" placeholder="회사명" bind:value={brkName} required />
			<input class="input mb-2" type="text" placeholder="계좌" bind:value={brkAccount} required />
			<input
				class="input mb-2"
				type="number"
				placeholder="수수료 (소수점 1자리까지)"
				bind:value={brkFee}
				required
			/>
			<div class="flex justify-between mt-1">
				<Button
					addClass="variant-filled-surface btn-icon btn-icon-sm"
					iconNameE="undo"
					iconNameAlt="undo"
					onClick={undoSetBrk}
				/>
				<SlideToggle name="slide" bind:checked={brkActive} />
				<Button
					addClass="{altBtnColor} btn-sm ms-2"
					btnText={altBtnText}
					iconNameE="upload"
					iconNameAlt="upload"
					showGs={showSpinner}
					onClick={setBrkInfo}
					btnType="submit"
					btnDisabled={btnDisabledSetBrkList}
				/>
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
				{#if $writableBrkList}
					{#each $writableBrkList as row, i}
						<tr id="tr{row.brk_id}">
							<td class="table-cell-fit">
								{#if row.brk_active == false}
									<IconXi iconName="pause-circle-o" fontSize="2rem" addClass="text-surface-500" />
								{:else}
									<IconXi iconName="play-circle" fontSize="2rem" />
								{/if}
							</td>
							<td class="pos-relative">
								<span class="pos-abs-top_100" id="td{row.brk_id}" />
								{row.brk_name}
							</td>
							<td class="account">
								<p>
									{row.brk_account}
								</p>
								{row.brk_fee} %
							</td>
							<td>
								<Button
									addClass="btn-icon btn-icon-sm variant-filled-surface"
									iconNameE="cog"
									iconNameAlt="cog"
									onClick={() =>
										updateBrkInfo(
											row.brk_id,
											row.brk_name,
											row.brk_account,
											row.brk_fee,
											row.brk_active
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
