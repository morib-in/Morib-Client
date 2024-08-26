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
	handleCloseModal: () => void;
	selectedInfo: UrlInfo[];
	handleSelectedInfo: (urlInfo: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	moribSetName: string;
	handleClose: () => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleCloseModal,
	handleClose,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,

	moribSetName,
}: CategoryListModalProp) => {
	const [urlData, setUrlData] = useState<UrlInfo[]>([]); // 선택한 카테고리의 모립세트 url 상태
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

	const handleClearModalData = () => {
		setIsClicked(false);
		setSelectedOption('카테고리 추가');
		setUrlData([]);
	};
	return (
		<dialog ref={dialogRef} className="rounded-[10px]">
			<div className="flex">
				<CategoryModalLeft
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
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
					handleClose={handleClose}
					handleCloseModal={handleCloseModal}
					moribSetName={moribSetName}
					handleClearModalData={handleClearModalData}
				/>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
