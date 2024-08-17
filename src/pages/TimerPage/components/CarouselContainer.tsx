import useCarouselTimer from '@/shared/hooks/useCarouselTimer';

import { formatSeconds } from '@/shared/utils/time';

import ClockIcon from '@/shared/assets/svgs/icon_clock.svg?react';

interface CarouselContainerProps {
	image: string;
	name: string;
	time: number;
	categoryname: string;
	isPlaying: boolean;
}

const CarouselContainer = ({ image, name, time, categoryname, isPlaying }: CarouselContainerProps) => {
	const timer = useCarouselTimer({ isPlaying, previousTime: time });
	const formattedTime = formatSeconds(timer);

	return (
		<div className="py-[0.5rem 0.7rem] flex h-[15rem] w-[9.8rem] flex-col items-center justify-center px-[0.8rem]">
			<img src={image} alt="유저 프로필" className="mb-[1rem] h-[7.4rem] w-[7.4rem]" />
			<div className="flex justify-center gap-[0.2rem]">
				<ClockIcon />
				<span className="detail-reg-14 text-mint-02">{formattedTime}</span>
			</div>
			<span className="detail-semibold-14 text-white">{name}</span>
			<span className="detail-reg-12 text-gray-04">{categoryname}</span>
		</div>
	);
};

export default CarouselContainer;
