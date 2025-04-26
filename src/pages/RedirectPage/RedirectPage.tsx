import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setAccessToken } from '@/shared/utils/auth';

import { ROUTES_CONFIG } from '@/router/routesConfig';

const RedirectPage = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(search);
		const accessToken = params.get('accessToken');
		const 온보딩완료여부 = params.get('isOnboardingComplete');

		if (accessToken) {
			setAccessToken(accessToken);
			if (온보딩완료여부 === 'true') {
				localStorage.setItem('isOnboardingComplete', 온보딩완료여부);
				navigate(`${ROUTES_CONFIG.onboarding.path}?step=start`, { replace: true });
			} else {
				navigate(`${ROUTES_CONFIG.home.path}`, { replace: true });
			}
		}
	}, [navigate, search]);

	return <></>;
};

export default RedirectPage;
