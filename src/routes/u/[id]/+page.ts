import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		mb_id: params.id
	};
}) satisfies PageLoad;
