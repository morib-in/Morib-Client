import { ReactNode } from 'react';

import Dropdown from '@/shared/components/Dropdown/Dropdown';
import FaviconImage from '@/shared/components/FaviconImage/FaviconImage';
import Spacer from '@/shared/components/Spacer/Spacer';

import { AllowedServiceGroupDetailSiteType } from '@/shared/types/allowedService';

import MeatBallDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';

export interface AllowedServiceGroupDetailContentProps {
	children: ReactNode;
}

export const AllowedServiceGroupDetailContentRoot = ({ children }: AllowedServiceGroupDetailContentProps) => {
	return <Spacer className="flex flex-col gap-[5rem]">{children}</Spacer>;
};

export interface AllowedServiceGroupDetailContentTableProps {
	totalLength: number;
	children: ReactNode;
}

export const AllowedServiceGroupDetailContentTable = ({
	totalLength,
	children,
}: AllowedServiceGroupDetailContentTableProps) => {
	const tableNum = 9;

	const renderEmptyRows = (count: number) => {
		return Array.from({ length: count }).map((_, index) => (
			<div key={`empty-row-${index}`} className="h-[5rem] w-full border-b-[0.1rem] border-gray-bg-04" />
		));
	};
	const emptyRowCount = Math.max(tableNum - totalLength, 0);

	return (
		<Spacer className="mt-[1rem] rounded-[8px]">
			<Spacer className="flex flex-col">
				<div className="flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 px-[1rem] text-gray-04 detail-semibold-14">
					<div className="w-[24rem] flex-shrink-0">사이트 이름</div>
					<div className="w-[31rem] flex-shrink-0 text-left">페이지</div>
					<div className="w-full text-left">주소</div>
				</div>

				<Spacer className="overflow-y-auto">
					{children}
					{renderEmptyRows(emptyRowCount)}
				</Spacer>
			</Spacer>
		</Spacer>
	);
};

export interface AllowedServiceGroupDetailContentRootTableRowProps extends AllowedServiceGroupDetailSiteType {
	onDeleteAllowedSite: () => void;
}

export const AllowedServiceGroupDetailContentTableRow = ({
	onDeleteAllowedSite,
	...allowedSiteData
}: AllowedServiceGroupDetailContentRootTableRowProps) => {
	return (
		<div className="flex h-[5rem] items-center border-b-[0.1rem] border-gray-bg-04 px-[1rem]">
			<div className="flex w-[24rem] flex-shrink-0 items-center gap-x-[0.5rem] truncate pr-[1rem] text-left text-white body-med-16">
				<FaviconImage
					src={allowedSiteData.favicon}
					className="mr-[0.6rem]"
					alt={`${allowedSiteData.siteName} 아이콘`}
				/>
				<p className="truncate">{allowedSiteData.siteName}</p>
			</div>
			<div className="w-[31rem] flex-shrink-0 truncate pr-[1rem] text-left text-gray-04 body-reg-16">
				<p className="truncate">{allowedSiteData.pageName}</p>
			</div>
			<div className="w-full truncate pr-[1rem] text-left text-gray-04 body-reg-16">
				<p className="truncate">{allowedSiteData.siteUrl}</p>
			</div>
			<div>
				<div className="pr-[2.05rem]">
					<Dropdown>
						<Dropdown.Trigger>
							<MeatBallDefaultIcon className="cursor-pointer hover:rounded-full hover:bg-gray-bg-05" />
						</Dropdown.Trigger>
						<Dropdown.Content boxShadow="shadow-none" className="absolute right-0 top-[2.4rem] w-[12.4rem]">
							<Dropdown.Item label="상위 도메인 허용" />
							<Dropdown.Item label="허용 사이트 삭제" textColor="red" onClick={onDeleteAllowedSite} />
						</Dropdown.Content>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

const AllowedServiceGroupDetailContent = Object.assign(AllowedServiceGroupDetailContentRoot, {
	Table: AllowedServiceGroupDetailContentTable,
	TableRow: AllowedServiceGroupDetailContentTableRow,
});

export default AllowedServiceGroupDetailContent;
