import { useState } from 'react';

import CategoryMsetUrlInfo from '@/shared/components/CategoryMsetUrlInfo';
import CategoryTabSelect from '@/shared/components/CategoryTabSelect';
import DropdownCategory from '@/shared/components/DropdownCategory';

import { useCategoryLists, useGetMsets } from '@/shared/apis/modal/queries';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import AddBtn from '@/shared/assets/svgs/add_btn.svg?react';

import CategoryCommonMoribSet from './CategoryCommonMoribSet';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalProps {
	handleRightModalUrlInfos: (url: UrlInfo) => void;

	handleClickButton: (is: boolean) => boolean;
	handleSelectOption: (name: string) => void;
	isClicked: boolean;
	selectedOption: string;
}

const CategoryModalLeft = ({
	handleRightModalUrlInfos,

	handleClickButton,
	handleSelectOption,
	isClicked,
	selectedOption,
}: ModalProps) => {
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

	return (
		<div className="h-[80rem] w-[68.8rem] rounded-l-[10px] bg-gray-bg-04 py-[2.8rem] pl-[4.4rem] pr-[4.3rem]">
			<header className="mb-[3.3rem]">
				<h1 className="head-bold-24 text-gray-04">카테고리 추가</h1>
			</header>
			<aside className="mb-[8px]">
				<CategoryTabSelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} selectedTabId={selectedTabId} />

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
	);
};

export default CategoryModalLeft;
