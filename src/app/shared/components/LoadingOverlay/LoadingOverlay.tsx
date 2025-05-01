import { useRef } from 'react';
import Lottie from 'react-lottie';

import LoadingLottie from '@/shared/assets/lotties/loading.json';

import Portal from '../Portal/Portal';

const defaultOptions = {
	autoplay: true,
	animationData: LoadingLottie,
};

interface LoadingOverlayProps {
	isLoading: boolean;
	dim?: boolean;
}

const LoadingOverlay = ({ isLoading, dim = true }: LoadingOverlayProps) => {
	const lottieRef = useRef<any>(null);

	const bgStyle = dim ? 'bg-dim' : 'bg-gray-bg-01';

	return (
		<>
			{isLoading && (
				<Portal elementId="overlay">
					<div className={`absolute inset-0 z-[999] flex h-screen w-screen items-center justify-center ${bgStyle}`}>
						<span>
							<Lottie height={120} width={120} ref={lottieRef} options={defaultOptions} />
							<p className="text-center text-gray-04 title-bold-32">Loading...</p>
						</span>
					</div>
				</Portal>
			)}
		</>
	);
};

export default LoadingOverlay;
