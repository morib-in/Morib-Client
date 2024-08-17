import { useState } from 'react';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const ButtonCalendarAddRoutine = () => {
	const defaultStyle =
		'flex rounded-[5px] detail_reg_12 items-center text-center justify-center text-white hover:bg-gray-bg-06 flex h-[3.1rem] w-[2.6rem] bg-gray-07 px-[1rem] py-[0.5rem]';
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	const toggleDaySelection = (day: string) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter((selected) => selected !== day));
		} else {
			setSelectedDays([...selectedDays, day]);
		}
	};

	return (
		<div className="mx-[1.75rem] mt-[1.2rem] flex w-[24rem] items-start justify-between">
			{daysOfWeek.map((day) => (
				<button
					key={day}
					className={`${defaultStyle} ${selectedDays.includes(day) ? 'bg-gray-bg-05' : 'bg-gray-bg-07'}`}
					onClick={() => toggleDaySelection(day)}
				>
					{day}
				</button>
			))}
		</div>
	);
};

export default ButtonCalendarAddRoutine;
