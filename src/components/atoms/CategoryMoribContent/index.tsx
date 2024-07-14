import React from 'react';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

interface CategoryMoribContentProps {
	urlInfo: UrlInfo;
	variant: 'basic' | 'smallLeft' | 'smallRight';
	children?: React.ReactNode;
	handleSelectedInfo?: () => void;
	enableHover?: boolean;
}

const CategoryMoribContent = ({
	urlInfo,
	variant,
	children,
	enableHover,
	handleSelectedInfo,
}: CategoryMoribContentProps) => {
	const sizeVariant = {
		basic: {
			width: 'w-[72.8rem]',
			pageWidth: 'w-[22.8rem]',
			urlWidth: 'w-[39.2rem]',
			gap: 'gap-[2rem]',
		},
		smallLeft: {
			width: 'w-[61.4rem]',
			pageWidth: 'w-[18.8rem]',
			urlWidth: 'w-[28.8rem]',
			gap: 'gap-[1.2rem]',
		},
		smallRight: { width: 'w-[53.9rem]', pageWidth: 'w-[18.1rem]', urlWidth: 'w-[21.1rem]', gap: 'gap-[2rem]' },
	};

	const handlekeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			return;
		}
	};

	const tbodyUrlStyle =
		'detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white';

	const hoverStyleInfos = enableHover ? `hover:bg-gray-bg-04` : ``;
	const hoverStyleUrls = enableHover ? `group-hover:bg-gray-bg-06` : ``;

	return (
		<div
			className={`h-[4.6rem] ${sizeVariant[variant].width}`}
			onClick={handleSelectedInfo}
			onKeyDown={handlekeyDown}
			role="button"
			tabIndex={0}
		>
			<div
				className={`group flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 px-[0.8rem] py-[1.2rem] ${hoverStyleInfos} ${sizeVariant[variant].gap}`}
			>
				<div className={`my-[0.1rem] flex h-[2.2rem] items-center`}>
					<img src={urlInfo.favicon} alt="favicon" className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]" />
					<div className={`body-reg-16 my-[0.05rem] truncate text-white ${sizeVariant[variant].pageWidth}`}>
						{urlInfo.domain}
					</div>
				</div>
				<div className={`${tbodyUrlStyle} ${sizeVariant[variant].urlWidth} ${hoverStyleUrls}`}>{urlInfo.url}</div>
				{children}
			</div>
		</div>
	);
};

export default CategoryMoribContent;
