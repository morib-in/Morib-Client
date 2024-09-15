import React, { useState } from 'react';

import { isUrlValid } from '@/shared/utils/isUrlValid/index';

import ErrorIcon from '@/shared/assets/svgs/description.svg?react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface InputCategoryUrlProps {
	variant?: 'basic' | 'small';
	onUrlInputChange: (url: string) => void;
	currentUrlInfos?: UrlInfo[];
}

const InputCategoryUrl = ({ variant = 'basic', onUrlInputChange, currentUrlInfos }: InputCategoryUrlProps) => {
	const [url, setUrl] = useState('');
	const [isUrlValidated, setIsUrlValidated] = useState<boolean | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const sizeVariantWidth = {
		basic: 'w-[72.8rem]',
		small: 'w-[53.9rem]',
	};

	const defaultStyle = `subhead-med-18 h-[4.6rem] rounded-[8px] border-[1px] bg-gray-bg-02 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none ${sizeVariantWidth[variant]}`;
	const borderStyle = isUrlValidated === false ? 'border-error-02' : 'border-transparent';

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const isValid = isUrlValid(url);
			setIsUrlValidated(isValid);
			if (isValid) {
				const isExist = currentUrlInfos?.some((info) => info.url === url);
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
		const userInput = e.target.value;
		setUrl(userInput);
		setIsUrlValidated(null);
		setErrorMessage('');
	};

	return (
		<div className="mt-[0.4rem]">
			<input
				type="text"
				placeholder="허용할 웹사이트 주소를 입력해 주세요."
				className={`${defaultStyle} ${borderStyle}`}
				onChange={handleChange}
				value={url}
				onKeyDown={handleKeyDown}
			/>
			<div className={`flex h-[3.2rem] ${isUrlValidated === false ? 'visible' : 'invisible'}`}>
				<ErrorIcon />
				<div className="detail-reg-14 ml-[0.5rem] text-error-01">{errorMessage}</div>
			</div>
		</div>
	);
};

export default InputCategoryUrl;
