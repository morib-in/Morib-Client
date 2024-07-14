import React from 'react';

import { formatCalendarTitle } from '@/utils/calendar/index';

import ArrownIcon from '@/assets/svgs/btn_arrow_bgNone.svg?react';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

interface CustomHeaderProps {
	date: Date;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
}
const CalendarCustomHeader: React.FC<CustomHeaderProps> = ({
	date,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	return (
		<div className="mt-[2.1rem] flex flex-col">
			<div className="mb-[1.3rem] flex">
				<p className="body-med-16 ml-[1.5rem] mr-[0.8rem] text-white">{formatCalendarTitle(date)}</p>
				<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} aria-label="Previous Month">
					<ArrownIcon />
				</button>
				<button onClick={increaseMonth} disabled={nextMonthButtonDisabled} aria-label="Next Month">
					<ArrownIcon className="rotate-180" />
				</button>
			</div>
			<div className="p-[1rem]">
				<div className="detail-reg-12 mx-[1rem] flex justify-between text-gray-03">
					{weekDays.map((day) => (
						<span key={day}>{day}</span>
					))}
				</div>
			</div>
		</div>
	);
};
export default CalendarCustomHeader;
