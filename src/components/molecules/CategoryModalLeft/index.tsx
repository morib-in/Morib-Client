import { useState } from 'react';

import CategoryCommonTitle from '@/components/atoms/CategoryCommonTitle';
import CategoryMoribContent from '@/components/atoms/CategoryMoribContent';
import CategoryDropdown from '@/components/molecules/CategoryDropdown';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';
import CategoryTabSelect from '@/components/molecules/CategoryTabSelect';

import { CATEGORY_MODALTABS } from '@/constants/tabSelections';

import AddBtn from '@/assets/svgs/add_btn.svg?react';

import { CATEGORY_API } from '@/mocks/categoryData';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}
interface ModalProps {
	optionData: OptionData[];
	handleSelectedInfo: (url: UrlInfo) => void;
}

interface Category {
	id: number;
	name: string;
}

interface OptionData {
	category: Category;
}

const CategoryModalLeft = ({ optionData, handleSelectedInfo }: ModalProps) => {
	const [isSelectedTab, setSelectedTab] = useState(CATEGORY_MODALTABS[0].id);
	const enableHover = true;
	const handleTabChange = (tab: number) => {
		setSelectedTab(tab);
	};

	const disabled = isSelectedTab === 2;
	const urlInfos = CATEGORY_API[0].msetList.map((item) => ({
		url: item.url,
		favicon: item.favicon,
		domain: item.name,
	}));

	return (
		<div className="h-[80rem] w-[68.8rem] rounded-l-[10px] bg-gray-bg-04 py-[2.8rem] pl-[4.4rem] pr-[4.3rem]">
			<div className="mb-[3.3rem]">
				<CategoryCommonTitle />
			</div>
			<div className="mb-[8px]">
				<CategoryTabSelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} isSelectedTab={isSelectedTab} />
			</div>

			<div className="relative mt-[0px]">
				<CategoryDropdown optionData={optionData} disabled={disabled} />
			</div>
			<CategoryMoribContentSet variant="smallLeft" urlInfos={urlInfos}>
				{urlInfos.map((urlInfo, url) => (
					<CategoryMoribContent
						enableHover={enableHover}
						key={url}
						urlInfo={urlInfo}
						variant="smallLeft"
						handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					>
						<button className="">
							<AddBtn className="fill-gray-bg-07 hover:fill-mint-02-hover active:fill-mint-02-press" />
						</button>
					</CategoryMoribContent>
				))}
			</CategoryMoribContentSet>
		</div>
	);
};

export default CategoryModalLeft;
