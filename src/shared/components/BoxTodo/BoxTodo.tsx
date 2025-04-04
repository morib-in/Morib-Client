import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import { formatSeconds } from '@/shared/utils/time';

import type { TaskType } from '@/shared/types/tasks';

import ButtonCalendarIcon from '@/shared/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/shared/assets/svgs/check_box_blank.svg?react';
import CheckBoxFillIcon from '@/shared/assets/svgs/check_box_fill.svg?react';
import MeatballIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import TimeFillIcon from '@/shared/assets/svgs/mingcute_time-fill.svg?react';
import TimeLineIcon from '@/shared/assets/svgs/mingcute_time-line.svg?react';
import NumberIcon from '@/shared/assets/svgs/selected_number_icon.svg?react';

import { useDeleteTask } from '@/shared/apisV2/home/home.mutations';

import Dropdown from '../Dropdown/Dropdown';

interface BoxTodoProps {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	elapsedTime: number;
	isComplete?: boolean;
	isSelected?: boolean;
	selectedNumber?: number;
	onClick?: () => void;
	onToggleComplete?: () => void;
	updateTodayTodos?: (todo: Omit<TaskType, 'isComplete'>) => void;
	clickable?: boolean;
	addingComplete?: boolean;
	timerIncreasedTime?: number;
	handleCalendarToggle?: () => void;
	onPatchTask?: (taskId: number, name: string, startDate: string, endDate: string | null) => void;
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
	elapsedTime,
	addingComplete,
	timerIncreasedTime,
	handleCalendarToggle,
	onPatchTask,
}: BoxTodoProps) => {
	const { mutate: deleteTask } = useDeleteTask();

	const formattedTime = formatSeconds(timerIncreasedTime ? elapsedTime + timerIncreasedTime : elapsedTime);
	const formattedstartDate = startDate.replace(/-/g, '.');
	const formattedendDate = endDate ? endDate.replace(/-/g, '.') : '';

	const nameStyle = isComplete ? 'line-through' : '';
	const CheckBoxIcon = isComplete ? <CheckBoxFillIcon /> : <CheckBoxBlankIcon />;
	const TimeIcon = elapsedTime ? <TimeFillIcon /> : <TimeLineIcon />;
	const timeTextClass = elapsedTime ? 'text-mint-01' : 'text-gray-04';

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
		if (clickable && updateTodayTodos) updateTodayTodos({ id, name, startDate, endDate, elapsedTime });
		else if (onClick) onClick();
	};

	const disableBtnStyle = clickable !== addingComplete ? 'pointer-events-none' : '';

	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(name);

	const handleNameClick = (e: MouseEvent<HTMLHeadingElement>) => {
		e.stopPropagation();
		setIsEditing(true);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEditedName(e.target.value);
	};

	const finishEditing = () => {
		if (editedName.trim() && editedName !== name && onPatchTask) {
			onPatchTask(id, editedName, startDate, endDate);
		}
		setIsEditing(false);
	};

	const handleNameBlur = () => {
		finishEditing();
	};

	const handleNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			finishEditing();
		}
	};

	return (
		<div
			className={`group relative mt-[1rem] h-[9.5rem] w-[28rem] transform rounded-[8px] bg-gray-bg-01 p-[1.4rem] transition-transform duration-300 hover:-translate-y-2 ${selectedStyle} ${clickStyle} `}
			onClick={handleClickTodo}
		>
			<div className="flex flex-col justify-center">
				<div className="flex items-center justify-between">
					<div className="flex w-[22.2rem] items-center gap-[0.6rem]">
						<button onClick={onToggleComplete} className={disableBtnStyle}>
							{CheckBoxIcon}
						</button>
						{isEditing ? (
							<input
								className="mt-[0.42rem] w-[27.8rem] border-b-[0.1rem] border-b-white bg-transparent text-gray-04 detail-reg-14 placeholder:text-gray-04 focus:outline-none"
								value={editedName}
								onChange={handleNameChange}
								onBlur={handleNameBlur}
								onKeyDown={handleNameKeyDown}
								autoFocus
							/>
						) : (
							<h3
								className={`mt-[0.42rem] text-white body-semibold-16 ${nameStyle} truncate`}
								onClick={handleNameClick}
							>
								{name}
							</h3>
						)}
					</div>
					{!addingComplete && !isSelected && (
						<Dropdown>
							<Dropdown.Trigger>
								<MeatballIcon className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</Dropdown.Trigger>
							<Dropdown.Content className="right-0 top-[2.4rem] w-[12.4rem]">
								<Dropdown.Item
									label="삭제"
									textColor="red"
									onClick={(e) => {
										e.stopPropagation();
										deleteTask({ taskId: id });
									}}
								/>
							</Dropdown.Content>
						</Dropdown>
					)}
				</div>
				<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
					<button
						className={`flex items-center gap-[0.6rem] ${!addingComplete ? 'pointer-events-none' : ''}`}
						onClick={handleCalendarToggle}
					>
						<ButtonCalendarIcon />
						<p className="mt-[0.3rem] text-gray-04 detail-reg-12">{duration}</p>
					</button>
					<div className="flex items-center gap-[0.6rem]">
						{TimeIcon}
						<p className={`mt-[0.3rem] detail-reg-12 ${timeTextClass}`}>{formattedTime}</p>
					</div>
				</div>
				{isSelected && selectedNumber && (
					<div className="absolute bottom-[1.1rem] right-[1.7rem]">
						<div className="relative h-[2.2rem] w-[2.2rem]">
							<NumberIcon className="absolute inset-0" />
							<p className="absolute inset-0 mt-[0.15rem] text-center body-reg-16">{selectedNumber}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoxTodo;
