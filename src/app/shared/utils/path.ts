import { ROUTES_CONFIG } from '@/router/routesConfig';

export const getActivePath = (path: string) => {
	let activePage;

	switch (path) {
		case ROUTES_CONFIG.home.path:
			activePage = ROUTES_CONFIG.home.path;
			break;
		case ROUTES_CONFIG.onboarding.path:
			activePage = ROUTES_CONFIG.onboarding.path;
			break;
		case ROUTES_CONFIG.allowedService.path:
			activePage = ROUTES_CONFIG.allowedService.path;
			break;
		default:
			activePage = '';
			break;
	}

	return activePage;
};
