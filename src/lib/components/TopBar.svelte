<script lang="ts">
	import { mb, isLogin } from '$lib/store/mbstore';
	import { addCommas } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
</script>

<div class="paddingLeft320">
	<div id="user-box">
		<IconXi iconName="profile" fontSize="35px" />
		{#if $isLogin}
			<!-- <span class="user-name">{$mb.mb_name}</span> -->
			<span class="user-cash">{addCommas($mb.mb_point)}</span>
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
	}
	#user-box .user-name {
		margin-left: 10px;
		font-size: 0.95rem;
	}
	#user-box .user-cash {
		margin-left: 10px;
		font-size: 1.25rem;
	}
	@media (max-width: 400.98px) {
	}
	@media (max-width: 1020.98px) {
		.paddingLeft320 {
			padding-left: 0px;
		}
	}
</style>
