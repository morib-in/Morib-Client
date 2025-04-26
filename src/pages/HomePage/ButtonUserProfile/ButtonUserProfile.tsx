import { ButtonHTMLAttributes } from 'react';

import ConnectionIcon from '@/shared/assets/svgs/connection_icon.svg?react';
import defaultPorfileIcon from '@/shared/assets/svgs/default_profile.svg';
import GradientCircleIcon from '@/shared/assets/svgs/gradient_circle.svg?react';

interface ButtonUserProfile extends ButtonHTMLAttributes<HTMLButtonElement> {
	isMyProfile?: boolean;
	isConnecting?: boolean;
	isSelectedUser?: boolean;
	isOnline?: boolean;
	imageUrl?: string;
}

const ButtonUserProfile = ({
	isMyProfile = false,
	isSelectedUser = false,
	isOnline = false,
	imageUrl,
}: ButtonUserProfile) => {
	const profileImage = imageUrl || defaultPorfileIcon;

	return (
		<button className="flex h-[8.2rem] w-[6rem] flex-col items-center">
			<div className="flex flex-col">
				<div className="relative h-[5rem] w-[5rem] 2xl:h-[6rem] 2xl:w-[6rem]">
					{(isMyProfile || isSelectedUser) && (
						<GradientCircleIcon className="h-[5rem] w-[5rem] 2xl:h-[6rem] 2xl:w-[6rem]" />
					)}
					<img
						className={`absolute left-0 top-0 h-[5rem] w-[5rem] rounded-full border-[0.4rem] ${isMyProfile ? 'border-mint-01' : 'border-transparent'} object-cover 2xl:h-[6rem] 2xl:w-[6rem]`}
						src={profileImage}
						alt="프로필 이미지"
					/>
					{isOnline && (
						<ConnectionIcon className="absolute bottom-[0.45rem] left-[3.6rem] rounded-full border-[0.2rem] border-gray-bg-01 2xl:bottom-[0.5rem] 2xl:left-[4.3rem]" />
					)}
				</div>
			</div>
			{isMyProfile && <h3 className="mt-[0.2rem] max-w-full truncate text-mint-01 detail-semibold-14">나</h3>}
		</button>
	);
};

export default ButtonUserProfile;
