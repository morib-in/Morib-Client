import dayjs, { Dayjs } from 'dayjs';

import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import ButtonCalendarAddRoutine from '@/shared/components/ButtonCalendarAddRoutine';
import ButtonStatusToggle from '@/shared/components/ButtonStatusToggle';
import HeaderCalendar from '@/shared/components/HeaderCalendar';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { formatFullDateInfo } from '@/shared/utils/calendar/index';

import { WEEK_DAYS } from '@/shared/constants/weekDays';

import './calendar.css';

const STYLES = {
	calendarContainer:
		'detail-reg-14 drop-shadow-calendarDrop w-[30.3rem] flex-col gap-[2.1rem] rounded-[8px] bg-gray-bg-02 p-[1.4rem] absolute z-50',
	input: 'body-med-16 h-[3.2rem] w-[27.5rem] rounded-[3px] border-[1px] px-[1rem] py-[0.5rem]',
	calendarInput: 'body-med-16 h-[3.2rem] w-[13.2rem] rounded-[3px] border-[1px] px-[1rem] py-[0.5rem] bg-gray-bg-02',
	optionalStyle: 'border-mint-01 bg-date-active text-white',
	optionalStyleInactive: 'border-gray-bg-05 bg-gray-bg-02 text-gray-bg-04',
	divideLine: 'my-[1.3rem] border-gray-bg-06',
	toggleText: 'detail-reg-12 text-white',
	defaultToggle: 'flex justify-between px-[1.75rem]',
	dateRangeContainer: 'flex gap-[11px]',
};

interface CalendarProps {
	onStartDateInput: (date: Dayjs | null) => void;
	onEndDateInput: (date: Dayjs | null) => void;
	selectedStartDate: Dayjs | null;
	selectedEndDate: Dayjs | null;
	isPeriodOn: boolean;
	isCalendarOpened: boolean;
	onPeriodToggle: () => void;
	clickOutSideCallback: () => void;
}

const Calendar = ({
	onStartDateInput,
	onEndDateInput,
	selectedStartDate,
	selectedEndDate,
	isPeriodOn,
	isCalendarOpened,
	onPeriodToggle,
	clickOutSideCallback,
}: CalendarProps) => {
	const [isRoutineOn, setIsRoutineOn] = useState(false);
	const calendarRef = useRef<HTMLDivElement>(null);

	useClickOutside(calendarRef, clickOutSideCallback);

	const startDateInfo = formatFullDateInfo(selectedStartDate);
	const endDateInfo = formatFullDateInfo(selectedEndDate);

	const isStartDateSelected = !!selectedStartDate;
	const isEndDateSelected = !!selectedEndDate;

	const optionalStyle = isStartDateSelected && !isEndDateSelected ? STYLES.optionalStyle : STYLES.optionalStyleInactive;
	const optionalEndDateStyle = isEndDateSelected ? STYLES.optionalStyle : STYLES.optionalStyleInactive;

	const commonDatePickerProps = {
		renderCustomHeader: (props: any) => <HeaderCalendar {...props} />,
		formatWeekDay: (date: string) => WEEK_DAYS[dayjs(date).day()],
		inline: true,
		disabledKeyboardNavigation: true,
	};

	const handleDateChange = (date: Date | null) => {
		if (date) {
			const dayjsDate = dayjs(date);
			onStartDateInput(dayjsDate);
		} else {
			onStartDateInput(null);
		}
	};

	const handlePeriodChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		onStartDateInput(start ? dayjs(start) : null);
		onEndDateInput(end ? dayjs(end) : null);
	};

	const handleRoutineToggle = () => {
		setIsRoutineOn((prev) => !prev);
	};

	return (
		<>
			{isCalendarOpened && (
				<div className={`${STYLES.calendarContainer}`} ref={calendarRef}>
					{!isPeriodOn ? (
						<>
							<input
								type="text"
								value={`${startDateInfo.year}.${startDateInfo.month}.${startDateInfo.day}`}
								className={`${STYLES.input} ${optionalStyle}`}
								readOnly
							/>
							<DatePicker
								selected={selectedStartDate ? selectedStartDate.toDate() : null}
								onChange={handleDateChange}
								{...commonDatePickerProps}
							/>
						</>
					) : (
						<>
							<div className={STYLES.dateRangeContainer}>
								<input
									type="text"
									value={`${startDateInfo.year}.${startDateInfo.month}.${startDateInfo.day}`}
									className={`${STYLES.calendarInput} ${optionalStyle}`}
									readOnly
								/>
								<input
									type="text"
									value={selectedEndDate ? `${endDateInfo.year}.${endDateInfo.month}.${endDateInfo.day}` : ''}
									className={`${STYLES.calendarInput} ${optionalEndDateStyle}`}
									readOnly
								/>
							</div>
							<DatePicker
								selectsRange
								startDate={selectedStartDate ? selectedStartDate.toDate() : undefined}
								endDate={selectedEndDate ? selectedEndDate.toDate() : undefined}
								onChange={handlePeriodChange}
								{...commonDatePickerProps}
							/>
						</>
					)}

					<hr className={STYLES.divideLine} />
					<div className={`${STYLES.defaultToggle}`}>
						<h3 className={STYLES.toggleText}>종료 날짜</h3>
						<ButtonStatusToggle isToggleOn={isPeriodOn} onToggle={onPeriodToggle} />
					</div>

					<hr className={STYLES.divideLine} />
					<div className="flex-col gap-[1.2rem]">
						<div className={`${STYLES.defaultToggle}`}>
							<h3 className={STYLES.toggleText}>루틴 생성</h3>
							<ButtonStatusToggle isToggleOn={isRoutineOn} onToggle={handleRoutineToggle} />
						</div>
						{isRoutineOn && <ButtonCalendarAddRoutine />}
					</div>
				</div>
			)}
		</>
	);
};

export default Calendar;
