export const formatSeconds = (seconds: number) => {
	if (seconds === 0) return '00:00:00';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(secs).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const convertTime = (time: number) => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;
	return { hours, minutes, seconds };
};
