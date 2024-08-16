import ButtonCategoryTab from '@/shared/components/ButtonCategoryTab';

interface Tabs {
	id: number;
	name: string;
}

interface TabSelectProps {
	tabs: Tabs[];
	handleTabChange: (number: number) => void;
	isSelectedTab: number;
}

const CategoryTabSelect = ({ tabs, handleTabChange, isSelectedTab }: TabSelectProps) => {
	return (
		<>
			{tabs.map((tab) => (
				<ButtonCategoryTab
					tabId={tab.id}
					key={tab.id}
					onClick={() => {
						handleTabChange(tab.id);
					}}
					activeTab={isSelectedTab}
				>
					{tab.name}
				</ButtonCategoryTab>
			))}
		</>
	);
};

export default CategoryTabSelect;
