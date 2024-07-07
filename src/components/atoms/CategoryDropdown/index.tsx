import { useState } from 'react';

import DropIcon from '@/assets/svgs/dropIcon.svg?react';
import UpIcon from '@/assets/svgs/upIcon.svg?react';

import { CATEGORY_API } from '@/mocks/categoryData';

const CategoryDropdown = () => {
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelected] = useState('');
	const handleClicked = () => {
		setIsClicked(!isClicked);
	};

	const clickedModalStyle = () => {
		if (isClicked) {
			return 'bg-gray-bg-05 text-white';
		} else {
			return 'bg-gray-bg-04 text-gray-03';
		}
	};

	return (
		<div className="">
			<button
				type="button"
				onClick={handleClicked}
				className={`subhead-semibold-20 flex items-center rounded-[8px] px-[1.6rem] py-[1.1rem] ${clickedModalStyle()}`}
			>
				<p className="mr-[1rem]">카테고리 선택</p>
				{isClicked ? <UpIcon /> : <DropIcon />}
			</button>
		</div>
	);
};

export default CategoryDropdown;
