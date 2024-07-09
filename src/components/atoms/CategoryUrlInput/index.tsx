import { useState } from 'react';

import { isUrlValid } from '@/utils/isUrlValid/index';

import AlertIcon from '@/assets/svgs/ic_description.svg?react';

interface CategoryUrlInputProps {
	variant?: 'basic' | 'small';
	addUrl: (url: string) => void;
}

const CategoryUrlInput = ({ variant, addUrl }: CategoryUrlInputProps) => {
	const [url, setUrl] = useState('');
	const [isUrl, setIsUrl] = useState<boolean | null>(null);

	const sizeVariantWidth = {
		basic: 'w-[72.8rem]',
		small: 'w-[53.9rem]',
	};

	const defaultStyle =
		'subhead-med-18 h-[4.6rem] rounded-[8px] border-[1px] bg-gray-bg-02 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const borderStyle = isUrl === false ? 'border-error-02' : `border-transparent ${sizeVariantWidth[variant]}`;

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const checkingUrl = isUrlValid(url);
			setIsUrl(checkingUrl);
			if (checkingUrl === true) {
				addUrl(url);
				setUrl('');
			}
		}
	};

	return (
		<>
			<input
				type="text"
				placeholder="웹사이트 주소를 입력해 주세요."
				className={defaultStyle + borderStyle}
				onChange={(e) => setUrl(e.target.value)}
				value={url}
				onKeyDown={(e) => handleKeyDown(e)}
			/>
			<div className={`flex ${isUrl === false ? 'visible' : 'invisible'}`}>
				<div className="my-[0.6rem] flex">
					<AlertIcon />
					<div className="detail-reg-14 ml-[0.5rem] text-error-01">알맞은 도메인을 입력해주세요.</div>
				</div>
			</div>
		</>
	);
};

export default CategoryUrlInput;
