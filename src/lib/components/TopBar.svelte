<script lang="ts">
	import { resetTimer } from '$lib/config';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { addCommas, lvNameElm } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
	const siteLogoSrc = '/images/logo_fynx.png';
</script>

<div class="flex justify-between">
	<div id="logo-box">
		<a href="/" on:click={resetTimer}>
			<img src={siteLogoSrc} alt="logo" />
		</a>
	</div>
	<div id="user-box">
		{#if $isLogin}
			<IconXi iconName="profile" fontSize="35px" />
			<span class="user-name">{$mb.mb_name}</span>
			<span class="user-level">{@html lvNameElm(Number($mb.mb_level))}</span>
			<span class="user-cash">{addCommas($mb.mb_point)}</span>
		{:else}
			<img src={siteLogoSrc} alt="logo" id="logo-none" />
		{/if}
	</div>
</div>

<style>
	#logo-none {
		display: none;
	}
	#logo-box {
		width: 310px;
	}
	#logo-box img {
		width: 180px;
		margin: auto auto;
	}
	#user-box {
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 2rem;
		width: 400px;
		/* background: #999; */
	}
	#user-box .user-name {
		margin-left: 10px;
		font-size: 0.95rem;
	}
	#user-box .user-cash {
		margin-left: 10px;
		font-size: 1.25rem;
	}
	#user-box .user-level {
		margin-left: 5px;
		font-size: 1rem;
	}
	#user-box img {
		min-width: 150px;
		margin: auto;
	}
	@media (max-width: 400.98px) {
		#user-box {
			max-width: 400px;
		}
	}
	@media (max-width: 1020.98px) {
		#logo-box {
			display: none;
		}
		#logo-none {
			display: block;
			width: 180px;
		}
	}
</style>
