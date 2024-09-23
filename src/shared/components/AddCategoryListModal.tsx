import { useState } from 'react';

import CategoryModalLeft from '@/shared/components/CategoryModalLeft';
import CategoryModalRight from '@/shared/components/CategoryModalRight';

import { getTabName } from '@/shared/apis/modal/axios';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

type CategoryListModalProp = {
	handleSubmitModal: () => void;

	rightModalUrlInfos: UrlInfo[];
	handleRightModalUrlInfos: (url: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	moribSetName: string;
	handleClose: () => void;
};

const AddCategoryListModal = ({
	handleSubmitModal,
	handleClose,

	rightModalUrlInfos,

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
	};
	return (
		<div className="rounded-[10px]">
			<div className="flex">
				<CategoryModalLeft
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
		</div>
	);
};
export default AddCategoryListModal;
