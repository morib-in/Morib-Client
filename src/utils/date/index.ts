import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const getWeekDates = (selectedDate: Dayjs) => {
	const startOfWeek = dayjs(selectedDate).startOf('isoWeek');
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
