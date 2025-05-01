import React, { useRef, useState } from 'react';

import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';
import ButtonStatusToggle from '@/shared/components/ButtonStatusToggle/ButtonStatusToggle';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';

import { reloginWithoutLogout } from '@/shared/utils/auth';

import { UserProfileType } from '@/shared/types/profile';

import ArrowRightIcon from '@/shared/assets/svgs/arrow_right.svg?react';
import MailIcon from '@/shared/assets/svgs/mail.svg?react';

import ModalContentsAlert from '@/pages/HomePage/ModalContentsAlert/ModalContentsAlert';
import { useDeleteAccount, usePutChangeProfile } from '@/shared/apisV2/setting/setting.mutations';

type AccountContentProps = UserProfileType;

const AccountContent = ({ ...props }: AccountContentProps) => {
	const logoutModalRef = useRef<ModalWrapperRef>(null);
	const deleteAccountModalRef = useRef<ModalWrapperRef>(null);
	const { mutate: changeProfile } = usePutChangeProfile();
	const { mutate: deleteAccount } = useDeleteAccount();

	const [isToggleOn, setIsToggleOn] = useState(props.isPushEnabled);
	const [userName, setUserName] = useState(props.name);

	const handleToggle = () => setIsToggleOn((prev) => !prev);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const handleSaveChanges = () => {
		changeProfile({ name: userName, imageUrl: props.imageUrl, isPushEnabled: isToggleOn });
	};

	const handleCloseLogoutModal = () => {
		logoutModalRef.current?.close();
	};

	const handleCloseDeleteAccountModal = () => {
		deleteAccountModalRef.current?.close();
	};

	const handleOpenLogoutModal = () => {
		logoutModalRef.current?.open();
	};

	const handleOpenDeleteAccountModal = () => {
		deleteAccountModalRef.current?.open();
	};

	const handleDeleteAccount = () => {
		deleteAccount(undefined, { onSuccess: reloginWithoutLogout });
	};

	return (
		<>
			<p className="w-full border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">내 프로필</p>
			<div className="flex w-full gap-[2rem] py-[2rem]">
				<img src={props.imageUrl} className="h-[7.5rem] w-[7.5rem] rounded-full" />
				<div className="flex flex-col items-center gap-[0.5rem]">
					<input
						type="text"
						value={userName}
						onChange={handleNameChange}
						className="flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white subhead-med-18 focus:outline-none"
					/>
					<div className="flex w-[25rem] items-center gap-[0.5rem]">
						<MailIcon />
						<div className="text-gray-04 body-reg-16">{props.email}</div>
					</div>
				</div>
			</div>
			<p className="h-[6.1rem] w-full border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">
				내 알림
			</p>
			<div className="flex h-[9.2rem] w-full items-center justify-between py-[2rem]">
				<div className="flex flex-col gap-[0.5rem]">
					<p className="text-white subhead-semibold-18">데스크톱 푸시 알림</p>
					<p className="text-gray-04 body-reg-16">데스크톱 앱에서 작성의 푸시 알림을 즉시 받으세요.</p>
				</div>
				<ButtonStatusToggle isToggleOn={isToggleOn} onToggle={handleToggle} />
			</div>
			<p className="mt-[3rem] h-[6.1rem] w-full border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">
				지원
			</p>

			<div className="flex w-full items-center">
				<div className="flex h-[9.2rem] w-full flex-col gap-[0.5rem] py-[2rem]">
					<p className="text-white subhead-semibold-18">모든 기기에서 로그아웃</p>
					<p className="text-gray-04 body-reg-16">본 기기를 포함한 모든 기기에서 로그아웃합니다.</p>
				</div>
				<button type="button" onClick={handleOpenLogoutModal}>
					<ArrowRightIcon className="rounded-[1.6rem] hover:bg-gray-bg-05" />
				</button>
			</div>

			<div className="flex w-full items-center">
				<div className="flex h-[9.2rem] w-full flex-col gap-[0.5rem] py-[2rem]">
					<p className="text-error-01 subhead-semibold-18">내 계정 삭제</p>
					<p className="text-gray-04 body-reg-16">본 기기를 포함한 모든 기기에서 로그아웃합니다.</p>
				</div>
				<button type="button" onClick={handleOpenDeleteAccountModal}>
					<ArrowRightIcon className="rounded-[1.6rem] hover:bg-gray-bg-05" />
				</button>
			</div>

			<div className="flex h-[9.2rem] w-full justify-end pt-[4rem]">
				<ButtonRadius8.Md
					type="button"
					color="gray"
					disabled={userName === props.name && isToggleOn === props.isPushEnabled}
					onClick={handleSaveChanges}
				>
					변경사항 저장
				</ButtonRadius8.Md>
			</div>
			<ModalWrapper ref={logoutModalRef} backdrop>
				{(_) => (
					<ModalContentsAlert.Logout
						onConfirm={reloginWithoutLogout}
						onCloseModal={handleCloseLogoutModal}
						userEmail={props.email}
					/>
				)}
			</ModalWrapper>
			<ModalWrapper ref={deleteAccountModalRef} backdrop>
				{(_) => (
					<ModalContentsAlert.DeleteAccount
						onConfirm={handleDeleteAccount}
						onCloseModal={handleCloseDeleteAccountModal}
						userEmail={props.email}
					/>
				)}
			</ModalWrapper>
		</>
	);
};

export default AccountContent;
