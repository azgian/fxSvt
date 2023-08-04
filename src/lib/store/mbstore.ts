import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { persisted } from 'svelte-local-storage-store';
export const mb = persisted('mb', { mb_id: '' });
export const isLogin = writable(false);
