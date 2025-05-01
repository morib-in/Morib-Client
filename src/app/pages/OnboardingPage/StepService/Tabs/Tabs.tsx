import { ReactElement, ReactNode, createContext, useContext } from 'react';

import Spacer from '@/shared/components/Spacer/Spacer';

import type { FieldType } from '@/shared/types/fileds';

// ===== 1) Context 설정 =====
interface TabsContextProps {
	activeTab: FieldType;
	onChangeActiveTab: (tab: FieldType) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs 컴포넌트는 <Tabs> 내부에서 사용되어야 합니다.');
	}
	return context;
};

interface TabsRootProps {
	activeTab: FieldType;
	onChangeActiveTab: (tab: FieldType) => void;
	children: ReactNode;
}

const TabsRoot = ({ activeTab, onChangeActiveTab, children }: TabsRootProps) => {
	const contextValue = {
		activeTab,
		onChangeActiveTab,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<Spacer.Height className="flex w-full flex-col pb-[3rem] pr-[4rem]">{children}</Spacer.Height>
		</TabsContext.Provider>
	);
};

interface TabsTriggerListProps {
	children: ReactNode;
}

const TabsTriggerList = ({ children }: TabsTriggerListProps) => {
	return <div className="grid min-w-[840px] grid-cols-7">{children}</div>;
};

interface TabsTriggerProps {
	value: FieldType;
}

const TabsTrigger = ({ value }: TabsTriggerProps) => {
	const { activeTab, onChangeActiveTab } = useTabsContext();
	const isActive = activeTab === value;

	return (
		<button
			className={`flex h-[7rem] items-center justify-center text-white hover:border-b-[0.3rem] hover:border-b-gray-03 ${
				isActive
					? 'border-b-[0.3rem] border-b-mint-01 head-bold-24'
					: 'border-b-[0.2rem] border-b-gray-02 subhead-reg-22'
			}`}
			onClick={() => onChangeActiveTab(value)}
		>
			{value}
		</button>
	);
};

interface TabsContentListProps {
	children: ReactNode;
}

const TabsContentList = ({ children }: TabsContentListProps) => {
	return (
		<Spacer.Height className="mt-[4rem] flex">
			<div className="flex flex-wrap content-start gap-x-[2rem] gap-y-[2.3rem] overflow-y-auto">{children}</div>
		</Spacer.Height>
	);
};

interface TabsContentProps {
	value: string;
	children: ReactElement;
}

const TabsContent = ({ value, children }: TabsContentProps) => {
	const { activeTab } = useTabsContext();
	if (value !== activeTab) return null;
	return <>{children}</>;
};

const Tabs = Object.assign(TabsRoot, {
	TriggerList: TabsTriggerList,
	Trigger: TabsTrigger,
	ContentList: TabsContentList,
	Content: TabsContent,
});

export default Tabs;
