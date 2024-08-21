import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useLocation } from 'react-router-dom';
// import { useSignUp } from '@/shared/apis/auth/queries';
import { ROUTES_CONFIG } from '@/router/routesConfig';

const RedirectPage = () => {
	//Todo: 서버 이슈로 로그인 관련 로직 앱잼 끝나고 사용
	// const params = new URLSearchParams(useLocation().search);
	// const authorizationCode = params.get('code');
	const navigate = useNavigate();

	// const { data, error, isError } = useSignUp(authorizationCode);

	// useEffect(() => {
	// 	if (data) {
	// 		const { accessToken, refreshToken } = data || {};
	// 		if (accessToken && refreshToken) {
	// 			localStorage.setItem('accessToken', accessToken);
	// 			localStorage.setItem('refreshToken', refreshToken);
	// 			navigate(ROUTES.home.path);
	// 		}
	// 	}
	// 	if (error) {
	// 		alert('다시 로그인 해주세요');
	// 		navigate(ROUTES.login.path, { replace: true });
	// 	}
	// }, [error, navigate, data]);

	useEffect(() => {
		navigate(ROUTES_CONFIG.home.path, { replace: true });
	}, [navigate]);

	return <div>RedirectPage</div>;
};

export default RedirectPage;
