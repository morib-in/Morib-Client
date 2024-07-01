import type { Router } from '@remix-run/router';

import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import TimerPage from '@/pages/TimerPage';

import { ROUTES } from './constants/router';

export const router: Router = createBrowserRouter([
	{
		path: ROUTES.login.path,
		element: <LoginPage />,
	},
	{
		path: ROUTES.home.path,
		element: <HomePage />,
	},
	{
		path: ROUTES.timer.path,
		element: <TimerPage />,
	},
]);
