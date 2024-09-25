import { ButtonHTMLAttributes, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import ButtonCategoryDropdown from '@/shared/components/ButtonCategoryDropdown';
import ButtonDropdownOptions from '@/shared/components/ButtonDropdownOptions';

import useClickOutside from '@/shared/hooks/useClickOutside';

interface DropdownBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	optionData: Category[];
	handleOptionId: (id: number) => void;
	handleClickButton: (is: boolean) => void;
	handleSelectOption: (name: string) => void;
	isClicked: boolean;
	selectedOption: string;
}

interface Category {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
}

const DropdownCategory = ({
	disabled,
	handleOptionId,
	optionData,
	handleClickButton,
	handleSelectOption,
	isClicked,
	selectedOption,
}: DropdownBtnProps) => {
	const queryClient = useQueryClient();

	const handleOptionClick = (name: string) => {
		handleSelectOption(name);
		handleClickButton(false);
	};

	const handleBtnClicked = (prev: boolean) => {
		queryClient.invalidateQueries({ queryKey: ['categories'] });

		handleClickButton(!prev);
	};
	const dropdownRef = useRef<HTMLUListElement>(null);
	useClickOutside(dropdownRef, () => handleClickButton(false), isClicked);

	return (
		<>
			<ButtonCategoryDropdown
				isClicked={isClicked}
				disabled={disabled}
				handleClicked={handleBtnClicked}
				selectedOption={selectedOption}
			/>
			{isClicked && (
				<ul
					ref={dropdownRef}
					className="absolute top-[5.6rem] max-h-[41.4rem] w-[27.2rem] flex-col overflow-scroll rounded-[5px] shadow-[0_3px_30px_0_rgba(0,0,0,0.40)]"
				>
					{optionData?.map((item) => {
						return (
							<li
								key={item.id}
								className="subhead-med-18 flex h-[4.6rem] w-[27.2rem] flex-row items-center border-none"
							>
								<ButtonDropdownOptions
									onClick={() => {
										handleOptionClick(item.name);
										handleOptionId(item.id);
									}}
								>
									{item.name}
								</ButtonDropdownOptions>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default DropdownCategory;
