import { Dayjs } from 'dayjs';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import ButtonDropdownOptions from '@/shared/components/ButtonDropdownOptions/ButtonDropdownOptions';
import Dropdown from '@/shared/components/Dropdown/Dropdown';

import { getHomeDropdownData } from '@/shared/utils/date';

import { Direction } from '@/shared/types/global';

import ButtonArrowIcon from '@/shared/assets/svgs/btn_arrow.svg?react';
import ButtonTodayIcon from '@/shared/assets/svgs/btn_today.svg?react';

import DateBtn from './ButtonDate/ButtonDate';
import { useDatePicker } from './hooks/useDatePicker';

interface DatePickerProps {
	todayDate: Dayjs;
	selectedDate: Dayjs;
	onSelectedDateChange: (date: Dayjs) => void;
}

const DatePicker = ({ todayDate, selectedDate, onSelectedDateChange }: DatePickerProps) => {
	const { weekDates, handleNextWeek, handlePreviousWeek, handleToday, handleYearMonthClick } = useDatePicker({
		todayDate,
		selectedDate,
		onSelectedDateChange,
	});

	const homeDropdownData = getHomeDropdownData(todayDate);

	const handleClickTodayBtn = () => {
		handleToday();
	};

	return (
		<header className="mb-[1.6rem] w-full 2xl:mb-[2.8rem]">
			<section className="relative">
				<Dropdown>
					<Dropdown.Trigger>
						<div className="mb-[0.7rem] flex items-center gap-[2rem]">
							<h1 className="text-white head-bold-28 2xl:title-bold-32">{selectedDate.format('YYYY년 MM월')}</h1>
							<ButtonArrowIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
						</div>
					</Dropdown.Trigger>

					<Dropdown.Content
						maxHeight="max-h-[41.4rem]"
						boxShadow="shadow-[0_4px_4.8px_0_rgba(0,0,0,0.25)]"
						className="top-[4.4rem]"
					>
						{homeDropdownData.map((item) => (
							<li
								key={item.format('YYYY년 MM월')}
								className="flex h-[4.6rem] w-[22.5rem] items-center justify-center border-none bg-mint-01"
							>
								<ButtonDropdownOptions onClick={() => handleYearMonthClick(item)}>
									{item.format('YYYY년 MM월')}
								</ButtonDropdownOptions>
							</li>
						))}
					</Dropdown.Content>
				</Dropdown>
			</section>

			<div className="flex items-center justify-center">
				<nav className="w-full">
					<ul className="grid w-full grid-cols-7">
						{weekDates.map(({ date, day }) => {
							const isSelected = selectedDate.isSame(date, 'day');
							const formattedDate = date.format('DD');

							return (
								<li key={day}>
									<DateBtn isSelected={isSelected} onClick={() => onSelectedDateChange(date)}>
										{`${formattedDate} ${day}`}
									</DateBtn>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="ml-[4.7rem] flex gap-[1rem]">
					<ButtonArrowSVG direction={Direction.LEFT} onClick={handlePreviousWeek} />
					<button onClick={handleClickTodayBtn}>
						<ButtonTodayIcon className="rounded-[37px] bg-gray-bg-03 hover:bg-gray-bg-05" />
					</button>
					<ButtonArrowSVG direction={Direction.RIGHT} onClick={handleNextWeek} />
				</div>
			</div>
		</header>
	);
};

export default DatePicker;
