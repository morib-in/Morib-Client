import { ButtonHTMLAttributes, useState } from 'react';

import CategoryDropdownBtn from '@/components/atoms/CategoryDropdownBtn';
import DropdownOptionsList from '@/components/molecules/DropdownOptionsList';

import { CATEGORY_API } from '@/mocks/categoryData';

export interface DropdownBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isClicked?: boolean;
	handleClicked?: () => void;
}

const CategoryDropdown = ({ disabled }: DropdownBtnProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClicked = () => {
		setIsClicked(!isClicked);
	};

	return (
		<>
			<CategoryDropdownBtn isClicked={isClicked} handleClicked={handleClicked} disabled={disabled} />
			{isClicked ? <DropdownOptionsList optionData={CATEGORY_API} /> : ''}
		</>
	);
};

export default CategoryDropdown;
