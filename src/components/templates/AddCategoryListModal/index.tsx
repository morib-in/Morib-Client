import { RefObject, useState } from 'react';

import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';
import CategoryModalRight from '@/components/molecules/CategoryModalRight';

import { useCategoryLists } from '@/apis/modal/queries';

import { CATEGORY_API } from '@/mocks/categoryData';
import { URL_DATA } from '@/mocks/urlData';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

type CategoryListModalProp = {
	dialogRef: RefObject<HTMLDialogElement>;
	handleCloseModal: () => void;
};

const AddCategoryListModal = ({ dialogRef, handleCloseModal }: CategoryListModalProp) => {
	const [selectedInfo, setSelectedInfo] = useState<UrlInfo[]>([]);

	const { data: categoryData, isLoading, error } = useCategoryLists();
	const categories = categoryData?.data || [];
	console.log('cate:', categories);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading todos</div>;

	const handleSelectedInfo = (urlInfo: UrlInfo) => {
		setSelectedInfo((prevUrlInfos) => [...prevUrlInfos, urlInfo]);
	};

	const handleUrlInputChange = (url: string) => {
		const index = selectedInfo.length;

		if (index < URL_DATA.length) {
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: URL_DATA[index].tabName,
				favicon: `${url}/favicon.ico`,
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
				<CategoryModalLeft
					optionData={categories}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
				/>
				<CategoryModalRight
					selectedInfo={selectedInfo}
					handleUrlInputChange={(url: string) => handleUrlInputChange(url)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					handleCloseModal={handleCloseModal}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
