import { ButtonHTMLAttributes, useState } from 'react';

import CategoryDropdownBtn from '@/components/atoms/CategoryDropdownBtn';
import DropdownOptionsBtn from '@/components/atoms/DropdownOptionsBtn';

interface DropdownBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	optionData: Category[];
}

interface Category {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
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
				<ul className="absolute top-[5.6rem] max-h-[41.4rem] w-[27.2rem] flex-col overflow-scroll rounded-[5px] shadow-[0_3px_30px_0_rgba(0,0,0,0.40)]">
					{optionData?.map((item) => {
						return (
							<li
								key={item.id}
								className="subhead-med-18 flex h-[4.6rem] w-[27.2rem] flex-row items-center border-none"
							>
								<DropdownOptionsBtn
									onClick={() => {
										handleOptionClick(item.name);
									}}
								>
									{item.name}
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
