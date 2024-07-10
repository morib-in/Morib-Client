import React, { useState } from 'react';

import AlertIcon from '@/assets/svgs/ic_description.svg?react';

interface CategoryInputNameProps {
	onChange: (name: string) => void;
	isNameValid: boolean;
}
const CategoryInputName = ({ onChange, isNameValid }: CategoryInputNameProps) => {
	const [name, setName] = useState<string>('');

	const defaultStyle =
		'subhead-med-18 h-[4.6rem] w-[34rem] rounded-[8px] border-[1px] bg-gray-bg-02 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const optionalStyle = isNameValid === false ? 'border-error-01' : 'border-transparent';

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value;
		setName(newName);
		onChange(newName);
	};

	return (
		<>
			<input
				type="text"
				placeholder="이름을 10자 이내로 작성해주세요."
				className={`${defaultStyle} + ${optionalStyle}`}
				onChange={handleNameChange}
				value={name}
			/>
			<div className={`flex ${isNameValid === false ? 'visible' : 'invisible'}`}>
				<div className="my-[0.6rem] flex">
					<AlertIcon />
					<div className="detail-reg-14 ml-[0.5rem] text-error-01">이미 존재하는 작업 카테고리입니다.</div>
				</div>
			</div>
		</>
	);
};

export default CategoryInputName;
