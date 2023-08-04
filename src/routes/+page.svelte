<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { scale } from 'svelte/transition';
	const latestArr = data.data.list;
	const bo_subject = data.data.bo_subject;
	// console.log(latestArr);
</script>

<div in:scale={{ duration: 150 }}>
	<div>
		<div class="mt-5 font-bold">
			<i class="xi-home" />{bo_subject}
		</div>
		<div>
			{#if latestArr?.length > 0}
				{#each latestArr as item}
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
	<div class="p-4">
		<a href="./gate">GATE</a>
	</div>
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
