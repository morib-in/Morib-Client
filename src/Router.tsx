import type { Router } from '@remix-run/router';

import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import TimerPage from '@/pages/TimerPage';

import { ROUTES } from './constants/router';
import withAuthProtection from './hocs/withAuthProtection';
import RedirectPage from './pages/RedirectPage';

const ProtectedHomePage = withAuthProtection(HomePage);
const ProtectedTimerPage = withAuthProtection(TimerPage);

export const router: Router = createBrowserRouter([
	{
		path: ROUTES.login.path,
		element: <LoginPage />,
	},
	{
		path: ROUTES.home.path,
		element: <ProtectedHomePage />,
	},
	{
		path: ROUTES.timer.path,
		element: <ProtectedTimerPage />,
	},
	{
		path: ROUTES.redirect.path,
		element: <RedirectPage />,
	},
]);
