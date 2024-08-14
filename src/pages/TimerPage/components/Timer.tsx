import { useQueryClient } from '@tanstack/react-query';

import { useGetTodoList, usePostTimerStop } from '@/shared/apis/timer/queries';

import InnerCircleIcon from '@/shared/assets/svgs/elipse.svg?react';

import AccumulatedTime from '@/pages/TimerPage/components/TimerAccumulatedTime';
import PlayBtn from '@/pages/TimerPage/components/TimerPlayBtn';
import ProgressCircle from '@/pages/TimerPage/components/TimerProgressCircle';
import TaskTime from '@/pages/TimerPage/components/TimerTaskTime';

interface TaskTotalTimeProps {
	totalTimeOfToday: number;
	targetTime: number;
	selectedTodo: number | null;
	setIsPlaying: (isPlaying: boolean) => void;
	isPlaying: boolean;
	formattedTodayDate: string;
	timerTime: number;
	timerIncreasedTime: number;
	resetIncreasedSideBarTime: () => void;
}

const Timer = ({
	totalTimeOfToday,
	selectedTodo,
	setIsPlaying,
	isPlaying,
	formattedTodayDate,
	timerTime,
	timerIncreasedTime,
	resetIncreasedSideBarTime,
}: TaskTotalTimeProps) => {
	const queryClient = useQueryClient();
	const accumulatedTime = totalTimeOfToday || 0;
	const { mutate, isError, error } = usePostTimerStop();
	const { data: timerData } = useGetTodoList(formattedTodayDate);

	const handlePlayPauseToggle = () => {
		if (selectedTodo !== null) {
			if (isPlaying) {
				mutate(
					{ id: selectedTodo, elapsedTime: timerIncreasedTime, targetDate: formattedTodayDate },
					{
						onSuccess: () => {
							setIsPlaying(false);
							queryClient.invalidateQueries({ queryKey: ['todo', formattedTodayDate] });
							resetIncreasedSideBarTime();
						},
					},
				);
			} else {
				setIsPlaying(true);
			}
		}
		resetIncreasedSideBarTime();
	};

	if (isError) {
		console.error(error);
	}

	return (
		<div className="mt-[8.2rem] flex items-center justify-center">
			<ProgressCircle isPlaying={isPlaying} timer={timerTime} />
			<InnerCircleIcon className="absolute" />
			<div className="absolute flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<AccumulatedTime isPlaying={isPlaying} totalTimeOfToday={accumulatedTime} />
					<TaskTime isPlaying={isPlaying} timer={timerData?.timer || timerTime} />
				</div>
				<div>
					<PlayBtn onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
				</div>
			</div>
		</div>
	);
};

export default Timer;
