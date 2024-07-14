import { useState } from 'react';
import DatePicker from 'react-datepicker';

import CalendarCustomHeader from '@/components/atoms/CalendarCustomHeader/index';
import CalendarInput from '@/components/atoms/CalendarInput/index';
import CategoryRoutine from '@/components/atoms/CategoryRoutine/index';
import CategoryToggle from '@/components/atoms/CategoryToggle';

import { formatCalendarDate } from '@/utils/calendar/index';

import './tailwind-datepicker.css';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
	const [selectedStartDate, setSelectedStartDate] = useState<Date>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date>(null);
	const [isDateToggleOn, setIsDateToggleOn] = useState(false);
	const [isPeriodOn, setIsPeriodOn] = useState(false);
	const [isRoutineOn, setIsRoutineOn] = useState(false);
	const [isStartDateChanged, setIsStartDateChanged] = useState(false);

	const defaultDate = new Date();

	const defaultToggleStyle = 'flex justify-between px-[1.75rem]';
	const calendarStyle =
		'detail-reg-14 shadow-[0_3px_30px_0_rgba(0, 0, 0, 0.40)] w-[30.3rem] flex-col gap-[2.1rem] rounded-[8px] bg-gray-bg-02 p-[1.4rem]';
	const inputStyle = 'body-med-16 h-[3.2rem] w-[27.5rem] rounded-[3px] border-[1px] px-[1rem] py-[0.5rem] ';
	const calendarInputStyle = 'body-med-16 h-[3.2rem] w-[13.2rem] rounded-[3px] border-[1px]  px-[1rem] py-[0.5rem] ';

	const isDateSelected = !!selectedStartDate;
	const isEndDateSelected = !!selectedEndDate;

	const optionalStyle = isPeriodOn
		? isStartDateChanged && isDateSelected && !isEndDateSelected
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

	const commonDatePickerProps = {
		renderCustomHeader: (props) => <CalendarCustomHeader {...props} />,
		formatWeekDay: (dayOfWeek) => weekDays[dayOfWeek],
		dateFormat: 'yyyy년 M월 dd일',
		inline: true,
		disabledKeyboardNavigation: true,
	};

	const handleDateChange = (date) => {
		setSelectedStartDate(date);
	};

	const handlePeriodChange = (dates) => {
		const [start, end] = dates;
		setSelectedStartDate(start ?? new Date());
		setSelectedEndDate(end);
		if (start) {
			setIsStartDateChanged(true);
		}
	};

	const handleDateToggle = () => {
		setIsDateToggleOn(!isDateToggleOn);
	};
	const handlePeriodToggle = () => {
		setIsPeriodOn(!isPeriodOn);
	};
	const handleRoutineToggle = () => {
		setIsRoutineOn(!isRoutineOn);
	};

	return (
		<div>
			<div className="flex">
				<div>날짜 </div>
				<CategoryToggle isToggleOn={isDateToggleOn} onToggle={handleDateToggle} />
			</div>
			{isDateToggleOn && (
				<>
					<CalendarInput
						isPeriodOn={isPeriodOn}
						selectedStartDate={selectedStartDate || defaultDate}
						selectedEndDate={selectedEndDate}
					/>
					<div className={`${calendarStyle}`}>
						{!isPeriodOn ? (
							<>
								<input
									type="text"
									value={formatCalendarDate(selectedStartDate) || formatCalendarDate(defaultDate)}
									onChange={(date) => handleDateChange(date)}
									className={`${inputStyle} ${optionalStyle}`}
								/>
								<DatePicker selected={selectedStartDate} onChange={handleDateChange} {...commonDatePickerProps} />
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
									startDate={selectedStartDate}
									endDate={selectedEndDate}
									onChange={handlePeriodChange}
									{...commonDatePickerProps}
								/>
							</>
						)}

						<hr className={divideLineStyle} />
						<div className={`${defaultToggleStyle}`}>
							<div className={toggleTxtStyle}>종료 날짜</div>
							<CategoryToggle isToggleOn={isPeriodOn} onToggle={handlePeriodToggle} />
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
		</div>
	);
};

export default Calendar;
