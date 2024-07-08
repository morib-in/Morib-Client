import { useState } from 'react';

import AccumulatedTime from '@/components/atoms/AccumulatedTime';
import PlayBtn from '@/components/atoms/PlayBtn';
import ProgressCircle from '@/components/atoms/ProgressCircle';
import TaskTime from '@/components/atoms/TaskTime';

import InnerCircleIcon from '@/assets/svgs/elipse.svg?react';

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayPauseToggle = () => {
		setIsPlaying((prevState) => !prevState);
	};

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-bg-01">
			<div className="flex items-center justify-center">
				<ProgressCircle isPlaying={isPlaying} />
				<InnerCircleIcon className="absolute" />
				<div className="absolute mt-[3rem] flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
					<AccumulatedTime isPlaying={isPlaying} />
					<div className="w-[27.1rem]">
						<TaskTime isPlaying={isPlaying} />
					</div>
					<div className="mt-[3rem]">
						<PlayBtn onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timer;
