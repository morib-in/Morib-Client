import dayjs, { Dayjs } from 'dayjs';

import React from 'react';

import { getDateInfo } from '@/shared/utils/calendar/index';

import ArrowIcon from '@/shared/assets/svgs/btn_arrow_bgNone.svg?react';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

interface CustomHeaderProps {
	date: Dayjs;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
}

const HeaderCalendar: React.FC<CustomHeaderProps> = ({
	date,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	const { year, month } = getDateInfo(dayjs(date));
	return (
		<div className="mt-[2.1rem] flex flex-col">
			<div className="mb-[1.3rem] flex">
				<p className="body-med-16 ml-[1.5rem] mr-[0.8rem] text-white">
					{year}년 {month}월
				</p>
				<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} aria-label="Previous Month">
					<ArrowIcon />
				</button>
				<button onClick={increaseMonth} disabled={nextMonthButtonDisabled} aria-label="Next Month">
					<ArrowIcon className="rotate-180" />
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
export default HeaderCalendar;
