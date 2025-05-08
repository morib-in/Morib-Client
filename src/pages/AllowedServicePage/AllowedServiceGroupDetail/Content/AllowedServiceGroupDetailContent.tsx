import { ReactNode, useRef } from 'react';

import Dropdown from '@/shared/components/Dropdown/Dropdown';
import FaviconImage from '@/shared/components/FaviconImage/FaviconImage';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';
import Spacer from '@/shared/components/Spacer/Spacer';

import { AllowedServiceGroupDetailSiteType } from '@/shared/types/allowedService';

import MeatBallDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';

import ModalContentsAlert from '@/pages/AllowedServicePage/ModalContentsAlert/ModalContentsAlert';
import { usePatchMergeToParentDomain } from '@/shared/apisV2/allowedService/allowedService.mutations';

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
	activeGroupId: number;
}

export const AllowedServiceGroupDetailContentTableRow = ({
	onDeleteAllowedSite,
	activeGroupId,
	...allowedSiteData
}: AllowedServiceGroupDetailContentRootTableRowProps) => {
	const domainAllowModalRef = useRef<ModalWrapperRef>(null);
	const confirmDeleteModalRef = useRef<ModalWrapperRef>(null);

	const handleOpenDomainAllowModal = () => {
		domainAllowModalRef.current?.open();
	};

	const handleCloseDomainAllowModal = () => {
		domainAllowModalRef.current?.close();
	};

	const handleOpenConfirmDeleteModal = () => {
		confirmDeleteModalRef.current?.open();
	};

	const handleCloseConfirmDeleteModal = () => {
		confirmDeleteModalRef.current?.close();
	};

	const allowToMergeParentDomain = usePatchMergeToParentDomain();

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
						<Dropdown.Content className="absolute right-0 top-[2.4rem] w-[16.7rem]">
							<Dropdown.Item label="상위 도메인 허용" onClick={handleOpenDomainAllowModal} />
							<Dropdown.Item
								label="허용 사이트 삭제"
								textColor="red"
								onClick={() => {
									handleOpenConfirmDeleteModal();
								}}
							/>
						</Dropdown.Content>
					</Dropdown>
				</div>
			</div>
			<ModalWrapper ref={domainAllowModalRef} backdrop>
				{() => (
					<ModalContentsAlert.DomainAllowConfirm
						siteName={allowedSiteData.siteName}
						onConfirm={() => {
							allowToMergeParentDomain.mutate({
								allowedGroupId: activeGroupId!,
								allowedSiteId: allowedSiteData.id,
								siteUrl: 'https://' + allowedSiteData.siteUrl,
							});
							handleCloseDomainAllowModal();
						}}
						onCancel={handleCloseDomainAllowModal}
					/>
				)}
			</ModalWrapper>
			<ModalWrapper ref={confirmDeleteModalRef} backdrop>
				{() => (
					<ModalContentsAlert.ConfirmDelete
						onClick={() => {
							handleCloseConfirmDeleteModal();
							onDeleteAllowedSite();
						}}
						pageName={allowedSiteData.pageName}
					/>
				)}
			</ModalWrapper>
		</div>
	);
};

const AllowedServiceGroupDetailContent = Object.assign(AllowedServiceGroupDetailContentRoot, {
	Table: AllowedServiceGroupDetailContentTable,
	TableRow: AllowedServiceGroupDetailContentTableRow,
});

export default AllowedServiceGroupDetailContent;
