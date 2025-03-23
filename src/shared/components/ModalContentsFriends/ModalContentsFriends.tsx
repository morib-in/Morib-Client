import { forwardRef, useEffect, useState } from 'react';

import FriendsRequest from './FriendRequest/FriendsRequest';
import FriendsList from './FriendsList/FriendsList';

interface ModalContentsFriendsProps {
	isModalOpen: boolean;
}

const ModalContentsFriends = forwardRef<HTMLDivElement, ModalContentsFriendsProps>(({ isModalOpen }, ref) => {
	const [activeTab, setActiveTab] = useState<'친구목록' | '친구요청'>('친구목록');

	const handleTabChange = (tab: '친구목록' | '친구요청') => {
		setActiveTab(tab);
	};

	const changTabToFriendRequest = () => {
		setActiveTab('친구요청');
	};

	const resetActiveTab = () => {
		setActiveTab('친구목록');
	};

	useEffect(() => {
		if (!isModalOpen) {
			resetActiveTab();
		}
	}, [isModalOpen]);

	return (
		<div
			ref={ref}
			className="h-[630px] w-[1020px] overflow-auto rounded-[14px] bg-gray-bg-03 p-[4rem] shadow-[0_3px_30px_0px_rgba(0,0,0,0.4)]"
		>
			<h1 className="mb-[1rem] text-white title-bold-32">친구</h1>

			<button
				className={`mr-[0.5rem] p-[1rem] subhead-bold-22 ${activeTab === '친구목록' ? 'text-white' : 'text-gray-03'}`}
				onClick={() => handleTabChange('친구목록')}
			>
				{'친구목록'}
			</button>

			<button
				className={`mr-[0.5rem] p-[1rem] subhead-bold-22 ${activeTab === '친구요청' ? 'text-white' : 'text-gray-03'}`}
				onClick={() => handleTabChange('친구요청')}
			>
				{'친구요청'}
			</button>

			{activeTab === '친구목록' ? (
				<FriendsList changeTabToFriendRequest={changTabToFriendRequest} />
			) : (
				<FriendsRequest isModalOpen={isModalOpen} />
			)}
		</div>
	);
});

ModalContentsFriends.displayName = 'ModalContentsFriends';

export default ModalContentsFriends;
