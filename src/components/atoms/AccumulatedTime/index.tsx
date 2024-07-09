import { useEffect, useState } from 'react';

interface AccumulatedTimeProps {
	isPlaying: boolean;
}

interface TimerState {
	timer: number;
}

const AccumulatedTime = ({ isPlaying }: AccumulatedTimeProps) => {
	const [state, setState] = useState<TimerState>({ timer: 0 });

	useEffect(() => {
		let timerIntervalId: ReturnType<typeof setInterval>;

		if (isPlaying) {
			timerIntervalId = setInterval(() => {
				setState((prevState) => ({
					timer: prevState.timer + 1,
				}));
			}, 1000);
		}

		return () => {
			if (timerIntervalId) clearInterval(timerIntervalId);
		};
	}, [isPlaying]);

	const hours = Math.floor(state.timer / 3600);
	const minutes = Math.floor((state.timer % 3600) / 60);

	return (
		<text className="head-bold-24 text-white">
			{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
		</text>
	);
};

export default AccumulatedTime;
