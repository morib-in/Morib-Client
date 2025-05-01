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
		const isSignUp = params.get('isSignUp');

		if (accessToken) {
			setAccessToken(accessToken);
			if (isSignUp === 'true') {
				localStorage.setItem('isSignUp', isSignUp);
				navigate(`${ROUTES_CONFIG.onboarding.path}?step=start`, { replace: true });
			} else {
				navigate(`${ROUTES_CONFIG.home.path}`, { replace: true });
			}
		}
	}, [navigate, search]);

	return <></>;
};

export default RedirectPage;
