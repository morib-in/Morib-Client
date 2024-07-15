import { useEffect, useRef, useState } from 'react';

export const useLottieAnimation = () => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	// Todo: 추후 정확한 타입 추가, lottie 라이브러리 Lottie 컴포넌트의 정확한 타입을 아직 확인하지 못하여 일단 any로 해당 엘리먼트를 받아왔음
	const lottieRef = useRef<any>(null);

	const handleAnimationComplete = () => {
		setIsAnimationComplete(true);
	};

	useEffect(() => {
		if (lottieRef.current) {
			lottieRef.current.play();
		}
	}, []);

	return {
		isAnimationComplete,
		lottieRef,

		handleAnimationComplete,
	};
};
