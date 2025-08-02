import { useNavigate } from 'react-router-dom';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { removeAllTokens } from '../utils/auth';

export const useLogout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		removeAllTokens();
		navigate(ROUTES_CONFIG.login.path, { replace: true });
	};

	return { handleLogout };
};
