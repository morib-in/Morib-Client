import { useEffect } from 'react';

interface UseUrlHandlerProps {
	isPlaying: boolean;
	selectedTodo: number | null;
	baseUrls: string[];
	stopTimer: (params: { id: number; elapsedTime: number }, options: { onSuccess: () => void }) => void;
	increasedTime: number;
	setIsPlaying: (isPlaying: boolean) => void;
	getBaseUrl: (url: string) => string;
}

const useUrlHandler = ({
	isPlaying,
	selectedTodo,
	baseUrls,
	stopTimer,
	increasedTime,
	setIsPlaying,
	getBaseUrl,
}: UseUrlHandlerProps) => {
	useEffect(() => {
		const handleMessage = (event: any) => {
			if (event.detail.action === 'urlUpdated') {
				const updatedUrl = event.detail.url.trim();
				const updatedBaseUrl = getBaseUrl(updatedUrl);

				setTimeout(() => {
					if (isPlaying && selectedTodo !== null && !baseUrls.includes(updatedBaseUrl)) {
						stopTimer(
							{ id: selectedTodo, elapsedTime: increasedTime },
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
	}, [increasedTime, isPlaying, selectedTodo, stopTimer, baseUrls, getBaseUrl, setIsPlaying]);
};

export default useUrlHandler;
