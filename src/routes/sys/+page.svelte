<script async script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { mb } from '$lib/store/mbstore';
	import { addCommas, lvArray, lvArray2, lvNameElm, sys7Lv, ibLv } from '$lib/config';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { scale } from 'svelte/transition';
	let memberList: any[];
	let selectLv: number;
	let mbLv = 0;
	let isIB = $mb.mb_level === ibLv ? $mb.mb_id : '';
	const getMemberList = async (mbLv: number, isIB = '', schName = '') => {
		const params = {
			mbLv,
			isIB,
			schName
		};
		const { data } = await instanceWithAuth.post('sys/member/Get_member_list/', params);
		memberList = data.data;
		if (dev) {
			console.log('memberList: ', memberList);
		}
	};
	getMemberList(mbLv, isIB);
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
	let schMbName: string;
	const searchMbName = async () => {
		getMemberList(selectLv, '', schMbName);
	};
</script>

<div in:scale={{ duration: 150 }}>
	{#if $mb.mb_level >= sys7Lv}
		<div class="flex mb-3">
			<div>
				<select
					class="select"
					id="selectLv"
					bind:value={selectLv}
					on:change={() => getMemberList(selectLv, '', schMbName)}
				>
					<option value="0" selected>전체 등급</option>
					{#each lvArray as lv}
						{#if lv.id <= 7}
							<option value={lv.id}>{lv.id}: {lv.name}</option>
						{/if}
					{/each}
				</select>
			</div>
			<div class="ms-2">
				<input
					id="inputSchMbName"
					class="input text-center"
					placeholder="이름 검색"
					type="text"
					bind:value={schMbName}
					on:keyup={searchMbName}
				/>
			</div>
		</div>
	{/if}
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Info</th>
					{#if $mb.mb_level >= sys7Lv}
						<th>Set</th>
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
								<p><IconXi iconName="park" /> {addCommas(row.mb_point)}</p>
								<p><IconXi iconName="mail" /> {mbEmail}</p>
								<p><IconXi iconName="mobile" /> {mbHp}</p>
								{#if row.mb_level >= ibLv}
									<p>
										<IconXi iconName="external-link" />
										{#if mbBrkName}
											{mbBrkName}
											{#if row.mb_2}
												({row.mb_2}%)
											{/if}
										{/if}
									</p>
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
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
	.info {
		text-align: start;
	}
	#selectLv,
	#inputSchMbName {
		width: 130px;
	}
</style>
