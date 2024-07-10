// CategoryModalLeft
import { useState } from 'react';

import CategoryCommonTitle from '@/components/atoms/CategoryCommonTitle';
import CategoryDropdown from '@/components/molecules/CategoryDropdown';
import CategoryTabSelect from '@/components/molecules/CategoryTabSelect';

import { CATEGORY_MODALTABS } from '@/constants/tabSelections';

interface ModalProps {
	optionData: OptionData[];
}

interface Category {
	id: number;
	name: string;
}

interface OptionData {
	category: Category;
}

const CategoryModalLeft = ({ optionData }: ModalProps) => {
	const [isSelectedTab, setSelectedTab] = useState(CATEGORY_MODALTABS[0].id);
	const [disabled, setIsDisabled] = useState(false);

	const handleTabChange = (tab: number) => {
		setSelectedTab(tab);
		if (tab === 2) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	};

	return (
		<div className="h-[80rem] w-[68.8rem] rounded-l-[10px] bg-gray-bg-04 px-[4.4rem] py-[2.8rem]">
			<div className="mb-[3.3rem]">
				<CategoryCommonTitle />
			</div>
			<div className="">
				<CategoryTabSelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} isSelectedTab={isSelectedTab} />
			</div>

			<CategoryDropdown optionData={optionData} disabled={disabled} />
		</div>
	);
};

export default CategoryModalLeft;
