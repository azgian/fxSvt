<script lang="ts">
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { scale } from 'svelte/transition';
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import { GoogleSpin } from 'svelte-loading-spinners';
	let brkList: any[];
	const getBrkList = async () => {
		const { data } = await instanceWithAuth.post('sys/member/Get_brk_list/');
		brkList = data.data;
		if (dev) {
			console.log('brkList: ', brkList);
		}
	};
	getBrkList();
	let logo: FileList;
	function onChangeHandler(e: Event): void {
		console.log('file data:', e);
	}
	let brId: string = '';
	let brName: string;
	let brAccount: string;
	let brLogo: string;
	let brFee: number;
	let brkInfo: any[];
	let showSpinner = false;
	let btnDisabledSetBrkList: any;
	const setBrkList = async () => {
		if (!brName || !brAccount || !brFee) return false;
		btnDisabledSetBrkList = showSpinner = true;
		const params = {
			brId,
			brName,
			brLogo,
			brAccount,
			brFee
		};
		const { data } = await instanceWithAuth.post('sys/member/Set_brk_list/', params);
		brkInfo = data.data;
		if (dev) {
			console.log('brkInfo: ', brkInfo);
		}
		btnDisabledSetBrkList = showSpinner = false;
		undoSetBrk();
		getBrkList();
	};
	let newBrk = true;
	const setBrkInfo = async (
		id: string,
		name: string,
		account: string,
		fee: number,
		logo: string = ''
	) => {
		brId = id;
		brName = name;
		brAccount = account;
		brLogo = logo;
		brFee = fee;
		newBrk = false;
	};
	const undoSetBrk = () => {
		brId = '';
		brName = '';
		brAccount = '';
		brLogo = '';
		brFee = null;
		newBrk = true;
	};
	let deleteId: any[];
	const deleteBrk = async () => {
		if (!confirm('정보삭제를 진행하시겠습니까?')) return false;
		const params = {
			brId
		};
		const { data } = await instanceWithAuth.post('sys/member/Delete_brk_list/', params);
		deleteId = data.data;
		if (dev) {
			console.log('deleteId: ', deleteId);
		}
		undoSetBrk();
		getBrkList();
	};
</script>

<div class="wrap-box" in:scale={{ duration: 150 }}>
	<form>
		<input type="hidden" bind:value={brId} />
		<input
			class="input mb-2"
			type="text"
			placeholder="회사명을 입력하세요."
			bind:value={brName}
			required
		/>
		<input
			class="input mb-2"
			type="text"
			placeholder="계좌를 입력하세요."
			bind:value={brAccount}
			required
		/>
		<input
			class="input mb-2"
			type="number"
			placeholder="수수료를 입력하세요.(소숫점 한자리까지)"
			bind:value={brFee}
			required
		/>
		<input type="hidden" bind:value={brLogo} />
		<div class="flex justify-between">
			<div>
				{#if !newBrk}
					<Button
						addClass="variant-filled-error"
						btnText="삭제"
						iconNameS="trash"
						iconNameAlt="trash"
						onClick={deleteBrk}
					/>
				{/if}
			</div>
			<div>
				<Button
					addClass="variant-filled-surface me-2"
					btnText="취소"
					iconNameE="undo"
					iconNameAlt="undo"
					onClick={undoSetBrk}
				/>
				<Button
					addClass="variant-filled-tertiary"
					btnText="IB 등록"
					iconNameE="upload"
					iconNameAlt="upload"
					showGs={showSpinner}
					onClick={setBrkList}
					btnType="submit"
					btnDisabled={btnDisabledSetBrkList}
				/>
			</div>
		</div>
	</form>
</div>

<div class="table-container mt-5" in:scale={{ duration: 150 }}>
	<table class="table table-hover table-compact">
		<thead>
			<tr>
				<!-- <th>로고</th> -->
				<th>회사명</th>
				<th>계좌</th>
				<th>수수료 (%)</th>
				<th>Set</th>
			</tr>
		</thead>
		<tbody>
			{#if brkList}
				{#each brkList as row, i}
					<tr>
						<!-- <td class="logo"><IconXi iconName="image-o" /></td> -->
						<td class="name">{row.name}</td>
						<td class="account">{row.account}</td>
						<td class="fee">{row.fee}</td>
						<td class="table-cell-fit">
							<Button
								addClass="btn-icon btn-icon-sm variant-filled-surface"
								iconNameE="cog"
								iconNameAlt="cog"
								onClick={() => setBrkInfo(row.id, row.name, row.account, row.fee)}
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
