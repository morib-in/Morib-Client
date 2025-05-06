import Lottie from 'react-lottie';

import LottieData from '@/shared/assets/lotties/morib_logo_motion.json';
import GoogleLoginIcon from '@/shared/assets/svgs/google_login.svg?react';

import { useLottieAnimation } from '@/pages/LoginPage/hooks/useLottieAnimation';

const defaultOptions = {
	autoplay: true,
	loop: false,
	animationData: LottieData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const API_URL = `${import.meta.env.VITE_GOOGLE_URL}`;
const ELECTRON_URL = `${import.meta.env.VITE_ELECTRON_AUTH_URL}`;

const LoginPage = () => {
	const { isAnimationComplete, lottieRef, handleAnimationComplete } = useLottieAnimation();

	const handleClick = () => {
		if (window.electron) {
			window.open(ELECTRON_URL, '_blank');
		} else {
			window.location.href = API_URL;
		}
	};

	const handleMouseEnter = () => {
		import('@/pages/HomePage/HomePage').catch((error) => {
			console.error('홈페이지를 받아오는데 오류가 발생했습니다.', error);
		});
	};

	return (
		<div className="flex h-screen items-center justify-center bg-login bg-login-bg bg-cover">
			<div className="h-[37rem] w-[60rem]">
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
					className={`ml-[12rem] transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-0'}`}
				>
					<GoogleLoginIcon />
				</button>
			</div>
		</div>
	);
};
export default LoginPage;
