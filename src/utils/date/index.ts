import dayjs, { Dayjs } from 'dayjs';

export const getWeekDates = (selectedDate: Dayjs) => {
	const startOfWeek = dayjs(selectedDate).startOf('week').add(1, 'day');
	const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

	const weekDates = Array.from({ length: 7 }, (_, i) => {
		const date = startOfWeek.add(i, 'day');
		return {
			date,
			day: weekDays[i],
		};
	});

	return weekDates;
};
