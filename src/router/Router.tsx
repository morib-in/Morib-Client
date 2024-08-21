import type { Router } from '@remix-run/router';

import { Outlet, createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/LoginPage';
import TimerPage from '@/pages/TimerPage/TimerPage';

import RedirectPage from '../pages/RedirectPage';
import { ROUTES_CONFIG } from './routesConfig';

const ProtectedRoute = () => {
	//Todo: 개발이 진행되면 실제 토큰 상태를 받아서 login page로 이동 시킴
	// const accessToken = getAccessTotken();
	// if (!accessToken) {
	// 	alert('로그인 해주세요');
	// 	return <Navigate to="/login" replace />;
	// }
	return <Outlet />;
};

const router: Router = createBrowserRouter([
	{
		//public 라우트들
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: ROUTES_CONFIG.login.path,
				element: <LoginPage />,
			},
			{
				path: ROUTES_CONFIG.redirect.path,
				element: <RedirectPage />,
			},
		],
	},

	{
		//권한이 있어야 접근 가능한 라우트들
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: ROUTES_CONFIG.home.path,
				element: <HomePage />,
			},
			{
				path: ROUTES_CONFIG.timer.path,
				element: <TimerPage />,
			},
		],
	},

	{
		//404 페이지
		path: '*',
		element: <div className="text-3xl">잘못 찾아오셨어요!</div>,
	},
]);

export default router;
