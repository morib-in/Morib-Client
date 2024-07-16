import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useState } from 'react';

import { getWeekDates } from '@/utils/date';

dayjs.extend(utc);
dayjs.extend(timezone);

export const useDatePicker = (initialDate = dayjs().tz('Asia/Seoul')) => {
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
