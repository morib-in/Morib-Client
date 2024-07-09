import { DropdownBtnProps } from '@/components/molecules/CategoryDropdown';

import DisabledDropIcon from '@/assets/svgs/disabled_dropdown.svg?react';
import DropIcon from '@/assets/svgs/dropIcon.svg?react';
import UpIcon from '@/assets/svgs/upIcon.svg?react';

const CategoryDropdownBtn = ({ isClicked, handleClicked, disabled, selectedOption }: DropdownBtnProps) => {
	const clickedModalStyle = () => {
		return isClicked ? 'bg-gray-bg-05 text-white' : 'bg-gray-bg-03 text-white';
	};
	const commonBtnStyle = `subhead-med-18 flex h-[4.6rem] w-[27.2rem] items-center justify-between rounded-[5px] px-[1.6rem] py-[1.1rem] mb-[1rem]`;

	const disabledBtnStyle = 'bg-gray-bg-03 text-gray-03';
	const categoryDropdownBtnStyle = disabled
		? `${disabledBtnStyle} ${commonBtnStyle}`
		: `${clickedModalStyle()} ${commonBtnStyle}`;

	return (
		<button type="button" onClick={handleClicked} className={`${categoryDropdownBtnStyle}`} disabled={disabled}>
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
