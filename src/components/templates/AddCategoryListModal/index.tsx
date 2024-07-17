import { RefObject, useState } from 'react';

import LoadingUrl from '@/components/atoms/LoadingUrl';
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
	// Todo: 발등 이슈로 추후 타입 수정
	setSelectedInfo: (urlInfo: any) => any;
	moribSetName: string;
};

const AddCategoryListModal = ({
	dialogRef,
	handleCloseModal,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	setSelectedInfo,
	moribSetName,
}: CategoryListModalProp) => {
	const { data: categoryData, isLoading, error } = useCategoryLists();
	const categories = categoryData?.data || [];
	const [categoryId, setCategoryId] = useState<number>(0);

	const { data: msets } = useGetMsets(categoryId);
	const msetsList = msets?.data.msetList || [];

	if (isLoading) return <LoadingUrl />;
	if (error) return <LoadingUrl />;

	const handleOptionId = (id: number) => {
		setCategoryId(id);
	};

	const handleUrlInputChange = (url: string) => {
		const newUrlInfo: UrlInfo = {
			url: url,
			favicon: `https://www.google.com/s2/favicons?domain=${url}`,
		};
		// Todo: 발등 이슈로 추후 타입 수정
		setSelectedInfo((prevUrlInfos: any) => [...prevUrlInfos, newUrlInfo]);
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
					moribSetName={moribSetName}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
