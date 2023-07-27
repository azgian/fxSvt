<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { scale } from 'svelte/transition';
	console.log(data);
</script>

<div in:scale={{ duration: 150 }}>
	<div>
		최신글 페이지에서 ajax 쓰듯이 뽑아오기

		<div class="mt-5 font-bold">
			{data.data.bo_subject}
		</div>
		<div>
			{#if data.data.list?.length > 0}
				{#each data.data.list as item}
					<div class="px-2 py-2 border-b flex">
						<div>
							{item.wr_subject}
						</div>
						<div class="ml-auto">
							{item.wr_datetime}
						</div>
					</div>
				{/each}
			{:else}
				<div>데이터가 없습니다.</div>
			{/if}
		</div>
	</div>
	<!-- <ChartCoins coinsList={data.coinsList} /> -->
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
