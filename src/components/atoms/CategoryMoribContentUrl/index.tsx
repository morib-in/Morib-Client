import React from 'react';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

interface CategoryMoribContentProps {
	urlInfo: UrlInfo;
	variant?: 'basic' | 'smallLeft' | 'smallRight';
	children?: React.ReactNode;
}

const CategoryMoribContentUrl = ({ urlInfo, variant, children }: CategoryMoribContentProps) => {
	const sizeVariant = {
		basic: {
			urlWidth: 'w-[39.2rem]',
		},
		smallLeft: {
			urlWidth: 'w-[28.8rem]',
		},
		smallRight: { urlWidth: 'w-[21.1rem]' },
	};

	const tbodyUrlStyle =
		'detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white';

	return (
		<td className="flex items-center">
			<div className={`${tbodyUrlStyle} ${sizeVariant[variant].urlWidth}`}>{urlInfo.url}</div>
		</td>
	);
};

export default CategoryMoribContentUrl;
