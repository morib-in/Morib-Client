import Lottie from 'react-lottie';

import ButtonSVG from '@/shared/components/ButtonSVG';

import { useLottieAnimation } from '@/shared/hooks/useLottieAnimation';

import LottieData from '@/shared/assets/lotties/morib_logo_motion.json';
import GoogleLoginIcon from '@/shared/assets/svgs/google_login.svg?react';

import LoginPageWrapper from '@/components/templates/LoginPageWrapper';

const defaultOptions = {
	autoplay: true,
	loop: false,
	animationData: LottieData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const API_URL = `${import.meta.env.VITE_GOOGLE_URL}`;

const LoginPage = () => {
	const { isAnimationComplete, lottieRef, handleAnimationComplete } = useLottieAnimation();
	const handleClick = () => {
		window.location.href = API_URL;
	};

	return (
		<LoginPageWrapper>
			<div className="h-[37rem] w-[60rem]">
				<Lottie
					ref={lottieRef}
					options={defaultOptions}
					height={310}
					width={600}
					isClickToPauseDisabled={true}
					eventListeners={[
						{
							eventName: 'complete',
							callback: handleAnimationComplete,
						},
					]}
				/>
				{/* Todo: 추후 로그인 로직 추가 */}
				<ButtonSVG
					onClick={handleClick}
					className={`ml-[12rem] transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-0'}`}
				>
					<GoogleLoginIcon />
				</ButtonSVG>
			</div>
		</LoginPageWrapper>
	);
};
export default LoginPage;
