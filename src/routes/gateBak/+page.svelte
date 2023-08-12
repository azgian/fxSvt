<script lang="ts">
	import { instance } from '$lib/common/api';
	import { mb, isLogin, obj_mb_info } from '$lib/store/mbstore';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconXi from '$lib/components/IconXi.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
	let mb_id: string = '';
	let mb_password: string = '';
	let auto_login: boolean;
	const login = async () => {
		const params = {
			mb_id,
			mb_password,
			auto_login
		};
		const { data } = await instance.post('member/login', params);
		if (dev) console.log('D ', data);
		if (data?.data?.accessToken) {
			localStorage.setItem('accessToken', data?.data?.accessToken);
			localStorage.setItem('refreshToken', data?.data?.refreshToken);
			mb.set(data?.data?.mb);
			goto('./');
			mb_id = '';
			mb_password = '';
		} else {
			localStorage.clear();
			mb.set(obj_mb_info);
		}
		//jwt 토큰 받아와 저장
	};
	let tabSet: number = 0;
	if ($isLogin) goto('./');
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="tab1" value={0}>로그인</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>회원가입</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div id="login-box" in:scale={{ duration: 150 }}>
				<form>
					<input class="input" bind:value={mb_id} type="text" placeholder="ID" required />
					<input
						class="input"
						bind:value={mb_password}
						type="password"
						placeholder="PASSWORD"
						required
					/>
					<div class="flex justify-between">
						<label class="flex items-center space-x-2">
							<input class="checkbox" bind:value={auto_login} type="checkbox" checked />
							<p>로그인유지</p>
						</label>
						<button class="btn variant-filled-secondary" on:click={login}>
							<span><IconXi iconName="log-in" /></span>
							<span>Login</span>
						</button>
					</div>
				</form>
			</div>
		{:else if tabSet === 1}
			<div id="register-box" in:scale={{ duration: 150 }}>
				<form />
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>

<style>
	#login-box {
		margin: 0 auto;
		max-width: 300px;
		width: 80%;
	}
	#register-box {
		margin: 0 auto;
		max-width: 450px;
		width: 90%;
	}
	input {
		text-align: center;
		margin-bottom: 10px;
	}
</style>
