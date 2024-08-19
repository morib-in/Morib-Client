import { useRef } from 'react';

import ButtonGetCategoryRapidly from '@/shared/components/ButtonGetCategoryRapidly';
import InputCategoryUrl from '@/shared/components/InputCategoryUrl';
import TitleCategory from '@/shared/components/TitleCategory';

import AddCategoryListModal from './AddCategoryListModal';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryMoribSetAddProps {
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

const CategoryMoribSetAdd = ({
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
}: CategoryMoribSetAddProps) => {
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
				<TitleCategory title="모립 세트" />
				<ButtonGetCategoryRapidly onMoveCategoryModal={handleMoveToNextModal} />
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
			<InputCategoryUrl variant="basic" onUrlInputChange={(url: string) => onUrlInputChange(url)} urlInfo={urlInfo} />
		</div>
	);
};

export default CategoryMoribSetAdd;
