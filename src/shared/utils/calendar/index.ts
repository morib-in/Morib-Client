import { Dayjs } from 'dayjs';

export const formatDateInfo = (date: Dayjs | null) => {
	if (!date) return { year: '', month: '', day: '' };
	return { year: date.year().toString(), month: (date.month() + 1).toString(), day: date.date().toString() };
};

export const formatFullDateInfo = (date: Dayjs | null) => {
	if (!date) return { year: '', month: '', day: '' };
	const { year, month, day } = formatDateInfo(date);
	return { year, month: month.padStart(2, '0'), day: day.padStart(2, '0') };
};

export const formatCalendarApiDate = (date: Dayjs | null): string => {
	if (!date) return '';
	const { year, month, day } = formatFullDateInfo(date);
	return `${year}-${month}-${day}`;
};
