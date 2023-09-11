<script lang="ts">
	import { mb, isLogin } from '$lib/store/mbstore';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconXi from '$lib/components/IconXi.svelte';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';
	import { scale } from 'svelte/transition';
</script>

<!-- <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
	{
	"interval": "4h",
	"width": 425,
	"isTransparent": true,
	"height": 450,
	"symbol": "FX_IDC:EURUSD",
	"showIntervalTabs": true,
	"locale": "kr",
	"colorTheme": "light"
  }
	</script> -->

{#if !$isLogin}
	<LoginPage />
{:else}
	<div in:scale={{ duration: 150 }}>
		<!-- <div class="tradingview-widget-container">
			<div class="tradingview-widget-container__widget" />
			<div class="tradingview-widget-copyright">
				<a href="https://kr.tradingview.com/" rel="noopener nofollow" target="_blank"
					><span class="blue-text">트레이딩뷰에서 모든 시장 추적</span></a
				>
			</div>
		</div> -->
	</div>
{/if}
