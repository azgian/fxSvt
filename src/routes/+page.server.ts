import type { PageServerLoad } from './$types';

export const load = (async () => {
	const res = await fetch('http://api.fynx.co.kr/api/addon/latest?bo_table=free');
	const result = await res.json();
	return { data: result.data };
	// return { result };
	// return result;
}) satisfies PageServerLoad;
