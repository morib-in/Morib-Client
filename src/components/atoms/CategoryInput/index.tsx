import React, { useState } from 'react';

import ErrorIcon from '@/assets/svgs/description.svg?react';

interface CategoryInputNameProps {
	onNameChange: (name: string) => void;
	isValid?: boolean;
	placeholder: string;
	errorMessage?: string;
	maxLength?: number | undefined;
}

const CategoryInput = ({ onNameChange, isValid, placeholder, errorMessage, maxLength }: CategoryInputNameProps) => {
	const [value, setValue] = useState('');

	const defaultStyle =
		'subhead-med-18 h-[4.6rem] w-[34rem] rounded-[8px] border-[1px] bg-gray-bg-03 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const optionalStyle = isValid === false ? 'border-error-01' : 'border-gray-bg-07';

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onNameChange(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				placeholder={placeholder}
				className={`${defaultStyle} + ${optionalStyle}`}
				onChange={handleValueChange}
				value={value}
				maxLength={maxLength}
			/>
			<div className={`my-[0.4rem] flex gap-[5px] ${isValid === false ? 'visible' : 'invisible'}`}>
				<ErrorIcon />
				<div className="flex items-center gap-[5px]">
					<div className="detail-reg-14 text-error-01">{errorMessage}</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryInput;
