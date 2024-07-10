export const formatTime = (unit: number) => unit.toString().padStart(2, '0');

interface TimeComponents {
	hours: number;
	minutes: number;
	seconds: number;
}

export const convertTime = (time: number): TimeComponents => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;
	return { hours, minutes, seconds };
};
