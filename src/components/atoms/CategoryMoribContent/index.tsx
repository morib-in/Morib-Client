import { URL_DATA } from '@/mocks/urlData.ts';

interface CategoryMoribContentProps {
	variant?: 'basic' | 'smallLeft' | 'smallRight';
	urls: string[];
}

const CategoryMoribContent = ({ variant, urls }: CategoryMoribContentProps) => {
	const sizeVariant = {
		basic: {
			width: 'w-[72.8rem]',
			pageWidth: 'w-[28.8rem]',
			urlWidth: 'w-[39.2rem]',
		},
		smallLeft: { width: 'w-[61.4rem]', pageWidth: 'w-[21.8rem]', urlWidth: 'w-[28.8rem]' },
		smallRight: { width: 'w-[53.9rem]', pageWidth: 'w-[21.1rem]', urlWidth: 'w-[21.1rem]' },
	};

	const minRows = 7;
	const rowsToShow = [...urls, ...Array(Math.max(minRows - urls.length, 0)).fill('')];

	const showYScroll = rowsToShow.length > 7;

	const domains = URL_DATA.map((item) => item.domainName);
	const favicons = URL_DATA.map((item) => item.favicon);

	const defaultTableStyle =
		'overflow-y overflow-x-hidden rounded-[8px] bg-gray-bg-02 px-[2rem] h-[36.8rem]  max-h-[36.8rem]';
	const optionalTableStyle = showYScroll === true ? 'overflow-y-auto' : 'overflow-y-hidden';
	const theadStyle = 'detail-semibold-14 flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 text-gray-04';
	const tbodyUrlStyle =
		'detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white';

	return (
		<div className={`${defaultTableStyle} + ${optionalTableStyle} ${sizeVariant[variant].width}`}>
			<table>
				<thead>
					<tr className={`${theadStyle}`}>
						<th className={`text-left ${sizeVariant[variant].pageWidth}`}>페이지</th>
						<th className={`text-left ${sizeVariant[variant].urlWidth}`}>주소</th>
					</tr>
				</thead>
				<tbody>
					{rowsToShow.map((url, rowIndex) => (
						<tr key={rowIndex}>
							<td className="h-[4.6rem] border-b-[0.1rem] border-gray-bg-04 p-0">
								{url ? (
									<div className="flex h-[4.6rem] items-center py-[1.2rem]">
										<div className={`my-[0.1rem] flex h-[2.2rem] items-center ${sizeVariant[variant].pageWidth}`}>
											<img
												src={favicons[rowIndex]}
												alt="favicon"
												className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]"
											/>
											<div className="body-reg-16 my-[0.05rem] text-white">{domains[rowIndex]}</div>
										</div>
										<div className={`${tbodyUrlStyle} ${sizeVariant[variant].urlWidth}`}>{url}</div>
									</div>
								) : (
									''
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CategoryMoribContent;
