import { useEffect, useState } from 'react';

const useTimerCount = (isPlaying: boolean, previousTime: number) => {
	const [timer, setTimer] = useState(previousTime);

	useEffect(() => {
		let timerIntervalId: ReturnType<typeof setInterval>;

		if (isPlaying) {
			timerIntervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		}

		return () => {
			if (timerIntervalId) clearInterval(timerIntervalId);
		};
	}, [isPlaying]);

	return timer;
};

export default useTimerCount;
