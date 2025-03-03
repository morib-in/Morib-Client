import { Navigate, Outlet } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/ErrorBoundary/ErrorBoundary';

import { getAccessToken } from '@/shared/utils/auth';
import { mapStatusToMessage } from '@/shared/utils/error';

import { ROUTES_CONFIG } from './routesConfig';

const ProtectedRoute = () => {
	const accessToken = getAccessToken();
	if (!accessToken) {
		alert(mapStatusToMessage(401));
		return <Navigate to={ROUTES_CONFIG.login.path} replace />;
	}

	return (
		<ErrorBoundary>
			<Outlet />
		</ErrorBoundary>
	);
};

export default ProtectedRoute;
