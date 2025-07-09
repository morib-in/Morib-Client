import { Dayjs } from 'dayjs';

import { getWeekDates } from '@/shared/utils/date';

interface UseDatePickerProps {
	todayDate: Dayjs;
	selectedDate: Dayjs;
	onSelectedDateChange: (date: Dayjs) => void;
}

export const useDatePicker = ({ todayDate, selectedDate, onSelectedDateChange }: UseDatePickerProps) => {
	const weekDates = getWeekDates(selectedDate);

	const handleNextWeek = () => {
		onSelectedDateChange(selectedDate.add(1, 'week'));
	};

	const handlePreviousWeek = () => {
		onSelectedDateChange(selectedDate.subtract(1, 'week'));
	};

	const handleToday = () => {
		onSelectedDateChange(todayDate);
	};

	const handleYearMonthClick = (yearMonthDate: Dayjs) => {
		if (yearMonthDate.isSame(todayDate, 'month')) {
			onSelectedDateChange(todayDate);
		} else {
			onSelectedDateChange(yearMonthDate);
		}
	};

	return {
		weekDates,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleYearMonthClick,
	};
};
