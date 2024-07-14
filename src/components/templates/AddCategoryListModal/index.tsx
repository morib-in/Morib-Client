import { useState } from 'react';

import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';
import CategoryModalRight from '@/components/molecules/CategoryModalRight';

import { CATEGORY_API } from '@/mocks/categoryData';
import { URL_DATA } from '@/mocks/urlData';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

const AddCategoryListModal = () => {
	const [selectedInfo, setSelectedInfo] = useState<UrlInfo[]>([]);

	const handleSelectedInfo = (urlInfo: UrlInfo) => {
		setSelectedInfo((prevUrlInfos) => [...prevUrlInfos, urlInfo]);
	};

	const handleUrlInputChange = (url: string) => {
		const index = selectedInfo.length;
		if (index < URL_DATA.length) {
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: URL_DATA[index].tabName,
				favicon: URL_DATA[index].favicon,
			};

			setSelectedInfo((prevUrlInfos) => [...prevUrlInfos, newUrlInfo]);
		}
	};

	const handleDeleteUrlInfo = (urlInfoToDelete: UrlInfo) => {
		setSelectedInfo((prevUrlInfos) => prevUrlInfos.filter((urlInfo) => urlInfo.url !== urlInfoToDelete.url));
	};

	return (
		<div>
			<div className="flex">
				<CategoryModalLeft
					optionData={CATEGORY_API}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
				/>
				<CategoryModalRight
					selectedInfo={selectedInfo}
					handleUrlInputChange={(url: string) => handleUrlInputChange(url)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
				/>
			</div>
		</div>
	);
};
export default AddCategoryListModal;
