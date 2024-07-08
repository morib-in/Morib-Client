import AccumulatedTime from '@/components/atoms/AccumulatedTime';
import PlayBtn from '@/components/atoms/PlayBtn';
import ProgressCircle from '@/components/atoms/ProgressCircle';
import TaskTime from '@/components/atoms/TaskTime';

import InnerCircleIcon from '@/assets/svgs/elipse.svg?react';

const Timer = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-bg-01">
			<div className="relative flex items-center justify-center">
				<ProgressCircle />
				<InnerCircleIcon className="absolute z-0" />
				<div className="z-1 absolute flex flex-col items-center justify-center">
					<div className="relative top-[1rem]">
						<AccumulatedTime />
					</div>
					<div className="relative top-[1rem]">
						<TaskTime />
					</div>
					<div className="relative top-[3rem]">
						<PlayBtn />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timer;
