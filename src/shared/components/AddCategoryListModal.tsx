import { RefObject, useState } from 'react';

import CategoryModalLeft from '@/shared/components/CategoryModalLeft';
import CategoryModalRight from '@/shared/components/CategoryModalRight';

import { getTabName } from '@/shared/apis/modal/axios';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

type CategoryListModalProp = {
	dialogRef: RefObject<HTMLDialogElement>;
	handleSubmitModal: () => void;
	leftModalUrlInfos: UrlInfo[];
	rightModalUrlInfos: UrlInfo[];
	handleLeftModalUrlInfos: (urlInfo: UrlInfo[]) => void;
	handleRightModalUrlInfos: (url: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	moribSetName: string;
	handleClose: () => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleSubmitModal,
	handleClose,
	leftModalUrlInfos,
	rightModalUrlInfos,
	handleLeftModalUrlInfos,
	handleRightModalUrlInfos,
	handleDeleteUrlInfo,
	moribSetName,
}: CategoryListModalProp) => {
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('카테고리 추가');

	const handleUrlInputChange = async (url: string) => {
		try {
			const tabNameData = await getTabName(url);
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: tabNameData.data.tabName,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
			};
			handleRightModalUrlInfos(newUrlInfo);
		} catch (isQueryError) {
			console.error(isQueryError);
		}
	};

	const handleClickButton = (isClicked: boolean) => {
		setIsClicked(isClicked);
	};

	const handleSelectOption = (name: string) => {
		setSelectedOption(name);
	};

	const handleClearModalData = () => {
		setIsClicked(false);
		setSelectedOption('카테고리 추가');
		handleLeftModalUrlInfos([]);
	};
	return (
		<dialog ref={dialogRef} className="rounded-[10px]">
			<div className="flex">
				<CategoryModalLeft
					handleLeftModalUrlInfos={handleLeftModalUrlInfos}
					leftModalUrlInfos={leftModalUrlInfos}
					handleClickButton={handleClickButton}
					handleSelectOption={handleSelectOption}
					isClicked={isClicked}
					selectedOption={selectedOption}
					handleRightModalUrlInfos={handleRightModalUrlInfos}
				/>
				<CategoryModalRight
					rightModalUrlInfos={rightModalUrlInfos}
					handleUrlInputChange={(url: string) => handleUrlInputChange(url)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					handleClose={handleClose}
					handleSubmitModal={handleSubmitModal}
					moribSetName={moribSetName}
					handleClearModalData={handleClearModalData}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
