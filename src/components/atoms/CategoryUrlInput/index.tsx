import React, { useState } from 'react';

import { isUrlValid } from '@/utils/isUrlValid/index';

import AlertIcon from '@/assets/svgs/ic_description.svg?react';

interface CategoryUrlInputProps {
	variant?: 'basic' | 'small';
	onUrlInputChange: (url: string) => void;
	selectedInfo?: UrlInfo[];
}

const CategoryUrlInput = ({ variant = 'basic', onUrlInputChange }: CategoryUrlInputProps) => {
	const [url, setUrl] = useState('');
	const [isUrlValidated, setIsUrlValidated] = useState<boolean | null>(null);

	const sizeVariantWidth = {
		basic: 'w-[72.8rem]',
		small: 'w-[53.9rem]',
	};

	const defaultStyle = `subhead-med-18 h-[4.6rem] rounded-[8px] border-[1px] bg-gray-bg-02 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none ${sizeVariantWidth[variant]}`;
	const borderStyle = isUrlValidated === false ? 'border-error-02' : 'border-transparent';

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const isValid = isUrlValid(url);
			onUrlInputChange(url);
			setIsUrlValidated(isValid);
			if (isValid) {
				const isExist = selectedInfo!.some((info) => info.url === url);
				if (isExist) {
					setErrorMessage('이미 추가된 주소입니다.');
					setIsUrlValidated(false);
				} else {
					onUrlInputChange(url);
					setUrl('');
					setErrorMessage('알맞은 도메인을 입력해주세요.');
				}
			} else {
				setErrorMessage('알맞은 도메인을 입력해주세요.');
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
		setIsUrlValidated(null);
	};

	return (
		<div className="mt-[0.4rem]">
			<input
				type="text"
				placeholder="웹사이트 주소를 입력해 주세요."
				className={`${defaultStyle} ${borderStyle}`}
				onChange={handleChange}
				value={url}
				onKeyDown={handleKeyDown}
			/>
			<div className={`my-[0.6rem] flex ${isUrlValidated === false ? 'visible' : 'invisible'}`}>
				<AlertIcon />
				<div className="detail-reg-14 ml-[0.5rem] text-error-01">알맞은 도메인을 입력해주세요.</div>
			</div>
		</div>
	);
};

export default CategoryUrlInput;
