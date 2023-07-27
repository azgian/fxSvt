// import type { PageLoad } from './$types';
// import { writableTrSort, writableCoinId } from '$lib/config';

// export const load = (async (loadEvent) => {
// 	//url 에서 다내믹 파라미터를 가져온다.
// 	const { url } = loadEvent;

// 	const page = url.searchParams.get('page');
// 	const page_rows = url.searchParams.get('page_rows');
// 	const sort = url.searchParams.get('sort')
// 		? url.searchParams.get('sort')
// 		: writableTrSort.subscribe((value) => {
// 				return value;
// 		  });
// 	const coinId = url.searchParams.get('coinId')
// 		? url.searchParams.get('coinId')
// 		: writableCoinId.subscribe((value) => {
// 				return value;
// 		  });

// 	const set_params = {
// 		page: page,
// 		page_rows: page_rows,
// 		sort: sort,
// 		coinId: coinId
// 	};

// 	const res = await fetch('http://api.fynx.co.kr/api/addon/latest?bo_table=free');
// 	const result = await res.json();
// 	return { data: result.data };

// }) satisfies PageLoad;
