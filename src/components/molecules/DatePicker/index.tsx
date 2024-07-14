import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import DateBtn from '@/components/atoms/DateBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import YearMonthTitle from '@/components/atoms/YearMonthTitle';

import { useDatePicker } from '@/hooks/useDatePicker';

import { Direction } from '@/types/global';

import BtnTodayIcon from '@/assets/svgs/btn_today.svg?react';

const DatePicker = () => {
	const { selectedDate, currentDate, weekDates, handleNextWeek, handlePreviousWeek, handleToday, handleDateChange } =
		useDatePicker();

	return (
		<header className="mb-[2.8rem]">
			<div className="flex gap-[2rem]">
				<YearMonthTitle selectedDate={currentDate} />
				<ArrowSVGBtn direction={Direction.DOWN} />
			</div>
			<div className="flex items-center gap-[4.7rem]">
				<nav>
					<ul className="flex">
						{weekDates.map(({ date, day }) => {
							const isSelected = selectedDate.isSame(date, 'day');
							const formattedDate = date.format('DD');

							return (
								<li key={day}>
									<DateBtn
										isSelected={isSelected}
										onClick={() => handleDateChange(date)}
									>{`${formattedDate} ${day}`}</DateBtn>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="flex gap-[1rem]">
					<ArrowSVGBtn direction={Direction.LEFT} onClick={handlePreviousWeek} />
					<SVGBtn onClick={handleToday}>
						<BtnTodayIcon className="rounded-[37px] bg-gray-bg-03 hover:bg-gray-bg-05" />
					</SVGBtn>
					<ArrowSVGBtn direction={Direction.RIGHT} onClick={handleNextWeek} />
				</div>
			</div>
		</header>
	);
};

export default DatePicker;
