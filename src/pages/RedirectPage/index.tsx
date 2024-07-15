import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSignUp } from '@/apis/auth/queries';

import { ROUTES } from '@/constants/router';

const RedirectPage = () => {
	const params = new URLSearchParams(useLocation().search);
	const authorizationCode = params.get('code');
	const navigate = useNavigate();

	const { data, error } = useSignUp(authorizationCode);

	useEffect(() => {
		if (data) {
			const { accessToken, refreshToken } = data || {};

			if (accessToken && refreshToken) {
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				navigate(ROUTES.home.path);
			}
		}

		if (error) {
			alert('다시 로그인 해주세요');
			navigate(ROUTES.login.path, { replace: true });
		}
	}, [error, navigate, data]);

	return <div>RedirectPage</div>;
};

export default RedirectPage;
