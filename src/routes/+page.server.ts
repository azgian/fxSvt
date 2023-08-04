import type { PageServerLoad } from './$types';
import { API_G5_URL } from '$lib/config';

export const load = (async () => {
	const res = await fetch(API_G5_URL + 'addon/latest?bo_table=free');
	const result = await res.json();
	return { data: result.data };
}) satisfies PageServerLoad;
