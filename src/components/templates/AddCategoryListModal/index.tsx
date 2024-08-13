import { RefObject, useState } from 'react';

import LoadingUrl from '@/components/atoms/LoadingUrl';
import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';
import CategoryModalRight from '@/components/molecules/CategoryModalRight';

import { getTabName } from '@/shared/apis/modal/axios';
import { useCategoryLists, useGetMsets } from '@/shared/apis/modal/queries';

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
	urlData: UrlInfo[];
	setUrlData: any;
	isClicked: boolean;
	setIsClicked: any;
	selectedOption: string;
	setSelectedOption: any;
	handleClearModalData: () => void;
	addInfos: (selectedInfo: UrlInfo[]) => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleCloseModal,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	setSelectedInfo,
	moribSetName,
	urlData,
	setUrlData,
	isClicked,
	setIsClicked,
	selectedOption,
	setSelectedOption,
	handleClearModalData,
	addInfos,
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

	const handleUrlInputChange = async (url: string) => {
		try {
			const tabNameData = await getTabName(url);
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: tabNameData.data.tabName,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
			};
			// Todo: 발등 이슈로 추후 타입 수정
			setSelectedInfo((prevUrlInfos: any) => [...prevUrlInfos, newUrlInfo]);
		} catch (isQueryError) {
			console.error(isQueryError);
		}
	};

	return (
		<dialog ref={dialogRef} className="rounded-[10px]">
			<div className="flex">
				<CategoryModalLeft
					optionData={categories}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					handleOptionId={handleOptionId}
					msetsList={msetsList}
					urlInfos={urlData}
					setUrlData={setUrlData}
					setIsClicked={setIsClicked}
					setSelectedOption={setSelectedOption}
					isClicked={isClicked}
					selectedOption={selectedOption}
				/>
				<CategoryModalRight
					selectedInfo={selectedInfo}
					handleUrlInputChange={(url: string) => handleUrlInputChange(url)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					handleCloseModal={handleCloseModal}
					moribSetName={moribSetName}
					handleClearModalData={handleClearModalData}
					setSelectedOption={setSelectedOption}
					setIsClicked={setIsClicked}
					addInfos={addInfos}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
