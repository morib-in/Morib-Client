import { ReactNode } from 'react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryCommonMoribSetProps {
	variant: 'basic' | 'smallLeft' | 'smallRight';
	urlInfos: UrlInfo[];
	children?: ReactNode;
}

const CategoryCommonMoribSet = ({ variant, urlInfos, children }: CategoryCommonMoribSetProps) => {
	const sizeVariant = {
		basic: {
			height: 'h-[36.8rem]',
			maxHeight: 'max-h-[36.8rem]',
			width: 'w-[100%]',
			pageHeadWidth: 'w-[29.8rem]',
			urlHeadWidth: 'w-[39rem]',
			bgColor: ' bg-gray-bg-02',
			rowCounts: 7,
		},
		smallLeft: {
			height: 'h-[46rem]',
			maxHeight: 'max-h-[46rem]',
			width: 'w-[100%]',
			pageHeadWidth: 'w-[23.2rem]',
			urlHeadWidth: 'w-[32.5rem]',
			bgColor: ' bg-gray-bg-03',
			rowCounts: 9,
		},
		smallRight: {
			height: 'h-[46rem]',
			maxHeight: 'max-h-[46rem]',
			width: 'w-[100%]',
			pageHeadWidth: 'w-[23.9rem]',
			urlHeadWidth: 'w-[23.9rem]',
			bgColor: ' bg-gray-bg-02',
			rowCounts: 9,
		},
	};

	const showYScroll = urlInfos.length > sizeVariant[variant].rowCounts;
	const defaultTableStyle = `overflow-y overflow-x-hidden rounded-[8px] px-[2rem]`;

	const optionalScrollStyle = showYScroll === true ? 'overflow-y-auto' : 'overflow-y-hidden';
	const theadStyle =
		' detail-semibold-14 flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 text-gray-04';

	return (
		<div
			className={`${defaultTableStyle} ${optionalScrollStyle} ${sizeVariant[variant].bgColor} ${sizeVariant[variant].width} ${sizeVariant[variant].height} ${sizeVariant[variant].maxHeight}`}
		>
			<div>
				<div className={`${theadStyle}`}>
					<div className={`text-left ${sizeVariant[variant].pageHeadWidth}`}>페이지</div>
					<div className={`text-left ${sizeVariant[variant].urlHeadWidth}`}>주소</div>
				</div>

				<div>
					{children}
					{Array.from({ length: Math.max(sizeVariant[variant].rowCounts - urlInfos.length, 0) }, (_, index) => (
						<div key={`empty-row-${index}`}>
							<div className="h-[4.6rem] w-full border-b-[0.1rem] border-gray-bg-04" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryCommonMoribSet;
