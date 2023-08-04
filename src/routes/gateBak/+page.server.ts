// import type { Actions } from './$types';
// import { API_G5_URL } from '$lib/config';

// export const actions = {
// 	login: async ({ request }) => {
// 		const data = await request.formData();
// 		console.log(data);
// 		const res = await fetch(API_G5_URL + 'member/login', {
// 			method: 'POST',
// 			body: data,
// 			headers: {
// 				'x-sveltekit-action': 'true'
// 			}
// 		});
// 		const result = await res.json();
// 		return { result };
// 	},
// 	register: async (event) => {
// 		// TODO register the user
// 	}
// } satisfies Actions;
