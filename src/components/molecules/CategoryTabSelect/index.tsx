import { useState } from 'react';

import CategoryTabBtn from '@/components/atoms/CategoryTabBtn';

const CategoryTabSelect = () => {
	const tabs = [
		{ id: 1, name: '기존 모립 세트' },
		{ id: 2, name: '현재 열린 탭' },
	];
	const [isSelectedTab, setSelectedTab] = useState(tabs[0].id);

	const handleTabChange = (tab: number) => {
		setSelectedTab(tab);
	};

	return (
		<>
			{tabs.map((tab) => (
				<CategoryTabBtn
					tabId={tab.id}
					key={tab.id}
					onClick={() => {
						handleTabChange(tab.id);
					}}
					activeTab={isSelectedTab}
				>
					{tab.name}
				</CategoryTabBtn>
			))}
		</>
	);
};

export default CategoryTabSelect;
