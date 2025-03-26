import { ButtonHTMLAttributes, ReactNode, useRef } from 'react';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import Spacer from '@/shared/components/Spacer/Spacer';

import useCarousel from '@/shared/hooks/useCarousel';

import { RecommendSiteType } from '@/shared/types/allowedService';
import { Direction } from '@/shared/types/global';

import { getServiceFavicon } from '@/pages/OnboardingPage/utils/serviceUrl';

interface RecommendServiceItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	recommendSite: RecommendSiteType;
}
const RecommendServiceItem = ({ recommendSite, ...props }: RecommendServiceItemProps) => {
	return (
		<button
			{...props}
			className="flex w-[23.9rem] flex-shrink-0 items-center gap-[1.5rem] rounded-[8px] bg-gray-bg-01 p-[2rem]"
		>
			<img
				src={getServiceFavicon(recommendSite.siteUrl)}
				alt="favicon"
				className="h-[4.2rem] w-[4.2rem] rounded-full"
			/>
			<p className="max-h-[8.4rem] overflow-hidden text-white subhead-bold-20">{recommendSite.siteName}</p>
		</button>
	);
};

interface RecommendServiceRootProps {
	children: ReactNode;
}

const RecommendServiceRoot = ({ children }: RecommendServiceRootProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { handleNext, handlePrev } = useCarousel({ carouselRef });

	return (
		<Spacer.Width className="relative h-[18.8rem] flex-shrink-0 rounded-[16px] bg-gray-bg-03 px-[2.8rem] py-[2.4rem]">
			<Spacer.Width className="flex items-end justify-between">
				<h2 className="text-white head-bold-24">추천 서비스</h2>
				<div className="flex items-center">
					<ButtonArrowSVG
						className="flex h-[3.4rem] w-[3.4rem] items-center justify-center"
						direction={Direction.LEFT}
						onClick={handlePrev}
					/>
					<ButtonArrowSVG
						className="z-10 flex h-[3.4rem] w-[3.4rem] items-center justify-center"
						direction={Direction.RIGHT}
						onClick={handleNext}
					/>
				</div>
			</Spacer.Width>

			<Spacer.Width>
				<div ref={carouselRef} className="my-[2.4rem] flex w-full min-w-0 items-center gap-[1.4rem] overflow-x-auto">
					{children}
					<div className="absolute right-0 top-0 z-0 h-[18.8rem] w-[7.2rem] flex-shrink-0 rounded-r-[16px] bg-gradient-to-r from-transparent to-[#33373F]" />
				</div>
			</Spacer.Width>
		</Spacer.Width>
	);
};

const RecommendService = Object.assign(RecommendServiceRoot, {
	Item: RecommendServiceItem,
});

export default RecommendService;
