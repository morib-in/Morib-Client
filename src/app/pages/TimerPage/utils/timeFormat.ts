import { formatSeconds } from '@/shared/utils/time';

/**
 * 타이머 시간 정보를 포맷팅하는 유틸리티 함수
 * 표시할 시간 값을 계산하고 포맷팅.
 *
 * @param timer 현재 타이머 시간 (초 단위)
 * @param elapsedTime 서버에서 받아온 총 경과 시간 (초 단위)
 * @param totalElapsedTimeOfToday 서버에서 받아온 오늘의 총 작업 시간 (초 단위)
 * @returns 포맷팅된 시간 정보 객체
 */
export const getFormattedTimeInfo = (timer: number, elapsedTime: number, totalElapsedTimeOfToday: number) => {
	const formattedTimeText = formatSeconds(timer);

	const totalTimeToday = totalElapsedTimeOfToday + (timer > elapsedTime ? timer - elapsedTime : 0);

	const hours = Math.floor(totalTimeToday / 3600);
	const minutes = Math.floor((totalTimeToday % 3600) / 60);

	const statusText = hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`;

	return {
		formattedTimeText,
		statusText,
		hours,
		minutes,
		seconds: timer % 60,
		totalElapsedTimeToday: totalTimeToday,
	};
};

/**
 * 타이머가 증가한 시간을 계산.
 * 선택된 작업에 따라 타이머 증가 시간을 동기화.
 *
 * @param todoId 할일 ID
 * @param todoElapsedTime 할일의 서버 저장 경과 시간
 * @param selectedTaskId 현재 선택된 작업 ID
 * @param currentTimer 현재 타이머 시간
 * @returns 증가한 시간 (초 단위)
 */
export const getTimerIncreasedTime = (
	todoId: number,
	todoElapsedTime: number,
	selectedTaskId: number | null,
	currentTimer: number,
) => {
	if (todoId === selectedTaskId) {
		return currentTimer - todoElapsedTime;
	}
	return 0;
};
