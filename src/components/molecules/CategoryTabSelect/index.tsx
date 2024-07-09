import { useState } from 'react';

import CategoryTabBtn from '@/components/atoms/CategoryTabBtn';

const CategoryTabSelect = () => {
	const [isSelectedTab, setSelectedTab] = useState({ tab1: true, tab2: false });

	const handleTabChange = (tab: string) => {
		setSelectedTab({
			tab1: tab === 'tab1',
			tab2: tab === 'tab2',
		});
	};

	return (
		<>
			<CategoryTabBtn
				onClick={() => {
					handleTabChange('tab1');
				}}
				activeTab={isSelectedTab.tab1}
			>
				기존 모립 세트
			</CategoryTabBtn>
			<CategoryTabBtn
				onClick={() => {
					handleTabChange('tab2');
				}}
				activeTab={isSelectedTab.tab2}
			>
				현재 열린 탭
			</CategoryTabBtn>
		</>
	);
};

export default CategoryTabSelect;
