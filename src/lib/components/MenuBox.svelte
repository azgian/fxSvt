<script lang="ts">
	import { page } from '$app/stores';
	import { resetTimer } from '$lib/config';
	import { isLogin } from '$lib/store/mbstore';
	import IconXi from '$lib/components/IconXi.svelte';
	const siteLogoSrc = '//' + $page.url.host + '/src/lib/images/logo_fynx.png';
	const menuList = [
		{ slug: 'main', name: 'Main', icon: 'browser-text' },
		{ slug: 'exch', name: 'Exchange', icon: 'renew' },
		{ slug: 'sys', name: 'Sys', icon: 'server' }
	];
</script>

<div id="menu-wrap">
	{#if $isLogin}
		<div id="logo-box">
			<a href="/" on:click={resetTimer}>
				<img src={siteLogoSrc} alt="logo" />
			</a>
		</div>
		<nav id="menu-box">
			{#each menuList as siteMenu, i}
				{@const menuHref = '//' + $page.url.host + '/' + siteMenu.slug}
				<a href={i === 0 ? '/' : menuHref} on:click={resetTimer}>
					<li
						class={(i === 0 && $page.url.pathname === '/') ||
						$page.url.pathname.startsWith('/' + siteMenu.slug)
							? 'current'
							: undefined}
					>
						<IconXi iconName={siteMenu.icon} fontSize="40px" />
						<div class="menuName">
							{siteMenu.name}
						</div>
					</li>
				</a>
			{/each}
		</nav>
	{/if}
</div>

<style>
	#menu-wrap {
		position: fixed;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: column;
		align-items: end;
		width: 320px;
		height: 100vh;
		background: #151547;
		z-index: 10;
	}
	#logo-box {
		width: 100%;
		padding: 25px 0;
		text-align: center;
	}
	#logo-box img {
		width: 180px;
		margin: 0 auto;
	}
	#menu-box {
		width: 220px;
	}
	#menu-box a {
		text-decoration: none;
	}
	#menu-box li {
		position: relative;
		list-style-type: none;
		height: 50px;
		line-height: 50px;
		padding-right: 15px;
		text-align: right;
		border-radius: 25px 0 0 25px;
		color: #60cdf8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		font-size: 1.5rem;
	}
	#menu-box li:hover {
		text-decoration: none;
		background: rgba(73, 73, 245, 0.3);
	}
	#menu-box li.current {
		background: rgba(73, 73, 245, 0.8);
		color: #151547;
	}
	@media (max-width: 1020.98px) {
		#menu-wrap {
			position: fixed;
			left: 0px;
			bottom: 0px;
			top: auto;
			width: 100%;
			height: 80px;
		}
		#logo-box {
			display: none;
		}
		#menu-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		#menu-box a {
			flex-grow: 1;
			height: 100%;
		}
		#menu-box li {
			height: 100%;
			line-height: 100%;
			text-align: center;
			border-radius: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 0.75rem;
		}
		#menu-box li .menuName {
			position: absolute;
			bottom: 10px;
			left: 0px;
			width: 100%;
			text-align: center;
		}
	}
</style>
