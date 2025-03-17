import { forwardRef, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useSSE } from '@/shared/apisV2/SSE/useSSE';
import { useSSEEvent } from '@/shared/apisV2/SSE/useSSEEvent';
import { friendKeys } from '@/shared/apisV2/friends/friends.keys';

import FriendsRequest from './FriendRequest/FriendsRequest';
import FriendsList from './FriendsList/FriendsList';

interface ModalContentsFriendsProps {
	isModalOpen: boolean;
}

const ModalContentsFriends = forwardRef<HTMLDivElement, ModalContentsFriendsProps>(({ isModalOpen }, ref) => {
	const [activeTab, setActiveTab] = useState<'친구목록' | '친구요청'>('친구목록');
	const queryClient = useQueryClient();

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

	// NOTE: SSE 연결
	useSSE();

	// NOTE: SSE 이벤트 구독
	const event = useSSEEvent();

	useEffect(() => {
		if (event) {
			switch (event.type) {
				case 'friendRequest':
					console.log('친구 요청 이벤트 수신', event.data);
					queryClient.invalidateQueries({ queryKey: friendKeys.friend });
					break;
				case 'friendRequestAccept':
					console.log('친구 요청 수락 이벤트 수신', event.data);
					queryClient.invalidateQueries({ queryKey: friendKeys.friend });
					break;
				default:
					break;
			}
		}
	}, [event]);

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
