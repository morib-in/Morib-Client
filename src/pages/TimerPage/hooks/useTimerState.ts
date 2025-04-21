import { useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { timerKeys } from '@/shared/apisV2/timer/timer.keys';
import { usePostTimerPause, usePostTimerRun } from '@/shared/apisV2/timer/timer.mutations';
import { useGetSelectedTimerTask, useGetTimerHeartBeat } from '@/shared/apisV2/timer/timer.queries';

import { useAllowedServices } from './useAllowedServices';
import { useTimerCount } from './useTimerCount';
import { useUrlHandler } from './useUrlHandler';

/**
 * 타이머 상태 관리 훅
 *
 * @param todayFormattedDate 포맷된 오늘 날짜
 * @returns 타이머 상태와 관련 함수들
 */
export function useTimerState(todayFormattedDate: string) {
	const queryClient = useQueryClient();

	const { mutate: pauseTimer } = usePostTimerPause();
	const { mutate: runTimer } = usePostTimerRun();

	// 서버에서 선택된 타이머 작업 조회
	const { data: selectedTimerTaskData } = useGetSelectedTimerTask({
		targetDate: todayFormattedDate,
	});

	// 타이머 상태 추출
	const timerStatus = selectedTimerTaskData?.data?.timerStatus ?? 'PAUSED';
	const serverElapsedTime = selectedTimerTaskData?.data?.elapsedTime ?? 0;
	const totalElapsedTimeOfToday = selectedTimerTaskData?.data?.totalElapsedTimeOfToday ?? 0;

	// 선택된 작업 정보 파싱
	const selectedTaskInfo = useMemo(() => {
		const taskData = selectedTimerTaskData?.data;

		return {
			id: taskData?.selectedTaskId ?? null,
			name: taskData?.taskName ?? '',
			categoryName: taskData?.runningCategoryName ?? '',
			elapsedTime: taskData?.elapsedTime ?? 0,
			status: taskData?.timerStatus ?? 'PAUSED',
		};
	}, [selectedTimerTaskData]);

	// 타이머가 실행 중인지 여부
	const isPlaying = timerStatus === 'RUNNING';

	// isPlaying 상태 변경 콜백
	const setIsPlaying = useCallback(
		(playing: boolean) => {
			if (!selectedTaskInfo.id) return;

			// 현재 상태와 다를 때만 API 호출
			if (playing !== isPlaying) {
				const payload = {
					taskId: selectedTaskInfo.id,
					targetDate: todayFormattedDate,
				};

				if (playing) {
					runTimer(payload, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }),
							});
						},
					});
				} else {
					pauseTimer(payload, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }),
							});
						},
					});
				}
			}
		},
		[isPlaying, pauseTimer, queryClient, runTimer, selectedTaskInfo.id, todayFormattedDate],
	);

	// 허용된 서비스 목록 관리
	const { baseUrls } = useAllowedServices();

	// URL 변경 감지 및 처리
	useUrlHandler({
		isPlaying,
		selectedTaskId: selectedTaskInfo.id,
		baseUrls,
		todayFormattedDate,
		setIsPlaying,
	});

	// 타이머가 실행 중일 때만 heartBeat API 호출
	const { data: heartBeatData } = useGetTimerHeartBeat(
		{
			targetDate: todayFormattedDate,
		},
		isPlaying && selectedTaskInfo.id !== null,
	);

	// 최신 경과 시간 (heartBeat 또는 선택된 작업 데이터에서)
	const currentElapsedTime = heartBeatData?.data?.elapsedTime ?? serverElapsedTime;

	// 타이머 카운트 훅
	const { timer } = useTimerCount({
		isPlaying,
		previousTime: currentElapsedTime,
		shouldRun: isPlaying,
	});

	/**
	 * 선택된 작업 상태 업데이트 함수
	 * 서버에 상태 업데이트 후 쿼리를 무효화하여 최신 데이터로 UI를 갱신.
	 */
	const updateSelectedTaskState = useCallback(() => {
		// 필요한 경우 쿼리 무효화
		queryClient.invalidateQueries({ queryKey: timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }) });
		queryClient.invalidateQueries({ queryKey: timerKeys.timerHeartBeat({ targetDate: todayFormattedDate }) });
	}, [queryClient, todayFormattedDate]);

	return {
		timer,
		isPlaying,
		setIsPlaying,
		elapsedTime: currentElapsedTime,
		totalElapsedTimeOfToday,
		updateElapsedTime: updateSelectedTaskState, // 기존 API 호환성 유지
		selectedTask: {
			id: selectedTaskInfo.id,
			name: selectedTaskInfo.name,
			categoryName: selectedTaskInfo.categoryName,
		},
		updateSelectedTaskState,
	};
}
