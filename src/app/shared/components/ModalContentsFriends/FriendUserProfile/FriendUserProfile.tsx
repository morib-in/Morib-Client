import { ButtonHTMLAttributes } from 'react';

import ConnectionIcon from '@/shared/assets/svgs/connection_icon.svg?react';
import defaultPorfileIcon from '@/shared/assets/svgs/default_profile.svg';

interface FriendUserProfile extends ButtonHTMLAttributes<HTMLButtonElement> {
	isConnecting?: boolean;
	isSelectedUser?: boolean;
	imgSrc: string;
}

const FriendUserProfile = ({ imgSrc, isConnecting = false }: FriendUserProfile) => {
	return (
		<div className="flex w-[6rem] flex-col items-center rounded-full">
			<div className="relative h-[6rem] w-[6rem]">
				<img
					className="absolute left-0 top-0 rounded-full"
					src={imgSrc || defaultPorfileIcon}
					alt="친구 캐러셀 이미지"
				/>
				{isConnecting && (
					<ConnectionIcon className="absolute bottom-[0.5rem] left-[4.3rem] rounded-full border-[0.2rem] border-gray-bg-01" />
				)}
			</div>
		</div>
	);
};

export default FriendUserProfile;
