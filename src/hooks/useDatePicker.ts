import dayjs, { Dayjs } from 'dayjs';

import { useState } from 'react';

import { getWeekDates } from '@/utils/date';

export const useDatePicker = (initialDate = dayjs()) => {
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [currentDate, setCurrentDate] = useState(initialDate);

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
		setCurrentDate(initialDate);
	};

	const handleDateChange = (date: Dayjs) => {
		setSelectedDate(date);
	};

	return {
		selectedDate,
		currentDate,
		weekDates,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleDateChange,
	};
};
