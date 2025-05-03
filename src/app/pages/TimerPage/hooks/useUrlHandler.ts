import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getBaseUrl } from '@/shared/utils/url';

import { timerKeys } from '@/shared/apisV2/timer/timer.keys';
import { usePostTimerPause } from '@/shared/apisV2/timer/timer.mutations';

interface UseUrlHandlerProps {
	isPlaying: boolean;
	selectedTaskId: number | null;
	baseUrls: string[];
	todayFormattedDate: string;
	setIsPlaying: (isPlaying: boolean) => void;
}

/**
 * URL 변경을 감지하여 허용되지 않은 사이트로 이동 시 타이머를 정지하는 훅
 *
 * @param props 타이머 상태와 관련 함수
 */
export function useUrlHandler({
	isPlaying,
	selectedTaskId,
	baseUrls,
	todayFormattedDate,
	setIsPlaying,
}: UseUrlHandlerProps) {
	const queryClient = useQueryClient();
	const { mutate: pauseTimer } = usePostTimerPause();

	// 타이머 정지 함수
	const stopTimer = useCallback(() => {
		if (!selectedTaskId) return;

		pauseTimer(
			{
				taskId: selectedTaskId,
				targetDate: todayFormattedDate,
			},
			{
				onSuccess: () => {
					setIsPlaying(false);
					queryClient.invalidateQueries({ queryKey: timerKeys.timer });
				},
			},
		);
	}, [pauseTimer, todayFormattedDate, setIsPlaying, queryClient, selectedTaskId]);

	// URL 변경 이벤트 처리
	useEffect(() => {
		// URL 변경 메시지 핸들러
		const handleMessage = (event: Event) => {
			const customEvent = event as CustomEvent<{
				action: string;
				url: string;
			}>;

			if (customEvent.detail?.action === 'urlUpdated') {
				const updatedUrl = customEvent.detail.url.trim() + '/';
				const updatedBaseUrl = getBaseUrl(updatedUrl);

				// 허용되지 않은 사이트로 이동했고 타이머가 실행 중이면 정지
				if (isPlaying && selectedTaskId !== null && !baseUrls.includes(updatedBaseUrl)) {
					stopTimer();
				}
			}
		};

		// 이벤트 리스너 등록
		document.addEventListener('FROM_EXTENSION', handleMessage);

		// 정리 함수
		return () => {
			document.removeEventListener('FROM_EXTENSION', handleMessage);
		};
	}, [isPlaying, selectedTaskId, baseUrls, stopTimer]);
}
