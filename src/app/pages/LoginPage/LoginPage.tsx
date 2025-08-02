import { useEffect } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import LottieData from '@/shared/assets/lotties/main_motion.json';
import GoogleLoginIcon from '@/shared/assets/svgs/google_login.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { useLottieAnimation } from '@/pages/LoginPage/hooks/useLottieAnimation';
import { authConfig } from '@/shared/config/auth';

const defaultOptions = {
	autoplay: true,
	loop: false,
	animationData: LottieData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const LoginPage = () => {
	const { isAnimationComplete, lottieRef, handleAnimationComplete } = useLottieAnimation();
	const navigate = useNavigate();

	const handleClick = () => {
		if (window.electron) {
			window.open(authConfig.google.url.electron, '_blank');
		} else {
			window.location.href = authConfig.google.url.react;
		}
	};

	const handleMouseEnter = () => {
		import('@/pages/HomePage/HomePage').catch((error) => {
			console.error('홈페이지를 받아오는데 오류가 발생했습니다.', error);
		});
	};

	useEffect(() => {
		if (authConfig.isAuthenticated()) {
			navigate(ROUTES_CONFIG.home.path);
		}
	}, [navigate]);

	return (
		<div className="flex h-screen items-center justify-center bg-login bg-login-bg bg-cover">
			<div className="flex flex-col items-center justify-center">
				<Lottie
					ref={lottieRef}
					options={defaultOptions}
					height={310}
					width={600}
					speed={5}
					isClickToPauseDisabled={true}
					eventListeners={[
						{
							eventName: 'complete',
							callback: handleAnimationComplete,
						},
					]}
				/>
				{/* Todo: 추후 로그인 로직 추가 */}
				<button
					onMouseEnter={handleMouseEnter}
					onClick={handleClick}
					className={`transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-0'}`}
				>
					<GoogleLoginIcon />
				</button>
			</div>
		</div>
	);
};
export default LoginPage;
