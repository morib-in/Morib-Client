import { useEffect, useRef, useState } from 'react';

interface UseTimerCountProps {
	isPlaying: boolean;
	previousTime: number;
}

const useTimerCount = ({ isPlaying, previousTime }: UseTimerCountProps) => {
	const [increasedTime, setTimer] = useState(0);
	const timerIntervalId = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (isPlaying) {
			if (timerIntervalId.current === null) {
				timerIntervalId.current = setInterval(() => {
					setTimer((prevTimer) => prevTimer + 1);
				}, 1000);
			}
		} else {
			if (timerIntervalId.current !== null) {
				clearInterval(timerIntervalId.current);
				timerIntervalId.current = null;
			}
		}

		return () => {
			if (timerIntervalId.current !== null) {
				clearInterval(timerIntervalId.current);
			}
		};
	}, [isPlaying]);

	const timer = previousTime + increasedTime;

	return { timer, increasedTime };
};

export default useTimerCount;
