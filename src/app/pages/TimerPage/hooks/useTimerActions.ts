import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { timerKeys } from '@/shared/apisV2/timer/timer.keys';
import { usePostSelectTimerTask, usePostTimerPause, usePostTimerRun } from '@/shared/apisV2/timer/timer.mutations';

/**
 * 타이머 관련 액션들을 관리하는 훅
 *
 * 타이머 시작/정지, 작업 선택 등의 액션을 제공.
 *
 * @param todayFormattedDate 포맷된 오늘 날짜
 * @param timerState 타이머 상태 객체
 * @returns 타이머 액션 함수들
 */
export function useTimerActions(
	todayFormattedDate: string,
	timerState: {
		selectedTask: { id: number | null };
		isPlaying: boolean;
		setIsPlaying: (isPlaying: boolean) => void;
		updateSelectedTaskState: (id: number, time: number, name: string, categoryName: string) => void;
	},
) {
	const queryClient = useQueryClient();
	const { selectedTask, isPlaying, setIsPlaying, updateSelectedTaskState } = timerState;

	// API Mutations
	const { mutateAsync: runTimer } = usePostTimerRun();
	const { mutateAsync: pauseTimer } = usePostTimerPause();
	const { mutateAsync: selectTimerTask } = usePostSelectTimerTask();

	/**
	 * 특정 타이머 쿼리만 무효화 - 성능 최적화
	 */
	const invalidateSelectedTimerQuery = useCallback(async () => {
		await queryClient.invalidateQueries({
			queryKey: timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }),
		});
	}, [queryClient, todayFormattedDate]);

	/**
	 * 타이머 정지/실행 관련 쿼리 무효화
	 */
	const invalidateTimerStatusQueries = useCallback(async () => {
		const queries = [
			timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }),
			timerKeys.timerHeartBeat({ targetDate: todayFormattedDate }),
		];

		await Promise.all(queries.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
	}, [queryClient, todayFormattedDate]);

	/**
	 * 모든 타이머 관련 쿼리 무효화 - 필요한 경우에만 사용
	 */
	const invalidateAllTimerQueries = useCallback(async () => {
		const queries = [
			timerKeys.selectedTimerTask({ targetDate: todayFormattedDate }),
			timerKeys.timerHeartBeat({ targetDate: todayFormattedDate }),
			timerKeys.timer,
			timerKeys.todos({ targetDate: todayFormattedDate }),
		];

		await Promise.all(queries.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
	}, [queryClient, todayFormattedDate]);

	/**
	 * 현재 실행 중인 타이머 정지
	 * Promise를 반환하여 순서 보장
	 */
	const stopCurrentTimer = useCallback(
		async (taskId: number) => {
			if (!taskId) return false;

			try {
				await pauseTimer({
					taskId,
					targetDate: todayFormattedDate,
				});

				setIsPlaying(false);
				// 타이머 정지 시 상태 관련 쿼리만 무효화
				await invalidateTimerStatusQueries();
				return true;
			} catch (error) {
				console.error('타이머 정지 중 오류 발생:', error);
				return false;
			}
		},
		[pauseTimer, todayFormattedDate, setIsPlaying, invalidateTimerStatusQueries],
	);

	/**
	 * 타이머 토글 함수
	 */
	const togglePlay = useCallback(
		async (shouldPlay: boolean) => {
			if (!selectedTask.id) return;

			try {
				if (shouldPlay) {
					await runTimer({
						taskId: selectedTask.id,
						targetDate: todayFormattedDate,
					});
					setIsPlaying(true);
				} else {
					await pauseTimer({
						taskId: selectedTask.id,
						targetDate: todayFormattedDate,
					});
					setIsPlaying(false);
				}

				// 타이머 상태 변경 시 필요한 쿼리만 무효화
				await invalidateTimerStatusQueries();
			} catch (error) {
				console.error('타이머 토글 중 오류 발생:', error);
			}
		},
		[selectedTask.id, runTimer, pauseTimer, todayFormattedDate, setIsPlaying, invalidateTimerStatusQueries],
	);

	/**
	 * 타이머 작업 선택 함수
	 * 현재 실행 중인 경우에만 pause하고, 순서를 보장.
	 * API 요청 최적화: 꼭 필요한 쿼리만 무효화
	 */
	const selectTask = useCallback(
		async (id: number, time: number, name: string, categoryName: string) => {
			// 이미 선택된 작업을 다시 선택한 경우 무시
			if (selectedTask.id === id) return;

			try {
				// 1. 현재 타이머가 실행 중인 경우에만 정지
				if (isPlaying && selectedTask.id !== null) {
					await stopCurrentTimer(selectedTask.id);
				}

				// 2. 새 작업 선택 API 호출
				await selectTimerTask({
					taskId: id,
					targetDate: todayFormattedDate,
				});

				// 3. 로컬 상태 업데이트 (간단하게 시간만 갱신, 나머지는 서버 응답에 따라 업데이트)
				updateSelectedTaskState(id, time, name, categoryName);

				// 4. 꼭 필요한 쿼리만 무효화 - 선택된 타이머 정보만 갱신
				await invalidateSelectedTimerQuery();
			} catch (error) {
				console.error('작업 선택 중 오류 발생:', error);
			}
		},
		[
			selectedTask.id,
			isPlaying,
			selectTimerTask,
			todayFormattedDate,
			stopCurrentTimer,
			updateSelectedTaskState,
			invalidateSelectedTimerQuery,
		],
	);

	return {
		togglePlay,
		selectTask,
		stopCurrentTimer,
		invalidateAllTimerQueries, // 전체 무효화가 필요한 경우를 위해 노출
	};
}
