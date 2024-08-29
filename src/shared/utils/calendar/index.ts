import dayjs, { Dayjs } from 'dayjs';

export const getDateInfo = (date: Dayjs | null): { year: string; month: string; day: string } => {
	if (!date || !(date instanceof dayjs)) return { year: '', month: '', day: '' };
	const year = date.year().toString();
	const month = (date.month() + 1).toString();
	const day = date.date().toString();

	return { year, month, day };
};

export const getFullDateInfo = (date: Dayjs | null): { year: string; month: string; day: string } => {
	if (!date || !(date instanceof dayjs)) return { year: '', month: '', day: '' };
	const year = date.year().toString();
	const month = (date.month() + 1).toString().padStart(2, '0');
	const day = date.date().toString().padStart(2, '0');

	return { year, month, day };
};

export const formatCalendarApiDate = (date: Dayjs | null): string => {
	if (!date || !(date instanceof dayjs)) return '';
	const year = date.year();
	const month = (date.month() + 1).toString().padStart(2, '0');
	const day = date.date().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};
