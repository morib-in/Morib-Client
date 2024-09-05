import { ButtonHTMLAttributes } from 'react';

import DisabledDropIcon from '@/shared/assets/svgs/disabled_dropdown.svg?react';
import DropIcon from '@/shared/assets/svgs/dropIcon.svg?react';
import UpIcon from '@/shared/assets/svgs/upIcon.svg?react';

interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isClicked: boolean;
	handleClicked: (prev: boolean) => void;
	selectedOption: string;
}

const CategoryDropdownBtn = ({ isClicked, handleClicked, selectedOption, disabled, ...props }: CategoryBtnProps) => {
	const clickedDropdownStyle = isClicked ? 'bg-gray-bg-05 text-white' : 'bg-gray-bg-03 text-white';

	const commonBtnStyle = `subhead-med-18 flex h-[4.6rem] w-[27.2rem] items-center justify-between rounded-[5px] px-[1.6rem] py-[1.1rem] mb-[3.2rem]`;

	const disabledBtnStyle = 'bg-gray-bg-03 text-gray-03';
	const categoryDropdownBtnStyle = disabled
		? `${disabledBtnStyle} ${commonBtnStyle}`
		: `${clickedDropdownStyle} ${commonBtnStyle}`;

	return (
		<button
			type="button"
			onClick={() => handleClicked(isClicked)}
			className={categoryDropdownBtnStyle}
			disabled={disabled}
			{...props}
		>
			<p>{selectedOption}</p>
			{disabled ? (
				<DisabledDropIcon />
			) : isClicked ? (
				<UpIcon width={24} height={24} />
			) : (
				<DropIcon width={24} height={24} />
			)}
		</button>
	);
};

export default CategoryDropdownBtn;
