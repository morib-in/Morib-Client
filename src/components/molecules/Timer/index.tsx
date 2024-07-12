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
			<div className="absolute flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<AccumulatedTime isPlaying={isPlaying} accumulatedTime={accumulatedTime} />
					<TaskTime isPlaying={isPlaying} timer={timer} />
				</div>
				<div>
					<PlayBtn onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
				</div>
			</div>
		</div>
	);
};

export default Timer;
