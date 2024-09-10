import ButtonCategoryTab from '@/shared/components/ButtonCategoryTab';

interface Tabs {
	id: number;
	name: string;
}

interface TabSelectProps {
	tabs: Tabs[];
	handleTabChange: (number: number) => void;
	selectedTabId: number;
}

const CategoryTabSelect = ({ tabs, handleTabChange, selectedTabId }: TabSelectProps) => {
	return (
		<>
			{tabs.map((tab) => (
				<ButtonCategoryTab
					tabId={tab.id}
					key={tab.id}
					onClick={() => {
						handleTabChange(tab.id);
					}}
					activeTab={selectedTabId}
				>
					{tab.name}
				</ButtonCategoryTab>
			))}
		</>
	);
};

export default CategoryTabSelect;
