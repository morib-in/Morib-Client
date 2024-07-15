import Lottie from 'react-lottie';

import SVGBtn from '@/components/atoms/SVGBtn';
import LoginPageWrapper from '@/components/templates/LoginPageWrapper';

import { useLottieAnimation } from '@/hooks/useLottieAnimation';

import LottieData from '@/assets/lotties/morib_logo_motion.json';
import GoogleLoginIcon from '@/assets/svgs/google_login.svg?react';

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
				<SVGBtn
					className={`ml-[12rem] transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-0'}`}
				>
					<GoogleLoginIcon />
				</SVGBtn>
			</div>
		</LoginPageWrapper>
	);
};
export default LoginPage;
