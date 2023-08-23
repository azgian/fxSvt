<script lang="ts">
	import { page } from '$app/stores';
	import { mb, isLogin } from '$lib/store/mbstore';
	import { addCommas, getLvName } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
	const siteLogoSrc = '//' + $page.url.host + '/src/lib/images/logo_fynx.png';
</script>

<div class="paddingLeft320">
	<div id="user-box">
		{#if $isLogin}
			<IconXi iconName="profile" fontSize="35px" />
			<span class="user-name">{$mb.mb_name}</span>
			<span class="user-level">({getLvName(Number($mb.mb_level))})</span>
			<span class="user-cash">{addCommas($mb.mb_point)}</span>
		{:else}
			<img src={siteLogoSrc} alt="logo" />
		{/if}
	</div>
</div>

<style>
	.paddingLeft320 {
		padding-left: 320px;
	}
	#user-box {
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 2rem;
		width: 400px;
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
		.paddingLeft320 {
			padding-left: 0px;
		}
	}
</style>
