<script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { GoogleSpin } from 'svelte-loading-spinners';
	export let btnClass: string = 'btn';
	export let addClass: string;
	export let btnText: string = '';
	export let btnTextAlt: string = '';
	export let gsSize: string = '1.5rem';
	export let showGs = false;
	export let iconNameS: string = '';
	export let iconNameE: string = '';
	export let iconNameAlt: string = '';
	export let onClick: any;
	export let showAlt = false;
	export let btnDisabled = false;
	export let btnType: any = 'button';
	export const actAlt = () => {
		if (btnTextAlt) showAlt = !showAlt;
	};
</script>

<button
	class="{btnClass} {addClass}"
	on:click={actAlt}
	on:click={onClick}
	type={btnType}
	disabled={btnDisabled}
>
	{#if showGs}
		<GoogleSpin size={gsSize} />
	{/if}
	{#if iconNameS}
		{#if !showAlt}
			<IconXi iconName={iconNameS} addClass="m2-2" />
		{:else}
			<IconXi iconName={iconNameAlt} addClass="m2-2" />
		{/if}
	{/if}
	{#if btnText}
		<span class="mx-2">
			{#if !showAlt}
				{btnText}
			{:else}
				{btnTextAlt}
			{/if}
		</span>
	{/if}
	{#if iconNameE}
		{#if !showAlt}
			<IconXi iconName={iconNameE} />
		{:else}
			<IconXi iconName={iconNameAlt} />
		{/if}
	{/if}
</button>
