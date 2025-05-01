import { HttpResponse, http } from 'msw';

import { COMMON_RES } from './common.responses';

export const COMMON_MOCK_URL = {
	GET_URL_NAME: 'api/v2/tabName',
};

export const commonResolvers = [
	http.get(COMMON_MOCK_URL.GET_URL_NAME, async ({ request }) => {
		const url = new URL(request.url);
		const tabName = url.searchParams.get('tabName');

		if (!tabName) {
			console.error('경로 파라미터에 tabName이 없습니다.');
			throw new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json(COMMON_RES.GET_URL_NAME);
	}),
];
