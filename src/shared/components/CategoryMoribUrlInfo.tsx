import React from 'react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryMoribUrlInfoProps {
	urlInfo: UrlInfo;
	variant: 'basic' | 'smallLeft' | 'smallRight';
	children?: React.ReactNode;
}

const CategoryMoribUrlInfo = ({ urlInfo, variant, children }: CategoryMoribUrlInfoProps) => {
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
		'detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white group-hover:bg-gray-bg-06';

	return (
		<td className="flex items-center">
			<div className={`${tbodyUrlStyle} ${sizeVariant[variant].urlWidth}`}>{urlInfo.url}</div>
			{children}
		</td>
	);
};

export default CategoryMoribUrlInfo;
