import dayjs from 'dayjs';

import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import WeekPicker from '@/components/atoms/WeekPicker';
import YearMonthPicker from '@/components/atoms/YearMonthPicker';

import { Direction } from '@/types/global';

import BtnTodayIcon from '@/assets/svgs/btn_today.svg?react';

const DatePicker = () => {
	const currentDate = dayjs();
	const yearMonthData = currentDate.format('YYYY년 MM월');

	return (
		<header>
			<div className="flex gap-[2rem]">
				<YearMonthPicker yearMonthData={yearMonthData} />
				<ArrowSVGBtn direction={Direction.DOWN} />
			</div>
			<div className="flex items-center gap-[4.7rem]">
				<WeekPicker />
				<div className="flex gap-[1rem]">
					<ArrowSVGBtn direction={Direction.LEFT} />
					<SVGBtn>
						<BtnTodayIcon />
					</SVGBtn>
					<ArrowSVGBtn direction={Direction.RIGHT} />
				</div>
			</div>
		</header>
	);
};

export default DatePicker;
