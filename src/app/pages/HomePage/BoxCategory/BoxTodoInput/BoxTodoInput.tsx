import { Dayjs } from 'dayjs';

import { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react';

import ButtonCalendarIcon from '@/shared/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/shared/assets/svgs/check_box_blank.svg?react';
import TimeLineIcon from '@/shared/assets/svgs/mingcute_time-line.svg?react';

interface BoxTodoInputProps {
	editable: boolean;
	onEditComplete: () => void;
	name: string;
	onInputChange: (name: string) => void;
	selectedStartDate: Dayjs | null;
	selectedEndDate: Dayjs | null;
}

const formatDateRange = (startDate: Dayjs | null, endDate: Dayjs | null): string => {
	const format = (date: Dayjs) => {
		const year = date.year();
		const month = String(date.month() + 1).padStart(2, '0');
		const day = String(date.date()).padStart(2, '0');
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
	{ editable, onEditComplete, name, onInputChange, selectedStartDate, selectedEndDate },
	ref,
) {
	const [isEditing, setIsEditing] = useState(editable);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange(e.target.value);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setIsEditing(false);
			onEditComplete();
		}
	};

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	return (
		<div
			ref={ref}
			className="group relative mt-[1rem] h-[9.6rem] w-[28rem] transform rounded-[8px] bg-gray-bg-01 p-[1.4rem] transition-transform duration-300 hover:-translate-y-2"
		>
			<div className="b flex flex-col justify-center">
				<div className="flex w-full items-center justify-between">
					<div className="flex w-full items-center gap-[0.6rem]">
						<button>
							<CheckBoxBlankIcon />
						</button>
						{isEditing ? (
							<input
								className="mt-[0.42rem] w-[27.8rem] border-b-[0.1rem] border-b-white bg-transparent text-gray-04 detail-reg-14 placeholder:text-gray-04 focus:outline-none"
								value={name}
								onChange={handleInputChange}
								onKeyPress={handleKeyPress}
								placeholder="할 일 입력"
								autoFocus
							/>
						) : (
							<h3 className="mt-[0.42rem] text-gray-04 detail-reg-14" onDoubleClick={handleDoubleClick}>
								{name}
							</h3>
						)}
					</div>
				</div>
				<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
					<button className="flex items-center gap-[0.6rem]">
						<ButtonCalendarIcon />
						<p className="mt-[0.3rem] text-gray-04 detail-reg-12">
							{formatDateRange(selectedStartDate, selectedEndDate).length === 0
								? '오늘'
								: formatDateRange(selectedStartDate, selectedEndDate)}
						</p>
					</button>

					<div className="flex items-center gap-[0.6rem]">
						<TimeLineIcon />
						<p className="mt-[0.3rem] text-gray-04 detail-reg-12">00:00:00</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export default BoxTodoInput;
