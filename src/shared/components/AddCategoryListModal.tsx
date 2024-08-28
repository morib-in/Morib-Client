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
	selectedInfo: UrlInfo[];
	handleSelectedInfo: (urlInfo: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	moribSetName: string;
	handleClose: () => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleSubmitModal,
	handleClose,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	moribSetName,
}: CategoryListModalProp) => {
	const [categoryUrlData, setCategoryUrlData] = useState<UrlInfo[]>([]); // 선택한 카테고리의 모립세트 url 상태
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
			handleSelectedInfo(newUrlInfo);
		} catch (isQueryError) {
			console.error(isQueryError);
		}
	};

	const handleCategoryUrlData = (addFavicon: UrlInfo[]) => {
		setCategoryUrlData(addFavicon);
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
		setCategoryUrlData([]);
	};
	return (
		<dialog ref={dialogRef} className="rounded-[10px]">
			<div className="flex">
				<CategoryModalLeft
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					categoryUrlData={categoryUrlData}
					handleCategoryUrlData={handleCategoryUrlData}
					handleClickButton={handleClickButton}
					handleSelectOption={handleSelectOption}
					isClicked={isClicked}
					selectedOption={selectedOption}
				/>
				<CategoryModalRight
					selectedInfo={selectedInfo}
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
