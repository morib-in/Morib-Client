import React from 'react';

import ErrorIcon from '@/shared/assets/svgs/description.svg?react';

interface InputCategoryMoribNameProps {
	value: string;
	onNameChange: (value: string) => void;
	isValid?: boolean;
	placeholder: string;
	errorMessage?: string;
	maxLength?: number | undefined;
}

const InputCategoryMoribName = ({
	value,
	onNameChange,
	isValid,
	placeholder,
	errorMessage,
	maxLength,
}: InputCategoryMoribNameProps) => {
	const defaultStyle =
		'subhead-med-18 h-[4.6rem] w-[34rem] rounded-[8px] border-[1px] bg-gray-bg-03 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const optionalStyle = isValid === false ? 'border-error-01' : 'border-gray-bg-07';

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onNameChange(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				className={`${defaultStyle} + ${optionalStyle}`}
				onChange={handleValueChange}
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

export default InputCategoryMoribName;
