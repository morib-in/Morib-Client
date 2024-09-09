import { useEffect } from 'react';

import useTimerCount from '@/shared/hooks/useTimerCount';

interface AccumulatedTimeProps {
	isPlaying: boolean;
	totalTimeOfToday: number;
}

const AccumulatedTime = ({ isPlaying, totalTimeOfToday }: AccumulatedTimeProps) => {
	const { timer, resetIncreasedTime } = useTimerCount({
		isPlaying,
		previousTime: totalTimeOfToday,
	});

	useEffect(() => {
		if (!isPlaying) {
			resetIncreasedTime();
		}
	}, [isPlaying, resetIncreasedTime]);

	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);

	return (
		<span className="head-bold-24 text-white">
			{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
		</span>
	);
};

export default AccumulatedTime;
