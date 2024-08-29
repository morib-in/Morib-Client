import dayjs, { Dayjs } from 'dayjs';

import { useState } from 'react';

export const useCalendar = () => {
	const defaultDate = dayjs();

	const [isDateToggleOn, setIsDateToggleOn] = useState(false);
	const [isPeriodOn, setIsPeriodOn] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(defaultDate);
	const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
	const [isCalendarOpened, setIsCalendarOpened] = useState(true);

	const handleDateToggle = () => {
		if (!isDateToggleOn) {
			setIsCalendarOpened(true);
		} else {
			setIsPeriodOn(false);
			setSelectedStartDate(null);
			setSelectedEndDate(null);
		}
		setIsDateToggleOn((prev) => !prev);
	};

	const handlePeriodToggle = () => {
		if (isPeriodOn === true) {
			setSelectedEndDate(null);
		}
		setIsPeriodOn((prev) => !prev);
	};

	const handlePeriodEnd = () => {
		setIsPeriodOn(false);
	};

	const handleCalendarToggle = () => {
		setIsCalendarOpened((prev) => !prev);
	};

	const handleStartDateInput = (date: Dayjs | null) => {
		setSelectedStartDate(date);
	};

	const handleEndDateInput = (date: Dayjs | null) => {
		setSelectedEndDate(date);
	};

	const handleClearDateInfo = () => {
		setSelectedStartDate(null);
		setSelectedEndDate(null);
		setIsDateToggleOn(false);
	};

	return {
		isDateToggleOn,
		isPeriodOn,
		selectedStartDate,
		selectedEndDate,
		isCalendarOpened,
		defaultDate,
		handleDateToggle,
		handlePeriodToggle,
		handleCalendarToggle,
		handleStartDateInput,
		handleEndDateInput,
		handlePeriodEnd,
		handleClearDateInfo,
	};
};
