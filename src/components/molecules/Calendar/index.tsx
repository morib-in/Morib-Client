import { useState } from 'react';
import DatePicker from 'react-datepicker';

import CalendarCustomHeader from '@/components/atoms/CalendarCustomHeader/index';
import CategoryRoutine from '@/components/atoms/CategoryRoutine/index';
import CategoryToggle from '@/components/atoms/CategoryToggle';

import { formatCalendarDate } from '@/shared/utils/calendar/index';

import './tailwind-datepicker.css';

interface CalendarProps {
	onStartDateInput: (date: Date | null) => void;
	onEndDateInput: (date: Date | null) => void;
	selectedStartDate: Date | null;
	selectedEndDate: Date | null;
	isPeriodOn: boolean;
	isCalendarOpened: boolean;
	onPeriodToggle: () => void;
}

const weekDays: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
	onStartDateInput,
	onEndDateInput,
	selectedStartDate,
	selectedEndDate,
	isPeriodOn,
	isCalendarOpened,
	onPeriodToggle,
}: CalendarProps) => {
	const [isRoutineOn, setIsRoutineOn] = useState(false);

	const defaultDate = new Date();

	const defaultToggleStyle = 'flex justify-between px-[1.75rem]';
	const calendarStyle =
		'detail-reg-14  drop-shadow-calendarDrop w-[30.3rem] flex-col gap-[2.1rem] rounded-[8px] bg-gray-bg-02 p-[1.4rem] absolute z-50';
	const inputStyle = 'body-med-16 h-[3.2rem] w-[27.5rem] rounded-[3px] border-[1px] px-[1rem] py-[0.5rem] ';
	const calendarInputStyle =
		'body-med-16 h-[3.2rem] w-[13.2rem] rounded-[3px] border-[1px]  px-[1rem] py-[0.5rem]  bg-gray-bg-02 ';

	const isDateSelected = !!selectedStartDate;
	const isEndDateSelected = !!selectedEndDate;

	const optionalStyle = isPeriodOn
		? selectedStartDate && isDateSelected && !isEndDateSelected
			? 'border-mint-01 bg-date-active text-white'
			: 'border-gray-bg-05 bg-gray-bg-02 text-gray-bg-04'
		: isDateSelected
			? 'border-mint-01 bg-date-active text-white'
			: 'border-gray-bg-05 bg-gray-bg-02 text-gray-bg-04';

	const optionalEndDateStyle =
		isDateSelected && isEndDateSelected
			? 'border-mint-01 bg-date-active text-white'
			: 'border-gray-bg-05 bg-gray-bg-02 text-gray-bg-04';

	const divideLineStyle = 'my-[1.3rem] border-gray-bg-06';

	const toggleTxtStyle = 'detail-reg-12 text-white';

	const formatWeekDay = (date: string): string => {
		const dayOfWeek = new Date(date).getDay();
		return weekDays[dayOfWeek];
	};

	const commonDatePickerProps = {
		renderCustomHeader: (props: any) => <CalendarCustomHeader {...props} />,
		formatWeekDay: formatWeekDay,
		dateFormat: 'yyyy년 M월 dd일',
		inline: true,
		disabledKeyboardNavigation: true,
	};

	const handleDateChange = (date: Date | null) => {
		onStartDateInput(date);
	};

	const handlePeriodChange = (dates: (Date | null)[]) => {
		if (dates && dates.length === 2) {
			onStartDateInput(dates[0]);
			onEndDateInput(dates[1]);
		} else {
			onEndDateInput(null);
		}
	};

	const handleRoutineToggle = () => {
		setIsRoutineOn((prev) => !prev);
	};

	return (
		<>
			{isCalendarOpened && (
				<>
					<div className={`${calendarStyle}`}>
						{!isPeriodOn ? (
							<>
								<input
									type="text"
									value={formatCalendarDate(selectedStartDate) || formatCalendarDate(defaultDate)}
									className={`${inputStyle} ${optionalStyle}`}
									readOnly
								/>
								<DatePicker
									selected={selectedStartDate !== undefined ? selectedStartDate : null}
									onChange={handleDateChange}
									{...commonDatePickerProps}
								/>
							</>
						) : (
							<>
								<div className="flex gap-[11px]">
									<input
										type="text"
										value={formatCalendarDate(selectedStartDate) || formatCalendarDate(defaultDate)}
										className={`${calendarInputStyle} ${optionalStyle}`}
										readOnly
									/>
									<input
										type="text"
										value={formatCalendarDate(selectedEndDate) || ''}
										className={`${calendarInputStyle} ${optionalEndDateStyle}`}
										readOnly
									/>
								</div>
								<DatePicker
									selectsRange
									startDate={selectedStartDate ?? undefined}
									endDate={selectedEndDate ?? undefined}
									onChange={handlePeriodChange}
									{...commonDatePickerProps}
								/>
							</>
						)}

						<hr className={divideLineStyle} />
						<div className={`${defaultToggleStyle}`}>
							<div className={toggleTxtStyle}>종료 날짜</div>
							<CategoryToggle isToggleOn={isPeriodOn} onToggle={onPeriodToggle} />
						</div>
						<hr className={divideLineStyle} />

						<div className="flex-col gap-[1.2rem]">
							<div className={`${defaultToggleStyle}`}>
								<div className={toggleTxtStyle}>루틴 생성</div>
								<CategoryToggle isToggleOn={isRoutineOn} onToggle={handleRoutineToggle} />
							</div>
							{isRoutineOn && <CategoryRoutine />}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Calendar;
