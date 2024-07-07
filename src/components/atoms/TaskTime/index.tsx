import { useEffect, useState } from 'react';

const TaskTime = () => {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		const timerIntervalId = setInterval(() => {
			setTimer((prevTimer) => prevTimer + 1);
		}, 1000);

		return () => {
			clearInterval(timerIntervalId);
		};
	}, []);

	const formatTime = (unit: number) => unit.toString().padStart(2, '0');
	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);
	const seconds = timer % 60;

	return (
		<div className="flex h-screen items-center justify-center bg-gray-bg-01">
			<h3 className="title-semibold-64 text-mint-01">
				{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
			</h3>
		</div>
	);
};

export default TaskTime;
