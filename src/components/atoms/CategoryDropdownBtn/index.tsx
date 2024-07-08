import { useState } from 'react';

import DropIcon from '@/assets/svgs/dropIcon.svg?react';
import UpIcon from '@/assets/svgs/upIcon.svg?react';

const CategoryDropdownBtn = () => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClicked = () => {
		setIsClicked(!isClicked);
	};

	const clickedModalStyle = () => {
		if (isClicked) {
			return 'bg-gray-bg-05 text-white';
		} else {
			return 'bg-gray-bg-03 text-white';
		}
	};

	return (
		<button
			type="button"
			onClick={handleClicked}
			className={`subhead-med-18 flex h-[4.6rem] w-[27.2rem] items-center justify-between rounded-[5px] px-[1.6rem] py-[1.1rem] ${clickedModalStyle()}`}
		>
			<p>카테고리 선택</p>
			{isClicked ? <UpIcon width={24} height={24} /> : <DropIcon width={24} height={24} />}
		</button>
	);
};

export default CategoryDropdownBtn;
