<script lang="ts">
	import { goto } from '$app/navigation';
	import { instanceWithAuth } from '$lib/common/api';
	import { dev } from '$app/environment';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { siteHost, getCopyText } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
	import { scale } from 'svelte/transition';
	import AlertBox from '$lib/components/AlertBox.svelte';
	if (!$isLogin) goto('/');
	let mbName: string = $mb.mb_name;
	let mbHp: string = $mb.mb_hp;
	let mbId = $mb.mb_id;
	const setMbName = () => {
		setMbInfo('mb_name', mbName);
	};
	const setMbHp = () => {
		setMbInfo('mb_hp', mbHp);
	};
	let disabledMbName = $mb.mb_name ? true : false;
	let disabledMbHp = $mb.mb_hp ? true : false;
	const setMbInfo = async (fld: string, info: string) => {
		const params = {
			fld,
			info,
			mbId
		};
		const { data } = await instanceWithAuth.post('member/auth/Set_mb_info', params);
		const mb_info = data.data.mb_info;
		const mb_fld = data.data.mb_fld;
		const mb_level = data.data.mb_level;
		if (mb_fld === 'mb_name') {
			mb.update((info) => {
				return {
					...info,
					mb_name: mb_info
				};
			});
			mbName = $mb.mb_name;
			disabledMbName = true;
		}
		if (mb_fld === 'mb_hp') {
			mb.update((info) => {
				return {
					...info,
					mb_hp: mb_info
				};
			});
			mbHp = $mb.mb_hp;
			disabledMbHp = true;
		}
		if (mb_level !== $mb.mb_level) {
			mb.update((info) => {
				return {
					...info,
					mb_level: mb_level
				};
			});
		}
		if (dev) console.log('D:mb_info: ', mb_info);
		if (dev) console.log('D:fld: ', mb_fld);
	};
	let isCopied = false;
	const setCopy = () => {
		getCopyText(siteHost + '/u/' + $mb.mb_id.substring(1));
		isCopied = true;
	};
	// const setTelegram = async (fld: string, info: string) => {
	// 	const params = {
	// 		'data-telegram-login':'fynx_bot',
	// 		'data-size':'medium'
	// 		'data-auth-url':'/auth/telegram/'
	// 	}
	// }
</script>

<div class="wrap" in:scale={{ duration: 150 }}>
	{#if $mb.mb_level < 2}
		<div class="mb-6">
			<AlertBox
				message="회원가입 되셨습니다.<br>회원정보를 설정하시면 사이트 이용을 위한 회원승급이 됩니다."
			/>
		</div>
	{/if}

	<form>
		<h4 class="text-center text-surface-500">
			<IconXi iconName="mail" />
			{$mb.mb_email}
		</h4>
		{#if $mb.mb_brkName}
			<h4 class="text-center text-surface-500 mb-2">
				<IconXi iconName="log" />
				{$mb.mb_brkName}
			</h4>
		{/if}
		<label class="label">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><IconXi iconName="profile-o" /></div>
				<input type="text" bind:value={mbName} on:keyup={() => (disabledMbName = false)} />
				<button class="variant-filled-secondary" on:click={setMbName} disabled={disabledMbName}
					>회원이름 설정</button
				>
			</div>
			{#if !$mb.mb_name}
				<span class="text-warning-300"><IconXi iconName="pen-o" /> 회원이름을 설정하세요</span>
			{/if}
		</label>
	</form>

	<form>
		<label class="label">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><IconXi iconName="mobile" /></div>
				<input
					type="number"
					bind:value={mbHp}
					placeholder="숫자만 입력하세요."
					on:keyup={() => (disabledMbHp = false)}
				/>
				<button class="variant-filled-secondary" on:click={setMbHp} disabled={disabledMbHp}
					>전화번호 설정</button
				>
			</div>
			{#if !$mb.mb_hp}
				<span class="text-warning-300"><IconXi iconName="pen-o" /> 전화번호를 설정하세요</span>
			{/if}
		</label>
	</form>
</div>
{#if $mb.mb_level >= 4}
	<div class="variant-ghost p-3">
		<div class="flex justify-between">
			<h3 id="ibLinkUrl" class="text-surface-400">{siteHost}/u/{$mb.mb_id.substring(1)}</h3>
			<button class="btn variant-filled-primary btn-sm" on:click={setCopy}
				><IconXi iconName="documents-o" /> 복사</button
			>
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
		margin-bottom: 15px;
	}
	.label span {
		padding-top: 5px;
		margin-left: 15px;
	}
</style>
