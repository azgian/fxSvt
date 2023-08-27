<script lang="ts">
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { scale } from 'svelte/transition';
	import IconXi from '$lib/components/IconXi.svelte';
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
	let brkInfo: any[];
	let btnSetBrkList: any;
	let showSpinner = false;
	const setBrkList = async () => {
		if (!brName || !brAccount) return false;
		btnSetBrkList.disabled = showSpinner = true;
		const params = {
			brId,
			brName,
			brLogo,
			brAccount
		};
		const { data } = await instanceWithAuth.post('sys/member/Set_brk_list/', params);
		brkInfo = data.data;
		if (dev) {
			console.log('brkInfo: ', brkInfo);
		}
		btnSetBrkList.disabled = showSpinner = false;
		undoSetBrk();
		getBrkList();
	};
	let newBrk = true;
	const setBrkInfo = async (id: string, name: string, account: string, logo: string = '') => {
		brId = id;
		brName = name;
		brAccount = account;
		brLogo = logo;
		newBrk = false;
	};
	const undoSetBrk = () => {
		brId = '';
		brName = '';
		brAccount = '';
		brLogo = '';
		newBrk = true;
	};
	let deleteId: any[];
	const deleteBrk = async () => {
		if (!confirm('정보삭제를 진행하시겠습니까?')) return false;
		const params = {
			brId
		};
		console.log('brId:', brId);
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
		<input type="hidden" bind:value={brLogo} />
		<!-- <label class="label mb-2">
			<span>Logo</span>
			<input
				class="input"
				name="logo"
				type="file"
				accept="image/png, image/jpeg"
				bind:files={logo}
				on:change={onChangeHandler}
			/>
		</label> -->
		<div class="flex justify-between">
			<!-- <div class="alert variant-ringed-surface grow me-2" id="logo-box">
				<div class="alert-message">
					<IconXi iconName="image-o" fontSize="2rem" addClass="text-surface-500" />
				</div>
			</div> -->
			<div>
				{#if !newBrk}
					<button class="btn variant-filled-error" on:click={deleteBrk} type="button">
						<span><IconXi iconName="trash" /></span>
						<span>삭제</span>
					</button>
				{/if}
			</div>
			<div>
				<button class="btn variant-filled-surface me-2" on:click={undoSetBrk} type="button"
					><span><IconXi iconName="undo" /></span> <span>취소</span></button
				>
				<button class="btn variant-filled-tertiary" on:click={setBrkList} bind:this={btnSetBrkList}>
					{#if showSpinner}
						<GoogleSpin size="1.5rem" />
					{/if}
					<span><IconXi iconName="upload" /></span>
					<span
						>BR
						{#if newBrk}
							등록
						{:else}
							수정
						{/if}
					</span>
				</button>
			</div>
		</div>
	</form>
</div>

<div class="table-container mt-5" in:scale={{ duration: 150 }}>
	<table class="table table-hover table-compact">
		<thead>
			<tr>
				<th>로고</th>
				<th>회사명</th>
				<th>계좌</th>
				<th>Set</th>
			</tr>
		</thead>
		<tbody>
			{#if brkList}
				{#each brkList as row, i}
					<tr>
						<td class="logo"><IconXi iconName="image-o" /></td>
						<td class="name">{row.name}</td>
						<td class="account">{row.account}</td>
						<td class="table-cell-fit">
							<button
								class="btn-icon btn-icon-sm variant-filled-surface"
								on:click={() => setBrkInfo(row.id, row.name, row.account)}
							>
								<IconXi iconName="cog" />
							</button>
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
