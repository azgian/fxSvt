import { writable } from 'svelte/store';
export const API_G5_URL = import.meta.env.VITE_API_ENDPOINT;
export const writableTrSort = writable('');
export const writableCoinId = writable('');
export const writablePriceValue = writable('');
export const resetTimer = (): void => {
	document.getElementById('btnTimer')?.click();
};
export const addCommas = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const setInitAmount = (): void => {
	const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
	inputQuantity.value = '';
	const lastCalcs = document.getElementsByClassName('lastCalc');
	for (let i = 0; i < lastCalcs.length; i++) {
		const lastCalc = lastCalcs[i] as HTMLInputElement;
		lastCalc.value = '0';
	}
};
export const lvArray = [
	{ id: 1, name: '비회원' },
	{ id: 2, name: '회원' },
	{ id: 4, name: 'IB' },
	{ id: 6, name: 'BR' },
	{ id: 7, name: 'SYS' },
	{ id: 9, name: 'SYS' },
	{ id: 10, name: 'SYS' }
];
export const getLvName = (lv: number) => {
	const lvObj = lvArray.find((obj) => obj.id === lv);
	return lvObj?.name;
};
