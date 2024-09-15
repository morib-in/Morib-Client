import { RefObject, useState } from 'react';

import ButtonCategoryCommon from '@/shared/components/ButtonCategoryCommon';
import CategoryMsetUrlInfo from '@/shared/components/CategoryMsetUrlInfo';
import CategoryTabSelect from '@/shared/components/CategoryTabSelect';
import DropdownCategory from '@/shared/components/DropdownCategory';

import { getTabName } from '@/shared/apis/modal/axios';
import { useCategoryLists, useGetMsets } from '@/shared/apis/modal/queries';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import AddBtn from '@/shared/assets/svgs/add_btn.svg?react';
import MinusBtn from '@/shared/assets/svgs/minus_btn.svg?react';

import CategoryCommonMoribSet from './CategoryCommonMoribSet';
import InputCategoryUrl from './InputCategoryUrl';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

type CategoryListModalProp = {
	dialogRef: RefObject<HTMLDialogElement>;
	handleSubmitModal: () => void;
	rightModalUrlInfos: UrlInfo[];
	handleRightModalUrlInfos: (url: UrlInfo) => void;

	handleDeleteUrlInfo: (url: UrlInfo) => void;
	moribSetName: string;
	handleClose: () => void;
};

const AddCategoryListModal = ({
	dialogRef,
	handleSubmitModal,
	handleClose,
	rightModalUrlInfos,
	handleRightModalUrlInfos,
	handleDeleteUrlInfo,
	moribSetName,
}: CategoryListModalProp) => {
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('카테고리 추가');
	const [selectedTabId, setSelectedTabId] = useState(CATEGORY_MODALTABS[0].id);

	const { data: categoryData } = useCategoryLists();
	const categories = categoryData?.data || [];
	const [categoryId, setCategoryId] = useState<number>(0);

	const { data: msetsList } = useGetMsets(categoryId);
	const msetUrlInfos = msetsList || [];

	const handleOptionId = (id: number) => {
		setCategoryId(id);
	};

	const handleTabChange = (tab: number) => {
		setSelectedTabId(tab);
	};

	const disabled = selectedTabId === 2;

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
		<dialog ref={dialogRef} className="rounded-[10px]">
			<div className="flex">
				<div className="h-[80rem] w-[68.8rem] rounded-l-[10px] bg-gray-bg-04 py-[2.8rem] pl-[4.4rem] pr-[4.3rem]">
					<header className="mb-[3.3rem]">
						<h1 className="head-bold-24 text-gray-04">카테고리 추가</h1>
					</header>
					<aside className="mb-[8px]">
						<div className="my-[8px]">
							<CategoryTabSelect
								tabs={CATEGORY_MODALTABS}
								handleTabChange={handleTabChange}
								selectedTabId={selectedTabId}
							/>
						</div>

						<div className="relative mt-[0px]">
							<DropdownCategory
								optionData={categories}
								disabled={disabled}
								handleOptionId={handleOptionId}
								handleClickButton={handleClickButton}
								handleSelectOption={handleSelectOption}
								isClicked={isClicked}
								selectedOption={selectedOption}
							/>
						</div>
					</aside>

					<CategoryCommonMoribSet variant="smallLeft" urlInfos={msetUrlInfos}>
						{selectedTabId !== 2 &&
							msetUrlInfos.map((urlInfo: UrlInfo) => (
								<div
									key={urlInfo.url}
									className="group flex h-[4.6rem] w-[100%] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem] hover:bg-gray-bg-04"
									onClick={() => handleRightModalUrlInfos(urlInfo)}
								>
									<CategoryMsetUrlInfo urlInfo={urlInfo} variant="smallLeft">
										<div className="p-[1.25rem]">
											<button type="button">
												<AddBtn className="fill-gray-bg-07 group-hover:fill-mint-02-hover group-active:fill-mint-02-press" />
											</button>
										</div>
									</CategoryMsetUrlInfo>
								</div>
							))}
					</CategoryCommonMoribSet>
				</div>
				<div className="flex h-[80rem] w-[61.2rem] flex-col items-end justify-between rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
					<header className="subhead-bold-22 mb-[8px] flex w-full flex-row justify-start p-[1rem]">
						<h2 className="text-mint-01">
							{moribSetName.length > 0 ? (
								moribSetName
							) : (
								<>
									<h2 className="pr-[1rem]" /> _______ <span className="pr-[0.5rem]" />
								</>
							)}
						</h2>
						<h2 className="text-white">의 모립세트</h2>
					</header>

					<InputCategoryUrl
						rightModalUrlInfos={rightModalUrlInfos}
						variant="small"
						onUrlInputChange={(url: string) => handleUrlInputChange(url)}
					/>
					<CategoryCommonMoribSet urlInfos={rightModalUrlInfos} variant="smallRight">
						{rightModalUrlInfos.map((urlInfo, url) => (
							<div key={url} className="flex h-[4.6rem] gap-[2rem] border-b border-gray-bg-04 px-[0.8rem]">
								<CategoryMsetUrlInfo urlInfo={urlInfo} variant="smallRight">
									<div className="p-[1.25rem]">
										<button type="button" onClick={() => handleDeleteUrlInfo(urlInfo)}>
											<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
										</button>
									</div>
								</CategoryMsetUrlInfo>
							</div>
						))}
					</CategoryCommonMoribSet>

					<div className="mt-[3rem] flex gap-[16px]">
						<ButtonCategoryCommon
							variant="취소"
							onClick={() => {
								handleClearModalData();
								handleClose();
								setCategoryId(0);
							}}
						>
							취소
						</ButtonCategoryCommon>
						<ButtonCategoryCommon
							variant="완료"
							onClick={() => {
								handleClearModalData();
								handleSubmitModal();
								setCategoryId(0);
							}}
						>
							완료
						</ButtonCategoryCommon>
					</div>
				</div>
			</div>
		</dialog>
	);
};
export default AddCategoryListModal;
