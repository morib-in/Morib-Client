export const getDateInfo = (date: Date | null): { year: string; month: string; day: string } => {
	if (!date) return { year: '', month: '', day: '' };
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString();
	const day = date.getDate().toString();

	return { year, month, day };
};

export const getFullDateInfo = (date: Date | null): { year: string; month: string; day: string } => {
	if (!date) return { year: '', month: '', day: '' };
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return { year, month, day };
};

export const formatCalendarApiDate = (date: Date | null): string => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};
