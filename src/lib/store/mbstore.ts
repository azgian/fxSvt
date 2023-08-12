import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { persisted } from 'svelte-local-storage-store';
export const mb = persisted('mb', {});
export const isLogin = writable(false);
export const recommendId = writable('');
export const obj_mb_info = {
	mb_id: 'u000000',
	mb_name: '',
	mb_level: 0,
	mb_point: 0
};
// export const mb = writable(obj_mb_info);
