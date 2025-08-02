import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/ErrorBoundary/ErrorBoundary';
import LoadingOverlay from '@/shared/components/LoadingOverlay/LoadingOverlay';

import { getAccessToken } from '@/shared/utils/auth';
import { mapStatusToMessage } from '@/shared/utils/error';

import { ROUTES_CONFIG } from './routesConfig';

const ProtectedRoute = () => {
	const accessToken = getAccessToken();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			alert(mapStatusToMessage(401));
			navigate(ROUTES_CONFIG.login.path, { replace: true });
		}
	}, [accessToken, navigate]);

	if (!accessToken) {
		return <LoadingOverlay isLoading dim={false} />;
	}

	return (
		<ErrorBoundary>
			<Outlet />
		</ErrorBoundary>
	);
};

export default ProtectedRoute;
