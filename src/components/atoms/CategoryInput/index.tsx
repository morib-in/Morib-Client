import React, { useState } from 'react';

import AlertIcon from '@/assets/svgs/ic_description.svg?react';

interface CategoryInputNameProps {
	onChange: () => void;
	isValid: boolean;
	placeholder: string;
	errorMessage: string;
}

const CategoryInput = ({ onChange, isValid, placeholder, errorMessage }: CategoryInputNameProps) => {
	const [value, setValue] = useState('');

	const defaultStyle =
		'subhead-med-18 h-[4.6rem] w-[34rem] rounded-[8px] border-[1px] bg-gray-bg-03 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const optionalStyle = isValid === false ? 'border-error-01' : 'border-gray-bg-07';

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				placeholder={placeholder}
				className={`${defaultStyle} + ${optionalStyle}`}
				onChange={handleValueChange}
				value={value}
			/>
			<div className={`flex ${isValid === false ? 'visible' : 'invisible'}`}>
				<div className="mt-[0.5rem] flex items-center gap-[5px]">
					<AlertIcon />
					<div className="detail-reg-14 text-error-01">{errorMessage}</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryInput;
