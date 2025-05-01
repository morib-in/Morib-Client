import { useEffect, useState } from 'react';

import SettingIcon from '@/shared/assets/svgs/setting.svg?react';
import UserIcon from '@/shared/assets/svgs/user_circle.svg?react';

import { useGetProfile } from '@/shared/apisV2/setting/setting.queries';

import AccountContent from './AccountContent/AccountContent';
import Tabs from './Tabs/Tabs';
import WorkSpaceSettingContent from './WorkspaceSettingContent/WorkspaceSettingContent';

interface ModalContentsSettingProps {
	isModalOpen: boolean;
}

const ModalContentsSetting = ({ isModalOpen }: ModalContentsSettingProps) => {
	const [activeTab, setActiveTab] = useState<string>('account');

	const { data: userProfile } = useGetProfile();

	const personalWorkspaces = ['개인 프로젝트'];
	const teamWorkspaces = ['팀 A 프로젝트', '팀 B 프로젝트'];

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	useEffect(() => {
		if (!isModalOpen) {
			setActiveTab('account');
		}
	}, [isModalOpen]);

	return (
		<div className="flex h-[80rem] w-[102rem] rounded-[1.4rem] bg-gray-bg-04">
			<Tabs value={activeTab} handleValueChange={handleTabChange}>
				<Tabs.Content>
					<Tabs.Category title="사용자 설정">
						<Tabs.Trigger value="account">
							<UserIcon />내 계정
						</Tabs.Trigger>
					</Tabs.Category>

					<Tabs.Category title="워크스페이스">
						<Tabs.Trigger value="settings" disabled>
							<SettingIcon />
							설정 <span className="text-gray-03"> {'\0 준비 중'} </span>
						</Tabs.Trigger>
					</Tabs.Category>
				</Tabs.Content>
			</Tabs>

			<div className="flex w-full flex-col p-[4rem]">
				{activeTab === 'account' && userProfile?.data ? (
					<AccountContent {...userProfile?.data} />
				) : (
					<WorkSpaceSettingContent personalWorkspaces={personalWorkspaces} teamWorkspaces={teamWorkspaces} />
				)}
			</div>
		</div>
	);
};

export default ModalContentsSetting;
