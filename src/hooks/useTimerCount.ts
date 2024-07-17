import { useEffect, useState } from 'react';

interface UseTimerCountProps {
	isPlaying: boolean;
	previousTime: number;
}

const useTimerCount = ({ isPlaying, previousTime }: UseTimerCountProps) => {
	const [timer, setTimer] = useState(previousTime);

	useEffect(() => {
		setTimer(previousTime);
	}, [previousTime]);

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
