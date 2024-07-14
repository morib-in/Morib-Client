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

const AddCategoryListModal = ({ dialogRef }) => {
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
		<dialog ref={dialogRef}>
			<div className="flex">
				<CategoryModalLeft optionData={CATEGORY_API} handleSelectedInfo={handleSelectedInfo} />
				<CategoryModalRight
					selectedInfo={selectedInfo}
					handleUrlInputChange={handleUrlInputChange}
					handleDeleteUrlInfo={handleDeleteUrlInfo}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
