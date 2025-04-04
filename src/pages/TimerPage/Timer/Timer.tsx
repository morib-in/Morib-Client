import { useQueryClient } from '@tanstack/react-query';

import { formatSeconds } from '@/shared/utils/time';

import InnerCircleIcon from '@/shared/assets/svgs/timer/ic_timer_inner_circle.svg?react';

import { timerKeys } from '@/shared/apisV2/timer/timer.keys';
import { usePostUpdateTimerInfo } from '@/shared/apisV2/timer/timer.mutations';

import ButtonTimerPlay from './ButtonTimerPlay/ButtonTimerPlay';
import ProgressCircle from './ProgressCircle/ProgressCircle';

interface TaskTotalTimeProps {
	selectedCategoryName: string;
	selectedTodo: number | null;
	onPlayToggle: (isPlaying: boolean) => void;
	isPlaying: boolean;
	formattedTodayDate: string;
	timerTime: number;
	timerIncreasedTime: number;
	resetTimerIncreasedTime: () => void;
	accumulatedTime: number;
	resetAccumulatedIncreasedTime: () => void;
	updateElapsedTime: (newTime: number) => void;
}

const Timer = ({
	selectedCategoryName,
	selectedTodo,
	onPlayToggle,
	isPlaying,
	formattedTodayDate,
	timerTime,
	timerIncreasedTime,
	resetTimerIncreasedTime,
	accumulatedTime,
	resetAccumulatedIncreasedTime,
	updateElapsedTime,
}: TaskTotalTimeProps) => {
	const queryClient = useQueryClient();

	const { mutate: updateTimerInfo, isError, error } = usePostUpdateTimerInfo();

	const handlePlayPauseToggle = () => {
		if (selectedTodo !== null) {
			if (isPlaying && selectedCategoryName.length > 0) {
				updateElapsedTime(timerTime);

				updateTimerInfo(
					{
						taskId: selectedTodo,
						elapsedTime: timerTime,
						targetDate: formattedTodayDate,
						timerStatus: 'PAUSED',
					},
					{
						onSuccess: () => {
							onPlayToggle(false);
							resetTimerIncreasedTime();
							resetAccumulatedIncreasedTime();
							queryClient.invalidateQueries({ queryKey: timerKeys.timer });
						},
					},
				);
			} else {
				updateTimerInfo(
					{
						taskId: selectedTodo,
						elapsedTime: timerTime,
						targetDate: formattedTodayDate,
						timerStatus: 'PAUSED',
					},
					{
						onSuccess: () => {
							onPlayToggle(true);
						},
					},
				);
			}
		}
	};

	if (isError) {
		console.error(error);
	}

	const hours = Math.floor(accumulatedTime / 3600);
	const minutes = Math.floor((accumulatedTime % 3600) / 60);

	return (
		<div className="relative flex items-center justify-center">
			<ProgressCircle isPlaying={isPlaying} timer={timerTime} />
			<InnerCircleIcon className="absolute" />
			<div className="absolute flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<span className="text-white head-bold-24">
						{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
					</span>
					<span className="text-mint-01 title-semibold-48">{formatSeconds(timerTime)}</span>;
				</div>

				<ButtonTimerPlay onClick={handlePlayPauseToggle} isPlaying={isPlaying} />
			</div>
		</div>
	);
};

export default Timer;
