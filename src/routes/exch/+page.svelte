<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;
	// import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
</script>

<div class="wrap" in:scale={{ duration: 150 }}>
	<form>
		<input class="input" type="text" placeholder="Account" />
		<input class="input" type="number" placeholder="송금액" />
		<div class="flex justify-end">
			<button class="btn variant-filled-primary">송금 신청</button>
		</div>
	</form>
</div>

<style>
	.wrap {
		margin: 50px auto;
		max-width: 450px;
		width: 90%;
	}
	input {
		margin-bottom: 10px;
	}
</style>
