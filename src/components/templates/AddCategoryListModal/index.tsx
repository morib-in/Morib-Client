import { RefObject, useState } from 'react';

import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';
import CategoryModalRight from '@/components/molecules/CategoryModalRight';

import { useCategoryLists, useGetMsets } from '@/apis/modal/queries';

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
	const [categoryId, setCategoryId] = useState<number>(0);

	const { data: msets } = useGetMsets(categoryId);

	const msetsList = msets?.data.msetList || [];
	console.log('msetsList:', msetsList);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading</div>;

	const handleOptionId = (id: number) => {
		setCategoryId(id);
	};
	const handleSelectedInfo = (urlInfo: UrlInfo) => {
		setSelectedInfo((prevItems) => {
			if (prevItems.some((prevItem) => prevItem.url === urlInfo.url)) {
				return prevItems; // 이미 존재하면 기존 배열 반환
			}
			return [...prevItems, urlInfo]; // 존재하지 않으면 새로운 배열 반환
		});
		// setSelectedInfo((prevUrlInfos) => [...prevUrlInfos, urlInfo]);
	};

	const handleUrlInputChange = (url: string) => {
		const index = selectedInfo.length;

		if (index < msets.length) {
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: msetsList[index].name,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
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
					handleOptionId={handleOptionId}
					msetsList={msetsList}
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
