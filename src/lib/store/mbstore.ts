import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
export const isLogin = writable(false);
export const recommendId = writable('');
export const objMbInfo = {
	mb_id: 'u000000',
	mb_name: '',
	mb_level: 0,
	mb_point: 0,
	mb_hp: '',
	mb_email: '',
	mb_recommend: '',
	ib: '',
	brk: '',
	company: ''
};
export const mb = persisted('mb', objMbInfo);
