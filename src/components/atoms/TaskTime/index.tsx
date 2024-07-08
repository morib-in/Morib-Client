import { useEffect, useState } from 'react';

interface TimerState {
	timer: number;
}

const TaskTime = () => {
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

	const formatTime = (unit: number) => unit.toString().padStart(2, '0');
	const hours = Math.floor(state.timer / 3600);
	const minutes = Math.floor((state.timer % 3600) / 60);
	const seconds = state.timer % 60;

	return (
		<h3 className="title-semibold-64 text-mint-01">
			{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
		</h3>
	);
};

export default TaskTime;
