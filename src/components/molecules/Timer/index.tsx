import { useQueryClient } from '@tanstack/react-query';

import AccumulatedTime from '@/components/atoms/AccumulatedTime';
import PlayBtn from '@/components/atoms/PlayBtn';
import ProgressCircle from '@/components/atoms/ProgressCircle';
import TaskTime from '@/components/atoms/TaskTime';

import { useGetTodoList, usePostTimerStop } from '@/shared/apis/timer/queries';
import InnerCircleIcon from '@/shared/assets/svgs/elipse.svg?react';

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
