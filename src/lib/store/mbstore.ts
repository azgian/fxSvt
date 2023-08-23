import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
export const isLogin = writable(false);
export const recommendId = writable('');
export const objMbInfo = {
	mb_id: 'u000000',
	mb_name: '',
	mb_level: 0,
	mb_point: 0,
	mb_hp: ''
};
export const mb = persisted('mb', objMbInfo);
export const lvInfo: any[] = [];
lvInfo[1] = '비회원';
lvInfo[2] = '회원';
lvInfo[4] = 'IB';
lvInfo[6] = 'BRK';
lvInfo[7] = 'SYS';
lvInfo[9] = 'SYS';
lvInfo[10] = 'SYS';
// export const lvInfo2 = [
// 	{ lv: 1, name: '비회원' },
// 	{ lv: 2, name: '회원' },
// 	{ lv: 4, name: 'IB' },
// 	{ lv: 6, name: 'BRK' },
// 	{ lv: 7, name: 'SYS' },
// 	{ lv: 9, name: 'SYS' },
// 	{ lv: 10, name: 'SYS' }
// ];
// export const getLv = (lv:number) => {
// 	lvInfo2.lv

// 	return
// }
