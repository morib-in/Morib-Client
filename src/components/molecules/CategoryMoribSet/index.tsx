import { useRef } from 'react';

import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput/index';
import GetCategoryBtn from '@/components/atoms/GetCategoryBtn/index';
import AddCategoryListModal from '@/components/templates/AddCategoryListModal';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryCommonMoribSetProps {
	onUrlInputChange: (url: string) => void;
	selectedInfo: UrlInfo[];
	urlInfo: UrlInfo[];
	handleSelectedInfo: (urlInfo: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	setSelectedInfo: (urlInfo: UrlInfo[]) => void;
	moribSetName: string;
	urlData: UrlInfo[];
	setUrlData: any;
	isClicked: boolean;
	setIsClicked: (is: any) => void;
	selectedOption: string;
	setSelectedOption: (category: string) => void;
	handleClearModalData: () => void;
	handleUrlInfos: () => void;
	addInfos: (selectedInfo: UrlInfo[]) => void;
}

const CategoryCommonMoribSet = ({
	onUrlInputChange,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	setSelectedInfo,
	urlInfo,
	moribSetName,
	urlData,
	setUrlData,
	isClicked,
	setIsClicked,
	selectedOption,
	setSelectedOption,
	handleClearModalData,
	handleUrlInfos,
	addInfos,
}: CategoryCommonMoribSetProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const showModal = () => {
		handleUrlInfos();
		dialogRef.current?.showModal();
	};

	const closeModal = () => {
		dialogRef.current?.close();
	};

	const handleMoveToNextModal = () => {
		setSelectedInfo([]);

		showModal();
	};

	const handleCloseModal = () => {
		addInfos(selectedInfo);
		closeModal();
	};

	return (
		<div>
			<div className="flex justify-between">
				<CategoryInputTitle title="모립 세트" />
				<GetCategoryBtn onMoveCategoryModal={handleMoveToNextModal} />
				<AddCategoryListModal
					dialogRef={dialogRef}
					handleCloseModal={handleCloseModal}
					selectedInfo={selectedInfo}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					setSelectedInfo={setSelectedInfo}
					moribSetName={moribSetName}
					urlData={urlData}
					setUrlData={setUrlData}
					isClicked={isClicked}
					setIsClicked={setIsClicked}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					handleClearModalData={handleClearModalData}
					addInfos={addInfos}
				/>
			</div>
			<CategoryUrlInput variant="basic" onUrlInputChange={(url: string) => onUrlInputChange(url)} urlInfo={urlInfo} />
		</div>
	);
};

export default CategoryCommonMoribSet;
