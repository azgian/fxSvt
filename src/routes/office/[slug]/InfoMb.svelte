<script lang="ts">
	import { goto } from '$app/navigation';
	import { instanceWithAuth } from '$lib/common/api';
	import { mb } from '$lib/store/mbstore';
	import { siteHost, getCopyText, ibLv } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import { scale } from 'svelte/transition';
	if ($mb.mb_level < 2) goto('/');
	let mbName: string = $mb.mb_name;
	let mbHp: string = $mb.mb_hp;
	let mbId = $mb.mb_id;
	const setMbName = () => {
		setMbInfo(mbId, 'mb_name', mbName);
	};
	const setMbHp = () => {
		setMbInfo(mbId, 'mb_hp', mbHp);
	};
	let disabledMbName = $mb.mb_name ? true : false;
	let disabledMbHp = $mb.mb_hp ? true : false;
	const setMbInfo = async (mb_id: string, fld: string, val: string) => {
		const params = {
			mb_id,
			fld,
			val
		};
		const { data } = await instanceWithAuth.post('member/auth/Set_mb_info', params);
		const mb_fld = data.data.mb_fld;
		const mb_val = data.data.mb_val;
		if (mb_fld === 'mb_name') {
			mb.update((info) => {
				return {
					...info,
					mb_name: mb_val
				};
			});
			mbName = $mb.mb_name;
			disabledMbName = true;
		}
		if (mb_fld === 'mb_hp') {
			mb.update((info) => {
				return {
					...info,
					mb_hp: mb_val
				};
			});
			mbHp = $mb.mb_hp;
			disabledMbHp = true;
		}
	};
	let isCopied = false;
	const setCopy = () => {
		getCopyText(siteHost + '/u/' + $mb.mb_id.substring(1));
		isCopied = true;
	};
</script>

<div class="wrap" in:scale={{ duration: 150 }}>
	<form>
		<h4 class="text-center text-surface-500">
			<IconXi iconName="mail" />
			{$mb.mb_email}
		</h4>
		<h4 class="text-center text-surface-500 mt-1">
			<IconXi iconName="external-link" />
			{$mb.brk.brk_name}
			{#if Number($mb.mb_level) === ibLv && $mb.ib.ib_fee}
				<small>(수수료: {$mb.ib.ib_fee} %)</small>
			{/if}
		</h4>
		<label class="label mt-2">
			<div class="input-group input-group-divider grid-cols-5">
				<div class="col-span-1"><IconXi iconName="profile-o" /></div>
				<input
					type="text"
					class="col-span-3"
					placeholder="이름"
					bind:value={mbName}
					on:keyup={() => (disabledMbName = false)}
				/>
				<Button
					btnClass=""
					addClass="variant-filled-secondary col-span-1"
					iconNameS="pen"
					iconNameAlt="pen"
					btnDisabled={disabledMbName}
					onClick={setMbName}
					btnType="submit"
				/>
			</div>
			{#if !$mb.mb_name}
				<span class="text-warning-300"><IconXi iconName="pen-o" /> 회원이름을 설정하세요</span>
			{/if}
		</label>
	</form>

	<form>
		<label class="label">
			<div class="input-group input-group-divider grid-cols-5">
				<div class="col-span-1"><IconXi iconName="mobile" /></div>
				<input
					type="number"
					class="col-span-3"
					bind:value={mbHp}
					placeholder="전화번호(숫자만 입력)"
					on:keyup={() => (disabledMbHp = false)}
				/>
				<Button
					btnClass=""
					addClass="variant-filled-secondary col-span-1"
					iconNameS="pen"
					iconNameAlt="pen"
					btnDisabled={disabledMbHp}
					onClick={setMbHp}
					btnType="submit"
				/>
			</div>
			{#if !$mb.mb_hp}
				<span class="text-warning-300"><IconXi iconName="pen-o" /> 전화번호를 설정하세요</span>
			{/if}
		</label>
	</form>
</div>
{#if Number($mb.mb_level) === ibLv}
	<div class="variant-ghost p-3">
		<div class="flex justify-between">
			<h3 id="ibLinkUrl" class="text-surface-400">{siteHost}/u/{$mb.mb_id.substring(1)}</h3>
			<Button
				addClass="variant-filled-primary btn-sm"
				btnText="복사"
				iconNameS="documents-o"
				onClick={setCopy}
			/>
		</div>
		{#if isCopied}
			<span class="text-surface-400"
				><IconXi iconName="link" /> 복사되었습니다. 원하시는 곳에 붙여넣기 하세요.</span
			>
		{/if}
	</div>
{/if}

<style>
	.wrap {
		margin: 25px auto;
		max-width: 450px;
		width: 90%;
	}
	form {
		margin-bottom: 10px;
	}
	.label span {
		padding-top: 5px;
		margin-left: 15px;
	}
</style>
