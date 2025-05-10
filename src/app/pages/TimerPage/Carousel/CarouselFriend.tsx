import React, { memo } from 'react';

import { formatSeconds } from '@/shared/utils/time';

import DefaultProfileIcon from '@/shared/assets/svgs/default_profile.svg';
import ActivatedClockIcon from '@/shared/assets/svgs/icon_clock.svg?react';
import DeactivatedClockIcon from '@/shared/assets/svgs/timer/ic_deactivated_clock.svg?react';
import OnlineIcon from '@/shared/assets/svgs/timer/ic_online.svg?react';

import { useTimerCount } from '../hooks/useTimerCount';

interface CarouselFriendProps {
	id: number;
	image: string;
	name: string;
	time: number;
	categoryName: string;
	isPlaying: boolean;
	isOnline: boolean;
}

/**
 * 캐러셀에 표시되는 친구 아이템 컴포넌트
 * 타이머 시간 계산은 useTimerCount 훅을 사용하여 관심사 분리
 */
const CarouselFriend = memo(function CarouselFriend({
	image,
	name,
	time,
	categoryName,
	isPlaying,
	isOnline,
}: CarouselFriendProps) {
	const { timer } = useTimerCount({
		isPlaying,
		previousTime: time,
		shouldRun: isPlaying,
	});

	const formattedTime = formatSeconds(timer);
	const ClockIcon = isPlaying ? ActivatedClockIcon : DeactivatedClockIcon;

	return (
		<div className="relative flex h-[15rem] w-[9.8rem] flex-shrink-0 flex-col items-center justify-center px-[0.8rem] py-[0.5rem]">
			{/* 프로필 이미지 영역 */}
			<span className="relative mb-[3rem] h-[7.4rem] w-[7.4rem]">
				<img
					src={image}
					alt={`${name}의 프로필`}
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

			{/* 타이머 표시 영역 */}
			<div className="absolute top-[8.4rem] flex items-center gap-[0.4rem]">
				<ClockIcon />
				<span className={`pt-[0.1rem] detail-reg-14 ${isPlaying ? 'text-mint-02' : 'text-gray-03'}`}>
					{formattedTime}
				</span>
			</div>

			{/* 이름 및 카테고리 표시 */}
			<span className="w-full truncate text-center text-white detail-semibold-14">{name}</span>
			<span className="w-full truncate text-center text-gray-04 detail-reg-12">{categoryName}</span>
		</div>
	);
});

export default CarouselFriend;
