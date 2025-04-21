import React, { useCallback } from 'react';

import { getFormattedTimeInfo } from '@/pages/TimerPage/utils/timeFormat';

import { useTimerContext } from '../contexts/TimerContext';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TimerHeader from './TimerHeader/TimerHeader';

/**
 * 메인 타이머 컴포넌트
 *
 * 타이머 헤더와 타이머 디스플레이를 포함하며, 타이머 상태와 재생/정지 기능을 관리.
 */
const MainTimer = () => {
	// 타이머 컨텍스트에서 필요한 상태와 액션만 가져오기
	const { timer, elapsedTime, totalElapsedTimeOfToday, isPlaying, selectedTask, actions } = useTimerContext();

	// 작업이 선택되어 있는지 여부
	const hasSelectedTask = selectedTask.id !== null;

	// 재생/정지 토글 핸들러 - 작업이 선택되지 않은 경우 처리 방지
	const handlePlayPauseToggle = useCallback(() => {
		if (!hasSelectedTask) return;

		// 현재 상태의 반대로 토글
		actions.togglePlay(!isPlaying);
	}, [isPlaying, hasSelectedTask, actions]);

	// 표시할 시간 정보 계산 - 유틸 함수로 분리하여 관심사 분리
	const timeInfo = getFormattedTimeInfo(timer, elapsedTime, totalElapsedTimeOfToday);

	return (
		<div className="flex flex-col items-center justify-center gap-[4.5rem]">
			{/* 타이머 헤더 - 선택된 작업 정보 표시 */}
			<TimerHeader
				selectedTaskName={selectedTask.name}
				selectedTaskCategoryName={selectedTask.categoryName}
				hasSelectedTask={hasSelectedTask}
			/>

			{/* 타이머 디스플레이 - 시간 표시 및 제어 버튼 */}
			<TimerDisplay
				statusText={timeInfo.statusText}
				formattedTimeText={timeInfo.formattedTimeText}
				timer={timer}
				isPlaying={isPlaying}
				onToggle={handlePlayPauseToggle}
			/>
		</div>
	);
};

export default MainTimer;
