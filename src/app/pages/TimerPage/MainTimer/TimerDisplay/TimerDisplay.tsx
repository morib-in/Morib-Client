import React from 'react';

import InnerCircleIcon from '@/shared/assets/svgs/timer/ic_timer_inner_circle.svg?react';

import ButtonTimerPlay from './ButtonTimerPlay/ButtonTimerPlay';
import ProgressCircle from './ProgressCircle/ProgressCircle';

/**
 * 타이머 디스플레이 컴포넌트 props 타입 정의
 */
interface TimerDisplayProps {
	statusText: string;
	formattedTimeText: string;
	timer: number;
	isPlaying: boolean;
	onToggle: () => void;
	disabled?: boolean;
}

/**
 * 타이머 디스플레이 컴포넌트
 *
 * 타이머의 시간 표시, 상태 텍스트 및 재생/정지 버튼을 포함하는 UI
 */
const TimerDisplay = ({
	statusText,
	formattedTimeText,
	timer,
	isPlaying,
	onToggle,
	disabled = false,
}: TimerDisplayProps) => {
	return (
		<div className="relative flex items-center justify-center">
			<ProgressCircle isPlaying={isPlaying} timer={timer} />
			<InnerCircleIcon className="absolute" />
			<div className="absolute flex h-[22rem] w-[27.1rem] flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<span className="text-white head-bold-24">{statusText}</span>
					<span className="text-mint-01 title-semibold-48">{formattedTimeText}</span>
				</div>

				<ButtonTimerPlay onClick={onToggle} isPlaying={isPlaying} disabled={disabled} />
			</div>
		</div>
	);
};

export default TimerDisplay;
