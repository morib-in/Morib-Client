import { useQueryClient } from '@tanstack/react-query';

import AccumulatedTime from '@/components/atoms/AccumulatedTime';
import PlayBtn from '@/components/atoms/PlayBtn';
import ProgressCircle from '@/components/atoms/ProgressCircle';
import TaskTime from '@/components/atoms/TaskTime';

import useTimerCount from '@/hooks/useTimerCount';

import { useGetTodoList, usePostTimerStop } from '@/apis/timer/queries';

import InnerCircleIcon from '@/assets/svgs/elipse.svg?react';

interface TaskTotalTimeProps {
	totalTimeOfToday: number;
	targetTime: number;
	selectedTodo: number | null;
	setIsPlaying: (isPlaying: boolean) => void;
	isPlaying: boolean;
}

const Timer = ({ totalTimeOfToday, targetTime, selectedTodo, setIsPlaying, isPlaying }: TaskTotalTimeProps) => {
	const queryClient = useQueryClient();
	const { timer, increasedTime } = useTimerCount({ isPlaying, previousTime: targetTime });
	const accumulatedTime = totalTimeOfToday || 0;
	const { mutate, isError, error } = usePostTimerStop();
	const { data: timerData } = useGetTodoList('2024-07-15');

	const handlePlayPauseToggle = () => {
		if (selectedTodo !== null) {
			if (isPlaying) {
				mutate(
					{ id: selectedTodo, elapsedTime: increasedTime },
					{
						onSuccess: () => {
							setIsPlaying(false);
							queryClient.invalidateQueries({ queryKey: ['todo'] });
						},
					},
				);
			} else {
				setIsPlaying(true);
			}
		}
	};

	if (isError) {
		console.error(error);
	}

	return (
		<div className="mt-[8.2rem] flex items-center justify-center">
			<ProgressCircle isPlaying={isPlaying} timer={timer} />
			<InnerCircleIcon className="absolute" />
			<div className="absolute flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<AccumulatedTime isPlaying={isPlaying} totalTimeOfToday={accumulatedTime} />
					<TaskTime isPlaying={isPlaying} timer={timerData?.timer || timer} />
				</div>
				<div>
					<PlayBtn onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
				</div>
			</div>
		</div>
	);
};

export default Timer;
