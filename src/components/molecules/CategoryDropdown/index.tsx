import { ButtonHTMLAttributes, useState } from 'react';

import CategoryDropdownBtn from '@/components/atoms/CategoryDropdownBtn';
import DropdownOptionsBtn from '@/components/atoms/DropdownOptionsBtn';

interface DropdownBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	optionData: OptionData[];
}

interface Category {
	id: number;
	name: string;
}

interface OptionData {
	category: Category;
}

const CategoryDropdown = ({ disabled, optionData }: DropdownBtnProps) => {
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('카테고리 추가');

	const handleOptionClick = (name: string) => {
		setSelectedOption(name);
		setIsClicked(false);
	};
	const handleBtnClicked = () => {
		setIsClicked((prev) => !prev);
	};

	return (
		<>
			<CategoryDropdownBtn
				isClicked={isClicked}
				disabled={disabled}
				handleClicked={handleBtnClicked}
				selectedOption={selectedOption}
			/>
			{isClicked && (
				<ul className="max-h-[41.4rem] w-[27.2rem] flex-col overflow-scroll rounded-[5px] shadow-[0_3px_30px_0_rgba(0,0,0,0.40)]">
					{optionData?.map((item) => {
						return (
							<li key={item.category.id}>
								<DropdownOptionsBtn
									onClick={() => {
										handleOptionClick(item.category.name);
									}}
								>
									{item.category.name}
								</DropdownOptionsBtn>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default CategoryDropdown;
