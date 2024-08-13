import { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react';

import ButtonCalendarIcon from '@/shared/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/shared/assets/svgs/check_box_blank.svg?react';
import TimeLineIcon from '@/shared/assets/svgs/mingcute_time-line.svg?react';
import MeatBall from '@/shared/assets/svgs/todo_meatball_default.svg?react';

import SVGBtn from '../../../shared/components/ButtonSVG';

interface BoxTodoInputProps {
	editable: boolean;
	onEditComplte: () => void;
	name: string;
	onInputChange: (name: string) => void;
	selectedStartDate: Date | null;
	selectedEndDate: Date | null;
}

const formatDateRange = (startDate: Date | null, endDate: Date | null): string => {
	const format = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}.${month}.${day}`;
	};

	if (startDate === null) {
		return '';
	}

	if (endDate === null) {
		return format(startDate);
	} else {
		return `${format(startDate)}~${format(endDate)}`;
	}
};

const BoxTodoInput = forwardRef<HTMLDivElement, BoxTodoInputProps>(function BoxTodoInput(
	{ editable, onEditComplte, name, onInputChange, selectedStartDate, selectedEndDate },
	ref,
) {
	const [isEditing, setIsEditing] = useState(editable);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange(e.target.value);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setIsEditing(false);
			onEditComplte();
		}
	};

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	return (
		<div
			ref={ref}
			className="group relative mt-[1rem] h-[9.6rem] w-[36.6rem] transform rounded-[8px] bg-gray-bg-01 p-[1.4rem] transition-transform duration-300 hover:-translate-y-2"
		>
			<div className="flex flex-col justify-center">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-[0.6rem]">
						<SVGBtn>
							<CheckBoxBlankIcon />
						</SVGBtn>
						{isEditing ? (
							<input
								className="detail-reg-14 mt-[0.42rem] w-[27.8rem] border-b-[0.1rem] border-b-white bg-transparent text-gray-04 placeholder:text-gray-04 focus:outline-none"
								value={name}
								onChange={handleInputChange}
								onKeyPress={handleKeyPress}
								placeholder="할 일 입력"
							/>
						) : (
							<h3 className="detail-reg-14 mt-[0.42rem] text-gray-04" onDoubleClick={handleDoubleClick}>
								{name}
							</h3>
						)}
					</div>
					<SVGBtn>
						<MeatBall className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</SVGBtn>
				</div>
				<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
					<button className="flex items-center gap-[0.6rem]">
						<ButtonCalendarIcon />
						<p className="detail-reg-12 mt-[0.3rem] text-gray-04">
							{formatDateRange(selectedStartDate, selectedEndDate).length === 0
								? '오늘'
								: formatDateRange(selectedStartDate, selectedEndDate)}
						</p>
					</button>

					<div className="flex items-center gap-[0.6rem]">
						<TimeLineIcon />
						<p className="detail-reg-12 mt-[0.3rem] text-gray-04">00:00:00</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export default BoxTodoInput;
