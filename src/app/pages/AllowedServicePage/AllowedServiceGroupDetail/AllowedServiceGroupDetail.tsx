import { ReactNode } from 'react';

import Spacer from '@/shared/components/Spacer/Spacer';

import AllowedServiceGroupDetailContent from './Content/AllowedServiceGroupDetailContent';
import AllowedServiceGroupDetailHeader from './Header/AllowedServiceGroupDetailHeader';
import AllowedServiceGroupDetailTabs from './Tabs/AllowedServiceGroupDetailTabs';

interface AllowedServiceGroupDetailRootProps {
	children: ReactNode;
}

const AllowedServiceGroupDetailRoot = ({ children }: AllowedServiceGroupDetailRootProps) => {
	return <Spacer className="relative flex flex-col items-start gap-[2rem]">{children}</Spacer>;
};

const AllowedServiceGroupDetail = Object.assign(AllowedServiceGroupDetailRoot, {
	Header: AllowedServiceGroupDetailHeader,
	Input: AllowedServiceGroupDetailHeader.Input,
	ColorButton: AllowedServiceGroupDetailHeader.ColorButton,
	Tabs: AllowedServiceGroupDetailTabs,
	TabButton: AllowedServiceGroupDetailTabs.Button,
	Content: AllowedServiceGroupDetailContent,
	Table: AllowedServiceGroupDetailContent.Table,
	TableRow: AllowedServiceGroupDetailContent.TableRow,
});

export default AllowedServiceGroupDetail;
