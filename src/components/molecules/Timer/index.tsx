import { useState } from 'react';

import AccumulatedTime from '@/components/atoms/AccumulatedTime';
import PlayBtn from '@/components/atoms/PlayBtn';
import ProgressCircle from '@/components/atoms/ProgressCircle';
import TaskTime from '@/components/atoms/TaskTime';

import useTimerCount from '@/hooks/useTimerCount';

import InnerCircleIcon from '@/assets/svgs/elipse.svg?react';

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const previousTime = 20000; //임의로 10000을 넣어 놓음
	const timer = useTimerCount({ isPlaying, previousTime });
	const accumulatedTime = 20000; //임의로 30000을 넣어 놓음

	const handlePlayPauseToggle = () => {
		setIsPlaying((prevState) => !prevState);
	};

	return (
		<div className="mt-[8.2rem] flex items-center justify-center">
			<ProgressCircle isPlaying={isPlaying} timer={timer} />
			<InnerCircleIcon className="absolute" />
			<div className="absolute mt-[3rem] flex flex-col items-center justify-center">
				<AccumulatedTime isPlaying={isPlaying} accumulatedTime={accumulatedTime} />
				<TaskTime isPlaying={isPlaying} timer={timer} />
				<div className="mt-[3rem]">
					<PlayBtn onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
				</div>
			</div>
		</div>
	);
};

export default Timer;
