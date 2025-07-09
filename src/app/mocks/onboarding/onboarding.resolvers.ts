import { HttpResponse, http } from 'msw';

import { ONBOARDING_RES } from './onboarding.responses';

export const ONBOARDING_MOCK_URL = {
	POST_INTEREST_AREA: 'api/v2/onboard',
};

export const onboardingResolvers = [
	http.post<never, { siteName: string; siteUrl: string }[]>(
		ONBOARDING_MOCK_URL.POST_INTEREST_AREA,
		async ({ request }) => {
			const url = new URL(request.url);
			const interestArea = url.searchParams.get('interestArea');

			const body = await request.json();

			if (body.length === 0) return HttpResponse.json(ONBOARDING_RES.POST_INTEREST_AREA);

			if (
				!(body.length > 0 && (typeof body[0].siteName === 'string' || typeof body[0].siteUrl === 'string')) ||
				!interestArea
			) {
				console.error('요청 바디 값과, 쿼리스트링 값을 확인해주세요');
				throw new HttpResponse(null, { status: 400 });
			}

			return HttpResponse.json(ONBOARDING_RES.POST_INTEREST_AREA);
		},
	),
];
