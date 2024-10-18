import { Dayjs } from 'dayjs';

import { useState } from 'react';

import { getWeekDates } from '@/shared/utils/date';

export const useDatePicker = (todayDate: Dayjs) => {
	const [currentDate, setCurrentDate] = useState(todayDate);

	const weekDates = getWeekDates(currentDate);

	const handleNextWeek = () => {
		const nextWeek = currentDate.add(1, 'week');
		setCurrentDate(nextWeek);
	};

	const handlePreviousWeek = () => {
		const previousWeek = currentDate.subtract(1, 'week');
		setCurrentDate(previousWeek);
	};

	const handleToday = () => {
		setCurrentDate(todayDate);
	};

	const handleYearMonthClick = (yearMonthDate: Dayjs) => {
		if (yearMonthDate.isSame(todayDate, 'month')) {
			setCurrentDate(todayDate);
		} else {
			setCurrentDate(yearMonthDate);
		}
	};

	return {
		todayDate,
		currentDate,
		weekDates,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleYearMonthClick,
	};
};
