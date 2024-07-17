import { RefObject, useState } from 'react';

import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';
import CategoryModalRight from '@/components/molecules/CategoryModalRight';

import { useCategoryLists, useGetMsets } from '@/apis/modal/queries';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

type CategoryListModalProp = {
	dialogRef: RefObject<HTMLDialogElement>;
	handleCloseModal: () => void;
	selectedInfo: UrlInfo[];
	handleSelectedInfo: (urlInfo: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	setSelectedInfo: (urlInfo: UrlInfo[]) => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleCloseModal,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	setSelectedInfo,
}: CategoryListModalProp) => {
	const { data: categoryData, isLoading, error } = useCategoryLists();
	const categories = categoryData?.data || [];
	const [categoryId, setCategoryId] = useState<number>(0);

	const { data: msets } = useGetMsets(categoryId);
	const msetsList = msets?.data.msetList || [];

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading</div>;

	const handleOptionId = (id: number) => {
		setCategoryId(id);
	};

	const handleUrlInputChange = (url: string) => {
		const newUrlInfo: UrlInfo = {
			url: url,
			favicon: `https://www.google.com/s2/favicons?domain=${url}`,
		};

		setSelectedInfo((prevUrlInfos) => [...prevUrlInfos, newUrlInfo]);
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
