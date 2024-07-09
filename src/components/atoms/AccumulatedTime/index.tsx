import { useEffect, useState } from 'react';

interface AccumulatedTimeProps {
	isPlaying: boolean;
	accumulatedTime: number;
}

const AccumulatedTime = ({ isPlaying, accumulatedTime }: AccumulatedTimeProps) => {
	const [timer, setTimer] = useState(accumulatedTime);

	useEffect(() => {
		setTimer(accumulatedTime);

		let timerIntervalId: ReturnType<typeof setInterval>;

		if (isPlaying) {
			timerIntervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		}

		return () => {
			if (timerIntervalId) clearInterval(timerIntervalId);
		};
	}, [isPlaying, accumulatedTime]);

	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);

	return (
		<span className="head-bold-24 text-white">
			{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
		</span>
	);
};

export default AccumulatedTime;
