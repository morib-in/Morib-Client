import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { isEmailValid } from '@/shared/utils/validation';

import {
	useDeleteCancelFriendRequest,
	usePostAcceptFriendRequest,
	usePostRejectFriendRequest,
	usePostSendFriendRequest,
} from '@/shared/apisV2/friends/friends.mutations';
import { useGetFriendRequestList } from '@/shared/apisV2/friends/friends.queries';

import TextField from '../../TextField/TextField';
import ButtonRequestAction from './ButtonRequestAction/ButtonRequestAction';
import FriendsListRequested from './FriendsListRequested/FriendsListRequested';

interface FriendsRequestProps {
	isModalOpen: boolean;
}

const FriendsRequest = ({ isModalOpen }: FriendsRequestProps) => {
	const [emailInput, setEmailInput] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleSendFriendRequest = () => {
		sendFriendRequest(
			{ friendEmail: emailInput },
			{
				onSuccess: () => {
					resetEmailInput();
					setSuccessMessage(`${emailInput}님에게 친구 요청을 보냈어요.`);
				},
			},
		);
	};

	const { data: friendRequestList } = useGetFriendRequestList();
	const { mutate: acceptFriendRequest } = usePostAcceptFriendRequest();
	const { mutate: cancelFriendRequest } = useDeleteCancelFriendRequest();
	const { mutate: rejectFriendRequest } = usePostRejectFriendRequest();
	const { mutate: sendFriendRequest, reset: resetSendFriendRequest, isError, error } = usePostSendFriendRequest();

	const handleKeyDownTitleInput = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			handleSendFriendRequest();
		}
	};

	const handleChangeUrlInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (isError) {
			resetSendFriendRequest();
		}

		if (successMessage.length > 0) {
			setSuccessMessage('');
		}

		setEmailInput(e.target.value);
	};

	const resetEmailInput = () => {
		resetSendFriendRequest();
		setEmailInput('');
		setSuccessMessage('');
	};

	useEffect(() => {
		if (!isModalOpen) {
			resetEmailInput();
		}
	}, [isModalOpen]);

	return (
		<div>
			<div className="relative mb-[4rem] mt-[2rem]">
				<TextField
					value={emailInput}
					onKeyDown={handleKeyDownTitleInput}
					onChange={handleChangeUrlInput}
					isError={(emailInput.length > 0 && !isEmailValid(emailInput)) || isError}
					errorMessage={isError ? error.response?.data.message : '이메일을 확인해 주세요.'}
					isSuccess={successMessage.length > 0}
					successMessage={successMessage}
					placeholder="이메일을 입력해 주세요."
				>
					<TextField.ClearButton onClick={resetEmailInput} />
					<TextField.ConfirmButton onClick={handleSendFriendRequest} disabled={emailInput.length === 0}>
						친구 요청 보내기
					</TextField.ConfirmButton>
				</TextField>
			</div>
			<div className="h-full">
				<h2
					className={`px-[1rem] py-[2rem] text-white subhead-bold-22 ${friendRequestList?.data.receive.length === 0 && 'border-b-[1px] border-gray-bg-06'}`}
				>
					받은 요청
				</h2>
				<FriendsListRequested>
					{friendRequestList?.data.receive.length === 0 ? (
						<FriendsListRequested.EmptyState>받은 요청이 없습니다</FriendsListRequested.EmptyState>
					) : (
						friendRequestList?.data.receive.map((friendRequest) => (
							<FriendsListRequested.Item key={friendRequest.id} {...friendRequest}>
								<>
									<ButtonRequestAction
										onClick={() => acceptFriendRequest({ friendId: friendRequest.id })}
										variant="positive"
									>
										수락
									</ButtonRequestAction>
									<ButtonRequestAction
										onClick={() => rejectFriendRequest({ friendId: friendRequest.id })}
										variant="negative"
									>
										거절
									</ButtonRequestAction>
								</>
							</FriendsListRequested.Item>
						))
					)}
				</FriendsListRequested>

				<h2
					className={`mt-[4rem] px-[1rem] py-[2rem] text-white subhead-bold-22 ${friendRequestList?.data.send.length === 0 && 'border-b-[1px] border-gray-bg-06'}`}
				>
					보낸 요청
				</h2>
				<FriendsListRequested>
					{friendRequestList?.data.send.length === 0 ? (
						<FriendsListRequested.EmptyState>보낸 요청이 없습니다</FriendsListRequested.EmptyState>
					) : (
						friendRequestList?.data.send.map((friendRequest) => (
							<FriendsListRequested.Item key={friendRequest.id} {...friendRequest}>
								<ButtonRequestAction
									onClick={() => cancelFriendRequest({ friendId: friendRequest.id })}
									variant="negative"
								>
									요청 취소
								</ButtonRequestAction>
							</FriendsListRequested.Item>
						))
					)}
				</FriendsListRequested>
			</div>
		</div>
	);
};

export default FriendsRequest;
