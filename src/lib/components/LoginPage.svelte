<script lang="ts">
	import { page } from '$app/stores';
	import { instance } from '$lib/common/api';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconXi from '$lib/components/IconXi.svelte';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import { scale } from 'svelte/transition';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let agentId: string = ''; //추천인 아이디
	const popupInfo: PopupSettings = {
		event: 'click',
		target: 'popupInfo',
		placement: 'top'
	};
	const setDisabled = (stat = true) => {
		const elms = document.querySelectorAll('.setDisabled');
		elms.forEach((elm) => {
			stat ? elm.setAttribute('disabled', 'disabled') : elm.removeAttribute('disabled');
		});
	};

	const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	let isRegister = false;
	let isReqCode = false;
	let isSendCode = false;
	let email: string;
	let authCode: string;
	let initCode: string;
	const reqCode = async () => {
		if (!email || email.match(regExp) == null) return false;
		setDisabled();
		isReqCode = true;
		isSendCode = false;
		const params = {
			email,
			isRegister
		};
		const { data } = await instance.post('member/auth/Req_code', params);
		isReqCode = false;
		authCode = data?.data?.auth_code;
		if (dev) console.log('D ', authCode);
		if (authCode !== 'non') initCode = authCode.substr(0, 2);
		else setDisabled(false);
		//jwt 토큰 받아와 저장
	};

	let getAuth = false;
	let numberCode: string;
	// const recommendId = agentId;
	const sendCode = async () => {
		const params = {
			authCode,
			initCode,
			numberCode,
			isRegister,
			email,
			recommendId: agentId
		};
		const { data } = await instance.post('member/auth/Send_code', params);
		isSendCode = data?.data?.is_send_code;
		getAuth = data?.data?.get_auth;
		if (!getAuth) setRefresh();
		else {
			localStorage.setItem('accessToken', data?.data?.accessToken);
			localStorage.setItem('refreshToken', data?.data?.refreshToken);
			const mb_info = data.data.mb;
			mb.set(mb_info);
			isLogin.set(true);
			if (dev) {
				console.log('mb_info.mb_id: ', mb_info.mb_id);
				console.log('data: ', data);
			}
			if (!isRegister) {
				goto('/'); //로그인
			} else {
				goto('/office'); //회원정보 설정
			}
		}
	};
	let btnTxt = '로그인';
	let btnClass = 'variant-filled-primary';
	const chkRegister = (event: any) => {
		if (event.target.checked) {
			btnTxt = '회원가입';
			btnClass = 'variant-filled-warning';
		} else {
			btnTxt = '로그인';
			btnClass = 'variant-filled-primary';
		}
		setRefresh();
	};
	const setRefresh = () => {
		authCode = '';
		numberCode = '';
		setDisabled(false);
	};
	// console.log('page: ', $page.url.pathname);
</script>

<div class="wrap-box" in:scale={{ duration: 150 }}>
	<form>
		{#if $page.url.pathname.startsWith('/u')}
			<div class="flex mb-4">
				<label class="flex items-center space-x-3">
					<input
						class="checkbox setDisabled"
						type="checkbox"
						bind:checked={isRegister}
						on:change={chkRegister}
					/>
					<h4 class="text-surface-400">회원가입</h4>
				</label>
				<button use:popup={popupInfo} type="button" class="ms-6">
					<IconXi iconName="help" fontSize="30px" addClass="text-secondary-500" />
				</button>
				<div class="card p-4 variant-filled-secondary shadow-xl" data-popup="popupInfo">
					<div>회원가입을 원하시면 체크하세요.</div>
					<div class="arrow variant-filled-secondary" />
				</div>
			</div>
		{/if}
		<input
			class="input setDisabled"
			bind:value={email}
			on:change={setRefresh}
			type="email"
			placeholder="이메일을 입력하세요."
			required
		/>
		<div class="flex justify-end mt-4">
			<button class="btn {btnClass} setDisabled" on:click={reqCode}>
				<span><IconXi iconName="mail" /></span>
				<span>{btnTxt} 인증코드 받기</span>
			</button>
		</div>
	</form>

	{#if isReqCode}
		<div class="pt-6 text-center">
			<IconXi iconName="spinner-3" fontSize="2rem" addClass="xi-spin" />
		</div>
	{/if}
	{#if authCode}
		<div class="mt-4" in:scale={{ duration: 150 }}>
			{#if authCode !== 'non'}
				<span class="text-surface-500">이메일로 받은 인증코드를 입력하세요.</span>
				<form>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<input bind:value={initCode} readonly />
						<input
							bind:value={numberCode}
							type="number"
							placeholder="인증코드 (숫자만 입력하세요)"
							required
						/>
					</div>
					<div class="flex justify-between mt-4">
						<button class="btn variant-filled-surface" type="button" on:click={setRefresh}
							><span><IconXi iconName="refresh" /></span><span>인증초기화</span></button
						>
						<button class="btn variant-filled-secondary" on:click={sendCode}>
							<span><IconXi iconName="check-circle" /></span>
							<span>인증코드 확인</span>
						</button>
					</div>
				</form>
			{:else}
				<div class="mt-4" in:scale={{ duration: 150 }}>
					{#if isRegister}
						<AlertBox message="회원가입된 이메일입니다." />
					{:else}
						<AlertBox
							message="등록되지 않은 이메일입니다.<br />
					올바른 이메일을 확인하시거나 회원가입 하시기 바랍니다."
						/>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
	{#if isSendCode}
		{@const btnAction = `<a class="btn variant-filled-tertiary" href="./office">닉네임 설정하기</a>`}
		{#if getAuth}
			<div class="mt-4" in:scale={{ duration: 150 }}>
				<AlertBox message="회원가입되었습니다.<br>닉네임을 설정하세요." actionContent={btnAction} />
			</div>
		{:else}
			<div class="mt-4" in:scale={{ duration: 150 }}>
				<AlertBox message="인증코드가 일치하지 않습니다.<br />인증절차를 다시 시작하세요." />
			</div>
		{/if}
	{/if}
</div>

<style>
	.wrap-box {
		margin: 100px auto 0;
		max-width: 450px;
		width: 90%;
	}
	input {
		text-align: center;
	}
</style>
