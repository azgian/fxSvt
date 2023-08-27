<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { addCommas, lvArray, lvArray2, lvNameElm, getBrkInfo } from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { scale } from 'svelte/transition';
	let memberList: any[];
	let selectLv: number;
	const getMemberList = async (lv: number) => {
		const params = {
			mb_level: lv
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		memberList = data.data;
	};
	getMemberList(4);
	const setMbBrk = async (mbId: string, newBrk: number, thisSel: any, mbBrk: number) => {
		if (!confirm('회원등급 설정을 진행하시겠습니까?')) {
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
		// console.log('brkInfo TEST:', brkInfo);
		// console.log('mbInfo.mb_1:', mbInfo.mb_1);
		brkNameElm.innerHTML = brkInfo.name;
	};
	let brkList: any[];
	const getBrkList = async () => {
		const { data } = await instanceWithAuth.post('sys/member/Get_brk_list');
		brkList = data.data;
	};
	getBrkList();
</script>

<div in:scale={{ duration: 150 }}>
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
						{@const mbBrk = row.mb_1 ? row.mb_1 : ''}
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
								<p><IconXi iconName="log" />: <span class="brkName">{mbBrkName}</span></p>
							</td>
							<td>
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
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3"> 페이지 버튼 </th>
				</tr>
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
	#selectLv {
		width: 150px;
	}
</style>
