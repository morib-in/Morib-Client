import { Dayjs } from 'dayjs';

import ButtonDropdownOptions from '@/shared/components/ButtonDropdownOptions';
import Dropdown from '@/shared/components/Dropdown';

import { useDatePicker } from '@/shared/hooks/useDatePicker';

import { getHomeDropdownData } from '@/shared/utils/date';

import { Direction } from '@/shared/types/global';

import ButtonArrowIcon from '@/shared/assets/svgs/btn_arrow.svg?react';
import ButtonTodayIcon from '@/shared/assets/svgs/btn_today.svg?react';

import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import DateBtn from '@/components/atoms/DateBtn';

import ButtonSVG from '../../../shared/components/ButtonSVG';

interface DatePickerProps {
	todayDate: Dayjs;
	selectedDate: Dayjs;
	onSelectedDateChange: (date: Dayjs) => void;
}

const DatePicker = ({ todayDate, selectedDate, onSelectedDateChange }: DatePickerProps) => {
	const { currentDate, weekDates, handleNextWeek, handlePreviousWeek, handleToday, handleYearMonthClick } =
		useDatePicker(todayDate);

	const homeDropdownData = getHomeDropdownData(todayDate);

	const handleClickTodayBtn = () => {
		handleToday();
		onSelectedDateChange(todayDate);
	};

	return (
		<header className="mb-[2.8rem]">
			<section className="relative">
				<Dropdown.Root>
					<Dropdown.Trigger>
						<div className="mb-[0.6rem] flex items-center gap-[2rem]">
							<h1 className="title-bold-32 text-white">{currentDate.format('YYYY년 MM월')}</h1>;
							<ButtonArrowIcon className={'rounded-full bg-gray-bg-03 hover:bg-gray-bg-05'} />
						</div>
					</Dropdown.Trigger>

					<Dropdown.Content maxHeight="max-h-[41.4rem]" boxShadow="shadow-[0_4px_4.8px_0_rgba(0,0,0,0.25)]">
						{homeDropdownData.map((item) => {
							return (
								<li
									key={item.format('YYYY년 MM월')}
									className="flex h-[4.6rem] w-[22.5rem] flex-row items-center justify-center border-none bg-mint-01"
								>
									<ButtonDropdownOptions onClick={() => handleYearMonthClick(item)}>
										{item.format('YYYY년 MM월')}
									</ButtonDropdownOptions>
								</li>
							);
						})}
					</Dropdown.Content>
				</Dropdown.Root>
			</section>

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
										onClick={() => onSelectedDateChange(date)}
									>{`${formattedDate} ${day}`}</DateBtn>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="flex gap-[1rem]">
					<ArrowSVGBtn direction={Direction.LEFT} onClick={handlePreviousWeek} />
					<ButtonSVG onClick={handleClickTodayBtn}>
						<ButtonTodayIcon className="rounded-[37px] bg-gray-bg-03 hover:bg-gray-bg-05" />
					</ButtonSVG>
					<ArrowSVGBtn direction={Direction.RIGHT} onClick={handleNextWeek} />
				</div>
			</div>
		</header>
	);
};

export default DatePicker;
