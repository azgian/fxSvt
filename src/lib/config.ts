import { writable } from 'svelte/store';
import { instanceWithAuth } from '$lib/common/api';
export const siteDomain = 'fynx.co.kr';
export const siteHost = 'http://' + siteDomain;
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
export const ibLv = 4;
export const brLv = 6;
export const sys7Lv = 7;
export const sys8Lv = 8;
export const sys9Lv = 9;
export const sys10Lv = 10;
export const lvArray = [
	{ id: 1, name: '비회원', ref: null },
	{ id: 2, name: '회원', ref: null },
	{ id: ibLv, name: 'IB', ref: null },
	{ id: brLv, name: 'BR', ref: null },
	{ id: sys7Lv, name: 'SYS', ref: null },
	{ id: sys8Lv, name: 'SYS', ref: null },
	{ id: sys9Lv, name: 'SYS', ref: null },
	{ id: sys10Lv, name: 'SYS', ref: null }
];
export const lvArray2 = [
	{ id: 1, name: '비회원', ref: null },
	{ id: 2, name: '회원', ref: null },
	{ id: ibLv, name: 'IB', ref: null },
	{ id: brLv, name: 'BR', ref: null },
	{ id: sys7Lv, name: 'SYS', ref: null }
];
export const lvColor: any = {
	1: 'surface',
	2: 'primary',
	4: 'warning',
	6: 'tertiary',
	7: 'secondary',
	8: 'secondary',
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
export const getBrkInfo = async (id: number) => {
	const params = {
		id
	};
	const { data } = await instanceWithAuth.post('sys/member/Get_brk_info', params);
	return data.data;
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
export const getCopyText = (content: string) => {
	navigator.clipboard
		.writeText(content)
		.then(() => {
			console.log('텍스트가 클립보드에 복사되었습니다.');
		})
		.catch((err) => {
			console.error('텍스트 복사 실패:', err);
		});
};
