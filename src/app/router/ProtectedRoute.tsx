import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/ErrorBoundary/ErrorBoundary';

import { getAccessToken } from '@/shared/utils/auth';
import { mapStatusToMessage } from '@/shared/utils/error';

import { ROUTES_CONFIG } from './routesConfig';

const ProtectedRoute = () => {
	const accessToken = getAccessToken();
	const navigate = useNavigate();

	if (!accessToken) {
		alert(mapStatusToMessage(401));
		navigate(ROUTES_CONFIG.login.path, { replace: true });
		return null;
	}

	return (
		<ErrorBoundary>
			<Outlet />
		</ErrorBoundary>
	);
};

export default ProtectedRoute;
