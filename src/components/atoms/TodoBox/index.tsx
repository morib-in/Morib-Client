import { formatSeconds } from '@/utils/time';

import ButtonCalendarIcon from '@/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/assets/svgs/check_box_blank.svg?react';
import CheckBoxFillIcon from '@/assets/svgs/check_box_fill.svg?react';
import TimeFillIcon from '@/assets/svgs/mingcute_time-fill.svg?react';
import TimeLineIcon from '@/assets/svgs/mingcute_time-line.svg?react';
import MeatBall from '@/assets/svgs/todo_meatball_default.svg?react';

import SVGBtn from '../SVGBtn';

interface TodoBoxProps {
	title: string;
	date: string;
	accumulatedTime: number;
	isCompleted?: boolean;
}

const TodoBox = ({ title, date, accumulatedTime, isCompleted = false }: TodoBoxProps) => {
	const formattedTime = formatSeconds(accumulatedTime);
	const formattedDate = date.replace(/-/g, '.');

	const titleStyle = isCompleted ? 'line-through' : '';
	const CheckBoxIcon = isCompleted ? <CheckBoxFillIcon /> : <CheckBoxBlankIcon />;

	const TimeIcon = accumulatedTime ? <TimeFillIcon /> : <TimeLineIcon />;
	const timeTextClass = accumulatedTime ? 'text-mint-01' : 'text-gray-04';

	//추후 SVG 버튼 컴포넌트로 만들것임
	return (
		<div className="group mt-[1rem] flex h-[9.6rem] w-[36.6rem] transform flex-col justify-center rounded-[8px] bg-gray-bg-01 p-[1.4rem] transition-transform duration-300 hover:-translate-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.6rem]">
					<button>{CheckBoxIcon}</button>
					<h3 className={`body-semibold-16 + mt-[0.42rem] text-white ${titleStyle}`}>{title}</h3>
				</div>
				<SVGBtn>
					<MeatBall className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				</SVGBtn>
			</div>

			<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
				<div className="flex items-center gap-[0.6rem]">
					<ButtonCalendarIcon />
					<p className="detail-reg-12 mt-[0.3rem] text-gray-04">{formattedDate}</p>
				</div>

				<div className="flex items-center gap-[0.6rem]">
					{TimeIcon}
					<p className={`detail-reg-12 mt-[0.3rem] ${timeTextClass}`}>{formattedTime}</p>
				</div>
			</div>
		</div>
	);
};

export default TodoBox;
