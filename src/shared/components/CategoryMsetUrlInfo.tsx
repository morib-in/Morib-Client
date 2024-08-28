import React from 'react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryMoribPageInfoProps {
	urlInfo: UrlInfo;
	variant: 'basic' | 'smallLeft' | 'smallRight';
	children?: React.ReactNode;
}

const CategoryMoribPageInfo = ({ urlInfo, variant, children }: CategoryMoribPageInfoProps) => {
	const sizeVariant = {
		basic: {
			pageWidth: 'w-[22.8rem]',
			urlWidth: 'w-[39.2rem]',
		},
		smallLeft: {
			pageWidth: 'w-[18.8rem]',
			urlWidth: 'w-[28.8rem]',
		},
		smallRight: { pageWidth: 'w-[18.1rem]', urlWidth: 'w-[21.1rem]' },
	};
	const tbodyUrlStyle =
		'detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white group-hover:bg-gray-bg-06';

	return (
		<>
			<div className="flex items-center">
				<div className={`my-[0.1rem] flex h-[2.2rem] items-center`}>
					<img src={urlInfo.favicon} alt="favicon" className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]" />
					<p className={`body-reg-16 my-[0.05rem] truncate text-white ${sizeVariant[variant].pageWidth}`}>
						{urlInfo.domain}
					</p>
				</div>
			</div>
			<div className="flex items-center">
				<p className={`${tbodyUrlStyle} ${sizeVariant[variant].urlWidth}`}>{urlInfo.url}</p>
				{children}
			</div>
		</>
	);
};

export default CategoryMoribPageInfo;
