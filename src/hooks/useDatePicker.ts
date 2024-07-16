import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useState } from 'react';

import { getWeekDates } from '@/utils/date';

dayjs.extend(utc);
dayjs.extend(timezone);

const todayDate = dayjs().tz('Asia/Seoul');

export const useDatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(todayDate);
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

	const handleSelectedDateChange = (date: Dayjs) => {
		setSelectedDate(date);
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
		selectedDate,
		currentDate,
		weekDates,
		dropdownToggle,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleSelectedDateChange,
		handleYearMonthClick,
		handleDropdownToggle,
		handleDropdownClose,
	};
};
