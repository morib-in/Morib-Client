import { useEffect, useState } from 'react';

interface TimerState {
	timer: number;
}

const AccumulatedTime = () => {
	const [state, setState] = useState<TimerState>({ timer: 0 });

	useEffect(() => {
		const timerIntervalId = setInterval(() => {
			setState((prevState) => ({
				timer: prevState.timer + 1,
			}));
		}, 1000);

		return () => {
			clearInterval(timerIntervalId);
		};
	}, []);

	const formatTime = (unit: number) => unit.toString().padStart(1, '0');
	const hours = Math.floor(state.timer / 3600);
	const minutes = Math.floor((state.timer % 3600) / 60);

	return (
		<div className="flex h-screen items-center justify-center bg-gray-bg-01">
			<h3 className="head-bold-24 text-white">
				{hours === 0
					? `오늘 ${formatTime(minutes)}분 몰입 중`
					: `오늘 ${formatTime(hours)}시간 ${formatTime(minutes)}분 몰입 중`}
			</h3>
		</div>
	);
};

export default AccumulatedTime;
