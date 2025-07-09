import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface AllowedServiceGroupDetailTabsRootProps {
	children: ReactNode;
}

const AllowedServiceGroupDetailTabsRoot = ({ children }: AllowedServiceGroupDetailTabsRootProps) => {
	return <div className="flex items-center gap-[0.3rem] self-stretch">{children}</div>;
};

export interface AllowedServiceGroupDetailTabsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean;
}

const AllowedServiceGroupDetailTabsButton = ({ isActive, ...props }: AllowedServiceGroupDetailTabsButtonProps) => {
	const notSelectedStyle = 'text-gray-03 subhead-bold-22 p-[1rem]';
	const SelectedStyle = 'text-white subhead-bold-22 p-[1rem] border-b-[2px] border-text-white';
	const tabBtnStyle = isActive ? SelectedStyle : notSelectedStyle;

	return (
		<button className={tabBtnStyle} {...props}>
			{props.children}
		</button>
	);
};

const AllowedServiceGroupDetailTabs = Object.assign(AllowedServiceGroupDetailTabsRoot, {
	Button: AllowedServiceGroupDetailTabsButton,
});

export default AllowedServiceGroupDetailTabs;
