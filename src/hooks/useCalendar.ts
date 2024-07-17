import { useState } from 'react';

export const useCalendar = () => {
	const defaultDate = new Date();

	const [isPeriodOn, setIsPeriodOn] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(defaultDate);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
	const [isCalendarOpened, setIsCalendarOpened] = useState(true);

	const handlePeriodToggle = () => {
		if (isPeriodOn === true) {
			setSelectedEndDate(null);
		}
		setIsPeriodOn((prev) => !prev);
	};

	const handleOpenCalendar = () => {
		setIsCalendarOpened(true);
	};

	const handleStartDateInput = (date: Date | null) => {
		setSelectedStartDate(date);
	};

	const handleEndDateInput = (date: Date | null) => {
		setSelectedEndDate(date);
	};

	return {
		isPeriodOn,
		selectedStartDate,
		selectedEndDate,
		isCalendarOpened,
		defaultDate,
		handlePeriodToggle,
		handleOpenCalendar,
		handleStartDateInput,
		handleEndDateInput,
	};
};
