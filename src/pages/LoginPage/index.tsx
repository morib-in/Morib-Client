import { useCallback, useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';

import SVGBtn from '@/components/atoms/SVGBtn';
import LoginPageWrapper from '@/components/templates/LoginPageWrapper';

import LottieData from '@/assets/lotties/morib_logo_motion.json';
import GoogleLoginIcon from '@/assets/svgs/google_login.svg?react';

const LoginPage = () => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	// Todo: 추후 정확한 타입 추가, lottie 라이브러리 Lottie 컴포넌트의 정확한 타입을 아직 확인하지 못하여 일단 any로 해당 엘리먼트를 받아왔음
	const splashRef = useRef<any>(null);
	const defaultOptions = {
		autoplay: true,
		loop: false,
		animationData: LottieData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const handleAnimationComplete = () => {
		setIsAnimationComplete(true);
	};

	const startAnimation = useCallback(() => {
		if (splashRef.current) {
			splashRef.current.play();
		}
	}, []);

	useEffect(() => {
		if (splashRef.current) {
			splashRef.current.play();
		}
	}, [startAnimation]);

	return (
		<LoginPageWrapper>
			<div className="h-[37rem] w-[60rem]">
				<Lottie
					ref={splashRef}
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
