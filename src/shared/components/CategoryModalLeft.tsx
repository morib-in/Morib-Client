import debounce from 'lodash/debounce';

import { useEffect, useState } from 'react';

import CategoryTabSelect from '@/shared/components/CategoryTabSelect';
import DropdownCategory from '@/shared/components/DropdownCategory';
import TitleCategoryCommon from '@/shared/components/TitleCategoryCommon';

import { getTabName } from '@/shared/apis/modal/axios';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import AddBtn from '@/shared/assets/svgs/add_btn.svg?react';

import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface msetsList {
	createdAt: string;
	updatedAt: string;
	id: number;
	name: string;
	url: string;
}

interface ModalProps {
	optionData: Category[];
	handleSelectedInfo: (url: UrlInfo) => void;
	handleOptionId: (id: number) => void;
	msetsList: msetsList[];
	urlInfos: UrlInfo[];
	setUrlData: (infos: UrlInfo[]) => void;
	setIsClicked: (is: any) => void;
	setSelectedOption: (name: string) => void;
	isClicked: boolean;
	selectedOption: string;
}

interface Category {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
}

const CategoryModalLeft = ({
	optionData,
	handleSelectedInfo,
	handleOptionId,
	msetsList,
	urlInfos,
	setUrlData,
	setIsClicked,
	setSelectedOption,
	isClicked,
	selectedOption,
}: ModalProps) => {
	const [isSelectedTab, setSelectedTab] = useState(CATEGORY_MODALTABS[0].id);

	const handleTabChange = (tab: number) => {
		setSelectedTab(tab);
	};

	const disabled = isSelectedTab === 2;

	const fetchUrlInfos = async (msetsList: msetsList[], setUrlData: any) => {
		const infos = await Promise.all(
			msetsList.map(async (item: msetsList) => {
				let newUrlInfo: UrlInfo = {
					url: '',
					domain: '',
					favicon: '',
				};
				try {
					const tabNameData = await getTabName(item.url);
					newUrlInfo = {
						url: item.url,
						domain: tabNameData.data.tabName,
						favicon: `https://www.google.com/s2/favicons?domain=${item.url}`,
					};
				} catch (isQueryError) {
					console.error(isQueryError);
				}
				return newUrlInfo;
			}),
		);
		setUrlData(infos);
	};

	useEffect(() => {
		const debouncedFetchUrlInfos = debounce(() => fetchUrlInfos(msetsList, setUrlData), 300);
		debouncedFetchUrlInfos();

		return () => {
			debouncedFetchUrlInfos.cancel();
		};
	}, [msetsList]);

	return (
		<div className="h-[80rem] w-[68.8rem] rounded-l-[10px] bg-gray-bg-04 py-[2.8rem] pl-[4.4rem] pr-[4.3rem]">
			<div className="mb-[3.3rem]">
				<TitleCategoryCommon />
			</div>
			<div className="mb-[8px]">
				<CategoryTabSelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} isSelectedTab={isSelectedTab} />
			</div>

			<div className="relative mt-[0px]">
				<DropdownCategory
					optionData={optionData}
					disabled={disabled}
					handleOptionId={handleOptionId}
					setIsClicked={setIsClicked}
					setSelectedOption={setSelectedOption}
					isClicked={isClicked}
					selectedOption={selectedOption}
				/>
			</div>
			<CategoryMoribContentSet variant="smallLeft" urlInfos={urlInfos}>
				{isSelectedTab !== 2 &&
					urlInfos.map((urlInfo: UrlInfo) => (
						<tr
							key={urlInfo.url}
							className="group flex h-[4.6rem] w-[100%] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem] hover:bg-gray-bg-04"
							onClick={() => handleSelectedInfo(urlInfo)}
						>
							<CategoryMoribContentPage urlInfo={urlInfo} variant="smallLeft" />
							<CategoryMoribContentUrl urlInfo={urlInfo} variant="smallLeft">
								<div className="p-[1.25rem]">
									<button type="button">
										<AddBtn className="fill-gray-bg-07 group-hover:fill-mint-02-hover group-active:fill-mint-02-press" />
									</button>
								</div>
							</CategoryMoribContentUrl>
						</tr>
					))}
			</CategoryMoribContentSet>
		</div>
	);
};

export default CategoryModalLeft;
