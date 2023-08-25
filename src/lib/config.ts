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
	{ id: 1, name: '비회원', ref: null },
	{ id: 2, name: '회원', ref: null },
	{ id: 4, name: 'IB', ref: null },
	{ id: 6, name: 'BR', ref: null },
	{ id: 7, name: 'SYS', ref: null },
	{ id: 9, name: 'SYS', ref: null },
	{ id: 10, name: 'SYS', ref: null }
];
export const lvArray2 = [
	{ id: 1, name: '비회원', ref: null },
	{ id: 2, name: '회원', ref: null },
	{ id: 4, name: 'IB', ref: null },
	{ id: 6, name: 'BR', ref: null },
	{ id: 7, name: 'SYS', ref: null }
];
export const lvColor: any = {
	1: 'surface',
	2: 'primary',
	4: 'success',
	6: 'tertiary',
	7: 'secondary',
	9: 'secondary',
	10: 'secondary'
};
export const getLvName = (lv: number) => {
	const lvObj = lvArray.find((obj) => obj.id === lv);
	return lvObj?.name;
};
export const lvNameElm = (lv: number) => {
	const color = lvColor[lv];
	return '<span class="badge variant-filled-' + color + '">' + getLvName(lv) + '</span>';
};
export const setBtnSpinner = (thisBtn: any, showSpinner: any, act: boolean) => {
	////현재 안됨. 나중에 손볼것
	// thisBtn.disabled = act;
	// showSpinner = act;
	if (act) {
		thisBtn.disabled = true;
		showSpinner = true;
	} else {
		thisBtn.disabled = false;
		showSpinner = false;
	}
	console.log('showSpinner: ', showSpinner);
};
