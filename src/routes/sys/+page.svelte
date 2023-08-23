<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { goto } from '$app/navigation';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { addCommas, getLvName, lvArray } from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	let memberList: any[];
	let selectLv: number;
	const getMemberList = async () => {
		const params = {
			mb_level: selectLv
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		memberList = data.data;
		// return data.data
		if (dev) {
			console.log('memberList: ', memberList);
		}
	};
	getMemberList();
	// let selectedLv: number;
	let setLv: any;
	const setMbLv = () => {
		console.log('setLv: ', setLv.val);
	};
</script>

<div class="flex mb-3">
	<select class="select" id="selectLv" bind:value={selectLv} on:change={getMemberList}>
		<option value="0" selected>전체 등급</option>
		{#each lvArray as lv}
			{#if lv.id < 9}
				<option value={lv.id}>{lv.id}: {lv.name}</option>
			{/if}
		{/each}
	</select>
</div>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>이름</th>
				<th>정보</th>
				<th>설정</th>
			</tr>
		</thead>
		<tbody>
			{#if memberList}
				{#each memberList as row, i}
					{@const lvNum = Number(row.mb_level)}
					{@const mbEmail = row.mb_email ? row.mb_email : ''}
					{@const mbHp = row.mb_hp ? row.mb_hp : ''}
					<tr>
						<td>
							{row.mb_name}
							<p>{row.mb_id}</p>
							<kbd>
								{getLvName(lvNum)}
							</kbd>
						</td>
						<td class="info">
							<p><IconXi iconName="park" />: {addCommas(row.mb_point)}</p>
							<p><IconXi iconName="mail" />: {mbEmail}</p>
							<p><IconXi iconName="mobile" />: {mbHp}</p>
						</td>
						<td>
							<select class="select" on:select={setMbLv} bind:this={setLv}>
								<option value="">등급 설정</option>
								{#each lvArray as lv}
									<!-- {#if lv.id < 7} -->
									<option value={lv.id} selected={lvNum === lv.id}>
										{lv.id}: {lv.name}
									</option>
									<!-- {/if} -->
								{/each}
							</select>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3" />
			</tr>
		</tfoot>
	</table>
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
	#selectLv {
		width: 150px;
	}
</style>
