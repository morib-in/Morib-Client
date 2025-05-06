import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoadingOverlay from '@/shared/components/LoadingOverlay/LoadingOverlay';

import { setAccessToken, setRefreshToken } from '@/shared/utils/auth';

import { ROUTES_CONFIG } from '@/router/routesConfig';

const RedirectPage = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = window.electron
			? new URLSearchParams(window.location.hash.split('?')[1])
			: new URLSearchParams(search);
		const accessToken = params.get('accessToken');
		const refreshToken = params.get('refreshToken');
		const 온보딩완료여부 = params.get('isOnboardingCompleted');

		if (!accessToken || !refreshToken || !온보딩완료여부) {
			navigate(`${ROUTES_CONFIG.login.path}`, { replace: true });
		} else {
			setAccessToken(accessToken);
			setRefreshToken(refreshToken);
		}

		if (온보딩완료여부 === 'false') {
			localStorage.setItem('isOnboardingCompleted', 온보딩완료여부);
			navigate(`${ROUTES_CONFIG.onboarding.path}?step=start`, { replace: true });
		} else if (온보딩완료여부 === 'true') {
			localStorage.setItem('isOnboardingCompleted', 온보딩완료여부);
			navigate(`${ROUTES_CONFIG.home.path}`, { replace: true });
		}
	}, []);

	return <LoadingOverlay isLoading dim={false} />;
};

export default RedirectPage;
