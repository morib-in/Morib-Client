import React from 'react';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

interface CategoryMoribContentProps {
	variant?: 'basic' | 'smallLeft' | 'smallRight';
	urlInfos: UrlInfo[];
	children?: React.ReactNode;
}

const CategoryMoribContentSet = ({ variant, urlInfos, children }: CategoryMoribContentProps) => {
	const sizeVariant = {
		basic: {
			width: 'w-[72.8rem]',
			pageHeadWidth: 'w-[28.8rem]',
			urlHeadWidth: 'w-[38rem]',
			contentWidth: 'w-[68.8rem]',
			bgColor: ' bg-gray-bg-02',
		},
		smallLeft: {
			width: 'w-[61.4rem]',
			pageHeadWidth: 'w-[23.9rem]',
			urlHeadWidth: 'w-[32.5rem]',
			contentWidth: 'w-[57.4rem]',
			bgColor: ' bg-gray-bg-03',
			border: 'w-[55.8rem]',
		},
		smallRight: {
			width: 'w-[53.9rem]',
			pageHeadWidth: 'w-[23.9rem]',
			urlHeadWidth: 'w-[23.9rem]',
			contentWidth: 'w-[49.8rem]',
			bgColor: ' bg-gray-bg-02',
			border: 'w-[48.2rem]',
		},
	};

	const showYScroll = urlInfos.length > 9;
	const defaultTableStyle = 'overflow-y overflow-x-hidden rounded-[8px] px-[2rem] h-[46em]  max-h-[46rem]';
	const optionalScrollStyle = showYScroll === true ? 'overflow-y-auto' : 'overflow-y-hidden';
	const theadStyle =
		'px-[0.1rem] detail-semibold-14 flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 text-gray-04';
	const tbodyStyle = 'px-[0.8rem]';

	return (
		<div
			className={`${defaultTableStyle} ${optionalScrollStyle} ${sizeVariant[variant].bgColor} ${sizeVariant[variant].width}`}
		>
			<table className={`${sizeVariant[variant].border} `}>
				<thead>
					<tr className={`${theadStyle}`}>
						<th className={`text-left ${sizeVariant[variant].pageHeadWidth}`}>페이지</th>
						<th className={`text-left ${sizeVariant[variant].urlHeadWidth}`}>주소</th>
					</tr>
				</thead>
				<tbody className={`${tbodyStyle} ${sizeVariant[variant].contentWidth}`}>
					<tr>
						<td>{children}</td>
					</tr>
					{Array.from({ length: Math.max(9 - urlInfos.length, 0) }, (_, index) => (
						<tr key={`empty-row-${index}`}>
							<td className="h-[4.6rem] border-b-[0.1rem] border-gray-bg-04" />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CategoryMoribContentSet;
