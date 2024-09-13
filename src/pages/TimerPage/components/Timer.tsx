import { useQueryClient } from '@tanstack/react-query';

import { usePostTimerStop } from '@/shared/apis/timer/queries';

import InnerCircleIcon from '@/shared/assets/svgs/elipse.svg?react';

import AccumulatedTime from '@/pages/TimerPage/components/AccumulatedTime';
import ButtonTimerPlay from '@/pages/TimerPage/components/ButtonTimerPlay';
import ProgressCircle from '@/pages/TimerPage/components/ProgressCircle';
import TaskTime from '@/pages/TimerPage/components/TaskTime';

interface TaskTotalTimeProps {
	selectedTodo: number | null;
	onPlayToggle: (isPlaying: boolean) => void;
	isPlaying: boolean;
	formattedTodayDate: string;
	timerTime: number;
	timerIncreasedTime: number;
	resetTimerIncreasedTime: () => void;
	accumulatedTime: number;
	resetAccumulatedIncreasedTime: () => void;
}

const Timer = ({
	selectedTodo,
	onPlayToggle,
	isPlaying,
	formattedTodayDate,
	timerTime,
	timerIncreasedTime,
	resetTimerIncreasedTime,
	accumulatedTime,
	resetAccumulatedIncreasedTime,
}: TaskTotalTimeProps) => {
	const queryClient = useQueryClient();

	const { mutate, isError, error } = usePostTimerStop();

	const handlePlayPauseToggle = () => {
		if (selectedTodo !== null) {
			if (isPlaying) {
				mutate(
					{ id: selectedTodo, elapsedTime: timerIncreasedTime, targetDate: formattedTodayDate },
					{
						onSuccess: () => {
							onPlayToggle(false);
							resetTimerIncreasedTime();
							resetAccumulatedIncreasedTime();
							queryClient.invalidateQueries({ queryKey: ['todo', formattedTodayDate] });
						},
					},
				);
			} else {
				onPlayToggle(true);
			}
		}
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
					<AccumulatedTime accumulatedTime={accumulatedTime} />
					<TaskTime isPlaying={isPlaying} timer={timerTime} />
				</div>
				<div>
					<ButtonTimerPlay onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
				</div>
			</div>
		</div>
	);
};

export default Timer;
