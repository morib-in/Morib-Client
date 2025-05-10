import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import Dropdown from '@/shared/components/Dropdown/Dropdown';
import FaviconImage from '@/shared/components/FaviconImage/FaviconImage';
import Spacer from '@/shared/components/Spacer/Spacer';

import { AllowedServiceGroupType, ColorPaletteType } from '@/shared/types/allowedService';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

import MeatBallDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import PlusIcon from '@/shared/assets/svgs/plus.svg?react';

export interface AllowedService {
	id: number;
	allowedServiceName: string;
	selectedColor: string;
	urlList: UrlInfo[];
}

export interface UrlInfo {
	siteName: string;
	page: string;
	url: string;
	faviconUrl: string;
}

interface AllowedServiceListRootProps {
	allowedServices?: AllowedService[];
	activeAllowedServiceId?: number | null;
	setActiveAllowedServiceId?: (id: number) => void;
	addAllowedService?: () => void;
	deleteAllowedService?: (id: number) => void;
	children: ReactNode;
}

const AllowedServiceListRoot = ({ children }: AllowedServiceListRootProps) => {
	return (
		<Spacer.Height className="flex w-[31.6rem] flex-shrink-0 flex-col rounded-[1.6rem] bg-gray-bg-03 px-[1.8rem] py-[2.2rem]">
			{children}
		</Spacer.Height>
	);
};

const AllowedServiceListHeader = ({ children }: { children: ReactNode }) => {
	return <div className="flex h-[3.6rem] items-center justify-between">{children}</div>;
};

const AllowedServiceListTitle = ({ children }: { children: ReactNode }) => {
	return <h1 className="text-white head-bold-24">{children}</h1>;
};

const AllowedServiceListPlusButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button type="button" {...props}>
			<PlusIcon />
		</button>
	);
};

const AllowedServiceListContent = ({ children }: { children: ReactNode }) => {
	return <Spacer.Height className="mt-[2.4rem] flex w-[28rem] flex-col overflow-y-auto">{children}</Spacer.Height>;
};

interface AllowedServiceListItemProps extends AllowedServiceGroupType {
	activeGroupId: number | null;
	activeGroupTitleInput: string;
	onSelectActiveGroup: (activeGroupId: number | null) => void;
	onDeleteAllowedServiceGroup: (groupId: number) => void;
	isEditingTitle: boolean;
}

const AllowedServiceListItem = ({
	activeGroupId,
	activeGroupTitleInput,
	onSelectActiveGroup,
	onDeleteAllowedServiceGroup,
	isEditingTitle,
	...allowedServiceGroupData
}: AllowedServiceListItemProps) => {
	const isActive = activeGroupId === allowedServiceGroupData.id;

	const handleDeleteAllowedServiceGroup = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onDeleteAllowedServiceGroup(allowedServiceGroupData.id);
	};

	const handleSelectActiveGroupId = () => {
		onSelectActiveGroup(allowedServiceGroupData.id);
	};

	return (
		<div
			onClick={handleSelectActiveGroupId}
			className={`relative mb-[0.8rem] flex h-[8rem] w-[28rem] flex-shrink-0 cursor-pointer flex-col items-start rounded-[8px] border-[1px] bg-gray-bg-01 p-[1.4rem] ${isActive ? 'border-mint-01' : 'border-transparent'}`}
		>
			<Spacer.Width className="flex">
				<Spacer.Width className="flex items-center gap-[0.6rem]">
					<div
						className={`h-[1.4rem] w-[1.4rem] flex-shrink-0 rounded-full ${COLOR_PALETTE_MAP[allowedServiceGroupData.colorCode]}`}
					/>

					<h2
						className={`w-[28.8rem] truncate detail-semibold-14 ${allowedServiceGroupData.name.length > 0 ? 'text-white' : 'text-gray-03'}`}
					>
						{(isActive && isEditingTitle ? activeGroupTitleInput : allowedServiceGroupData.name) ||
							'모립세트 이름을 입력해주세요.'}
					</h2>
				</Spacer.Width>

				<Dropdown>
					<Dropdown.Trigger>
						<MeatBallDefaultIcon className="cursor-pointer hover:rounded-full hover:bg-gray-bg-05" />
					</Dropdown.Trigger>
					<Dropdown.Content boxShadow="shadow-none" className="absolute right-0 top-[2.4rem] w-[12.4rem]">
						<Dropdown.Item onClick={handleDeleteAllowedServiceGroup} label="리스트 삭제" textColor="red" />
					</Dropdown.Content>
				</Dropdown>
			</Spacer.Width>

			<div className="mt-[0.4rem] flex items-center gap-[0.6rem]">
				{allowedServiceGroupData?.favicons.map((siteUrl) => (
					<FaviconImage key={siteUrl} src={siteUrl} className="rounded-full" alt="사이트 아이콘" />
				))}
				{allowedServiceGroupData?.extraCnt > 0 && (
					<div className="body-detail-reg-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-[57px] bg-date-active text-white">
						+{allowedServiceGroupData.extraCnt}
					</div>
				)}
			</div>
		</div>
	);
};

interface AllowedServiceItemInputProps {
	titleInput: string;
	selectedColor: ColorPaletteType;
}

const AllowedServiceItemInput = ({ titleInput, selectedColor }: AllowedServiceItemInputProps) => {
	return (
		<div
			className={`relative mb-[0.8rem] flex h-[8rem] w-[28rem] cursor-pointer flex-col items-start rounded-[8px] border-[1px] border-transparent bg-gray-bg-01 p-[1.4rem]`}
		>
			<Spacer.Width className="flex">
				<Spacer className="flex items-center gap-[0.6rem]">
					<div
						className={`absolute left-[1.4rem] top-[1.9rem] h-[1.4rem] w-[1.4rem] flex-shrink-0 rounded-full ${COLOR_PALETTE_MAP[selectedColor]}`}
					/>

					<h2
						className={`ml-[2rem] w-[19.2rem] flex-shrink-0 flex-grow-0 flex-wrap detail-semibold-14 ${titleInput.length > 0 ? 'text-white' : 'text-gray-03'}`}
					>
						{titleInput || '허용서비스 세트의 이름을 입력해주세요.'}
					</h2>
				</Spacer>
			</Spacer.Width>
		</div>
	);
};

const AllowedServiceList = Object.assign(AllowedServiceListRoot, {
	Header: AllowedServiceListHeader,
	PlusButton: AllowedServiceListPlusButton,
	Title: AllowedServiceListTitle,
	Content: AllowedServiceListContent,
	Item: AllowedServiceListItem,
	ItemInput: AllowedServiceItemInput,
});

export default AllowedServiceList;
