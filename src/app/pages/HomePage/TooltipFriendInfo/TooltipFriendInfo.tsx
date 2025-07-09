import { formatSeconds } from '@/shared/utils/time';

import ConnectionIcon from '@/shared/assets/svgs/connection_icon.svg?react';
import LineIcon from '@/shared/assets/svgs/ic_line.svg?react';
import TooltipTriangleIcon from '@/shared/assets/svgs/tooltip_triangle.svg?react';

import { useTimerCount } from '@/pages/TimerPage/hooks/useTimerCount';

interface TooltipFriendInfoProps {
	id: number;
	image: string;
	name: string;
	time: number;
	categoryName: string;
	isPlaying: boolean;
	isOnline: boolean;
}

const TooltipFriendInfo = ({ image, name, time, categoryName, isPlaying, isOnline }: TooltipFriendInfoProps) => {
	const { timer } = useTimerCount({
		isPlaying,
		previousTime: time,
		shouldRun: isPlaying,
	});

	const formattedTime = formatSeconds(timer);

	return (
		<div className="relative w-[24.6rem]">
			<TooltipTriangleIcon className="absolute left-1/2 top-[-1rem] -translate-x-1/2 transform" />
			<div className="flex w-[24.6rem] flex-col rounded-[5px] bg-gray-bg-03 p-[1.6rem]">
				<div className="flex items-center gap-[1.4rem]">
					<div className="relative">
						<img
							src={image}
							alt={name || '프로필 이미지'}
							className="h-[5.2rem] w-[5.2rem] rounded-full object-cover"
						/>
						{isOnline && (
							<ConnectionIcon className="absolute bottom-[0.45rem] left-[3.6rem] rounded-full border-[0.2rem] border-gray-bg-01 2xl:bottom-[0.5rem] 2xl:left-[4.3rem]" />
						)}
					</div>
					<div className="flex w-[14.8rem] flex-col justify-center gap-[0.5rem]">
						<p className="truncate text-white body-semibold-16">{name}</p>
						<div className="flex items-center justify-start gap-[0.8rem]">
							{categoryName && (
								<>
									<p className="max-w-[7.7rem] truncate text-gray-05 detail-reg-14">{categoryName}</p>
									<LineIcon />
								</>
							)}
							<p className={`detail-reg-14 ${isPlaying ? 'text-mint-01' : 'text-gray-05'}`}>{formattedTime}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TooltipFriendInfo;
