import { useEffect, useState } from 'react';

import { getDomainAndFavicon } from '@/utils/getDomainAndFavicon/index';

interface CategoryMoribContentProps {
	width: string;
	height: string;
	pageWidth: string;
	urlWidth: string;
	urls: string[];
}

interface DomainFaviconProps {
	domain: string;
	favicon: string;
}

const CategoryMoribContent = (props: CategoryMoribContentProps) => {
	const [domainFaviconList, setDomainFaviconList] = useState<DomainFaviconProps[]>([]);

	const { width, height, pageWidth, urlWidth, urls } = props;
	const minRows = 7;
	const rowsToShow = [...urls, ...Array(Math.max(minRows - urls.length, 0)).fill('')];

	const showYScroll = rowsToShow.length > 7;

	useEffect(() => {
		const fetchDomainFaviconData = async () => {
			const list = await Promise.all(
				rowsToShow.map(async (url) => {
					if (url) {
						const { domainName, faviconUrl } = await getDomainAndFavicon(url);
						return { domain: domainName, favicon: faviconUrl };
					} else {
						return { domain: '', favicon: '' };
					}
				}),
			);
			setDomainFaviconList(list);
		};

		fetchDomainFaviconData();
	}, [urls]);

	return (
		<div
			className={`overflow-y overflow-x-hidden ${showYScroll ? 'overflow-y-auto' : 'overflow-y-hidden'} rounded-[8px] bg-gray-bg-02 px-[2rem] ${width} ${height}`}
			style={{ maxHeight: `${height}` }}
		>
			<table>
				<thead>
					<tr className="detail-semibold-14 flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 text-gray-04">
						<th className={`${pageWidth} text-gray-04`} style={{ textAlign: 'left' }}>
							페이지
						</th>
						<th className={`${urlWidth}`} style={{ textAlign: 'left' }}>
							주소
						</th>
					</tr>
				</thead>
				<tbody>
					{rowsToShow.map((url, rowIndex) => (
						<tr key={rowIndex}>
							<td className="border-b-[0.1rem] border-gray-bg-04 p-0" style={{ height: '4.6rem' }}>
								{url ? (
									<div className="flex h-[4.6rem] items-center py-[1.2rem]">
										<div className={`my-[0.1rem] flex h-[2.2rem] items-center ${pageWidth}`}>
											<img
												src={domainFaviconList[rowIndex]?.favicon}
												alt="favicon"
												className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]"
											/>
											<div className="body-reg-16 my-[0.05rem] text-white">{domainFaviconList[rowIndex]?.domain}</div>
										</div>
										<div
											className={`detail-reg-14 h-[2.1rem] truncate rounded-[2rem] bg-gray-bg-04 px-[1rem] py-[0.1rem] text-white ${urlWidth}`}
										>
											{url}
										</div>
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
