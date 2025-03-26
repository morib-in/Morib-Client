import { useEffect } from 'react';

import { PostUpdateTimerInfoReq } from '@/shared/types/api/timer';

interface UseUrlHandlerProps {
	isPlaying: boolean;
	selectedTodo: number | null;
	baseUrls: string[];
	stopTimer: (params: PostUpdateTimerInfoReq, options: { onSuccess: () => void }) => void;
	timerIncreasedTime: number;
	setIsPlaying: (isPlaying: boolean) => void;
	getBaseUrl: (url: string) => string;
	formattedTodayDate: string;
}

export const useUrlHandler = ({
	isPlaying,
	selectedTodo,
	baseUrls,
	stopTimer,
	timerIncreasedTime,
	setIsPlaying,
	getBaseUrl,
	formattedTodayDate,
}: UseUrlHandlerProps) => {
	useEffect(() => {
		const handleMessage = (event: any) => {
			if (event.detail.action === 'urlUpdated') {
				const updatedUrl = event.detail.url.trim() + '/';
				const updatedBaseUrl = getBaseUrl(updatedUrl);

				setTimeout(() => {
					if (isPlaying && selectedTodo !== null && !baseUrls.includes(updatedBaseUrl)) {
						stopTimer(
							{
								taskId: selectedTodo,
								elapsedTime: timerIncreasedTime,
								targetDate: formattedTodayDate,
								timerStatus: 'PAUSED',
							},
							{
								onSuccess: () => {
									setIsPlaying(false);
								},
							},
						);
					}
				}, 0);
			}
		};

		document.addEventListener('FROM_EXTENSION', handleMessage);

		return () => {
			document.removeEventListener('FROM_EXTENSION', handleMessage);
		};
	}, [timerIncreasedTime, isPlaying, selectedTodo, stopTimer, baseUrls, getBaseUrl, formattedTodayDate, setIsPlaying]);
};
