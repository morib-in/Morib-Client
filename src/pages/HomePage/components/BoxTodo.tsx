import { formatSeconds } from '@/shared/utils/time';

import { Task } from '@/shared/types/home';

import ButtonCalendarIcon from '@/shared/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/shared/assets/svgs/check_box_blank.svg?react';
import CheckBoxFillIcon from '@/shared/assets/svgs/check_box_fill.svg?react';
import TimeFillIcon from '@/shared/assets/svgs/mingcute_time-fill.svg?react';
import TimeLineIcon from '@/shared/assets/svgs/mingcute_time-line.svg?react';
import NumberIcon from '@/shared/assets/svgs/selected_number_icon.svg?react';
import MeatBall from '@/shared/assets/svgs/todo_meatball_default.svg?react';

import SVGBtn from '../../../shared/components/ButtonSVG';

interface BoxTodoProps {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete?: boolean;
	isSelected?: boolean;
	selectedNumber?: number;
	onClick?: () => void;
	onToggleComplete?: () => void;
	updateTodayTodos?: (todo: Omit<Task, 'isComplete'>) => void;
	clickable?: boolean;
	addingComplete?: boolean;
	timerIncreasedTime?: number;
}
const BoxTodo = ({
	id,
	name,
	startDate,
	endDate,
	isComplete,
	isSelected,
	selectedNumber,
	onClick,
	onToggleComplete,
	updateTodayTodos,
	clickable,
	targetTime,
	addingComplete,
	timerIncreasedTime,
}: BoxTodoProps) => {
	const formattedTime = formatSeconds(timerIncreasedTime ? targetTime + timerIncreasedTime : targetTime);
	const formattedstartDate = startDate.replace(/-/g, '.');
	const formattedendDate = endDate ? endDate.replace(/-/g, '.') : '';

	const nameStyle = isComplete ? 'line-through' : '';
	const CheckBoxIcon = isComplete ? <CheckBoxFillIcon /> : <CheckBoxBlankIcon />;

	const TimeIcon = targetTime ? <TimeFillIcon /> : <TimeLineIcon />;
	const timeTextClass = targetTime ? 'text-mint-01' : 'text-gray-04';

	const selectedStyle =
		isSelected && !addingComplete
			? ' border-[0.2rem] border-mint-01 bg-gray-bg-01'
			: addingComplete !== clickable
				? ' bg-gray-bg-02'
				: ' bg-gray-bg-01';

	const duration = formattedendDate ? `${formattedstartDate}~${formattedendDate}` : formattedstartDate;

	const clickStyle = clickable && !addingComplete ? 'cursor-pointer' : 'cursor-default';

	const handleClickTodo = () => {
		if (addingComplete) return;

		if (clickable && updateTodayTodos) updateTodayTodos({ id, name, startDate, endDate, targetTime });
		else if (onClick) {
			onClick();
		}
	};

	const disableBtnStyle = clickable !== addingComplete ? 'pointer-events-none' : '';

	return (
		<div
			className={`group relative mt-[1rem] h-[9.6rem] w-[36.6rem] transform rounded-[8px] bg-gray-bg-01 p-[1.4rem] transition-transform duration-300 hover:-translate-y-2 ${selectedStyle} ${clickStyle} `}
			onClick={handleClickTodo}
		>
			<div className="flex flex-col justify-center">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-[0.6rem]">
						<SVGBtn onClick={onToggleComplete} className={disableBtnStyle}>
							{CheckBoxIcon}
						</SVGBtn>
						<h3 className={`body-semibold-16 + mt-[0.42rem] text-white ${nameStyle}`}>{name}</h3>
					</div>
					<SVGBtn>
						<MeatBall className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</SVGBtn>
				</div>
				<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
					<button className="flex items-center gap-[0.6rem]">
						<ButtonCalendarIcon />
						<p className="detail-reg-12 mt-[0.3rem] text-gray-04">{duration}</p>
					</button>

					<div className="flex items-center gap-[0.6rem]">
						{TimeIcon}
						<p className={`detail-reg-12 mt-[0.3rem] ${timeTextClass}`}>{formattedTime}</p>
					</div>
				</div>
				{isSelected && selectedNumber && (
					<div className="absolute bottom-[1.1rem] right-[1.7rem]">
						<div className="relative h-[2.2rem] w-[2.2rem]">
							<NumberIcon className="absolute inset-0" />
							<p className="body-reg-16 absolute inset-0 mt-[0.15rem] text-center">{selectedNumber}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoxTodo;
