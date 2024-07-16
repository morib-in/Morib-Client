import { Key, useState } from 'react';

import CategoryCommonTitle from '@/components/atoms/CategoryCommonTitle';
import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import CategoryDropdown from '@/components/molecules/CategoryDropdown';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';
import CategoryTabSelect from '@/components/molecules/CategoryTabSelect';

import { CATEGORY_MODALTABS } from '@/constants/tabSelections';

import AddBtn from '@/assets/svgs/add_btn.svg?react';

interface UrlInfo {
	url: string;
	domain: string;
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
}

interface Category {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
}

const CategoryModalLeft = ({ optionData, handleSelectedInfo, handleOptionId, msetsList }: ModalProps) => {
	const [isSelectedTab, setSelectedTab] = useState(CATEGORY_MODALTABS[0].id);

	const handleTabChange = (tab: number) => {
		setSelectedTab(tab);
	};

	const disabled = isSelectedTab === 2;
	const urlInfos = msetsList.map((item) => ({
		url: item.url,
		favicon: `https://www.google.com/s2/favicons?domain=${item.url}`,
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
				<CategoryDropdown optionData={optionData} disabled={disabled} handleOptionId={handleOptionId} />
			</div>
			<CategoryMoribContentSet variant="smallLeft" urlInfos={urlInfos}>
				{urlInfos.map((urlInfo: UrlInfo, url: Key | null | undefined) => (
					<tr
						key={url}
						className="group flex h-[4.6rem] w-[100%] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem] hover:bg-gray-bg-04"
						onClick={() => handleSelectedInfo(urlInfo)}
					>
						<CategoryMoribContentPage urlInfo={urlInfo} variant="smallLeft" />
						<CategoryMoribContentUrl urlInfo={urlInfo} variant="smallLeft">
							<div className="p-[1.25rem]">
								<button type="button">
									<AddBtn className="fill-gray-bg-07 hover:fill-mint-02-hover active:fill-mint-02-press" />
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
