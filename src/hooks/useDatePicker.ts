import { Dayjs } from 'dayjs';

import { useState } from 'react';

import { getWeekDates } from '@/utils/date';

export const useDatePicker = (todayDate: Dayjs) => {
	const [currentDate, setCurrentDate] = useState(todayDate);
	const [dropdownToggle, setDropdownToggle] = useState(false);

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

	const handleDropdownToggle = () => {
		setDropdownToggle((prevToggle) => !prevToggle);
	};

	const handleYearMonthClick = (yearMonthDate: Dayjs) => {
		if (yearMonthDate.isSame(todayDate, 'month')) {
			setCurrentDate(todayDate);
		} else {
			setCurrentDate(yearMonthDate);
		}

		handleDropdownToggle();
	};

	const handleDropdownClose = () => {
		setDropdownToggle(false);
	};

	return {
		todayDate,
		currentDate,
		weekDates,
		dropdownToggle,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleYearMonthClick,
		handleDropdownToggle,
		handleDropdownClose,
	};
};
