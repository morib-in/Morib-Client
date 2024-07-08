import { useEffect, useState } from 'react';

interface TaskTimeProps {
	isPlaying: boolean;
}

interface TimerState {
	timer: number;
}

const TaskTime = ({ isPlaying }: TaskTimeProps) => {
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

	const formatTime = (unit: number) => unit.toString().padStart(2, '0');
	const hours = Math.floor(state.timer / 3600);
	const minutes = Math.floor((state.timer % 3600) / 60);
	const seconds = state.timer % 60;

	return (
		<div className="title-semibold-64 text-mint-01">
			{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
		</div>
	);
};

export default TaskTime;
