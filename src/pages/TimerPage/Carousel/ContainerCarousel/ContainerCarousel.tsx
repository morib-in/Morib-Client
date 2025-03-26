import { formatSeconds } from '@/shared/utils/time';

import DefaultProfileIcon from '@/shared/assets/svgs/default_profile.svg';
import ActivatedClockIcon from '@/shared/assets/svgs/icon_clock.svg?react';
import DeactivatedClockIcon from '@/shared/assets/svgs/timer/ic_deactivated_clock.svg?react';
import OnlineIcon from '@/shared/assets/svgs/timer/ic_online.svg?react';

import useCarouselTimer from './hooks/useCarouselTimer';

interface ContainerCarouselProps {
	image: string;
	name: string;
	time: number;
	categoryname: string;
	isPlaying: boolean;
	isOnline: boolean;
}

const ContainerCarousel = ({ image, name, time, categoryname, isPlaying, isOnline }: ContainerCarouselProps) => {
	const timer = useCarouselTimer({ isPlaying, previousTime: time });
	const formattedTime = formatSeconds(timer);

	const ClockIcon = isPlaying ? ActivatedClockIcon : DeactivatedClockIcon;

	return (
		<>
			<div className="relative flex h-[15rem] w-[9.8rem] flex-shrink-0 flex-col items-center justify-center px-[0.8rem] py-[0.5rem]">
				<span className="relative mb-[2.9rem] h-[7.4rem] w-[7.4rem]">
					<img
						src={image}
						alt="유저 프로필"
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = DefaultProfileIcon;
						}}
						className="h-[7.4rem] w-[7.4rem] rounded-full"
					/>
					{isOnline && (
						<OnlineIcon className="absolute bottom-[0.4rem] right-[0.6rem] flex-shrink-0 rounded-full border-[0.2rem] border-gray-bg-01" />
					)}
				</span>

				<div className="absolute top-[8.4rem] flex items-center gap-[0.4rem]">
					<ClockIcon />
					<span className={`detail-reg-14 ${isPlaying ? 'text-mint-02' : 'text-gray-03'}`}>{formattedTime}</span>
				</div>
				<span className="text-white detail-semibold-14">{name}</span>
				<span className="text-gray-04 detail-reg-12">{categoryname}</span>
			</div>
		</>
	);
};

export default ContainerCarousel;
