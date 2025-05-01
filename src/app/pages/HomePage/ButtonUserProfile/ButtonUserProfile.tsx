import { ButtonHTMLAttributes } from 'react';

import ConnectionIcon from '@/shared/assets/svgs/connection_icon.svg?react';
import defaultPorfileIcon from '@/shared/assets/svgs/default_profile.svg';
import GradientCircleIcon from '@/shared/assets/svgs/gradient_circle.svg?react';

interface ButtonUserProfile extends ButtonHTMLAttributes<HTMLButtonElement> {
	isMyProfile?: boolean;
	userName?: string;
	isConnecting?: boolean;
	isSelectedUser?: boolean;
}

const ButtonUserProfile = ({
	isMyProfile = false,
	userName = '나',
	isConnecting = false,
	isSelectedUser = false,
}: ButtonUserProfile) => {
	return (
		<button className="flex h-[8.2rem] w-[6rem] flex-col items-center">
			<div className="flex flex-col">
				<div className="relative h-[5rem] w-[5rem] 2xl:h-[6rem] 2xl:w-[6rem]">
					{(isMyProfile || isSelectedUser) && (
						<GradientCircleIcon className="h-[5rem] w-[5rem] 2xl:h-[6rem] 2xl:w-[6rem]" />
					)}
					<img className="absolute left-0 top-0" src={defaultPorfileIcon} alt="친구 캐러셀 이미지" />
					{(isMyProfile || isConnecting) && (
						<ConnectionIcon className="absolute bottom-[0.45rem] left-[3.6rem] rounded-full border-[0.2rem] border-gray-bg-01 2xl:bottom-[0.5rem] 2xl:left-[4.3rem]" />
					)}
				</div>
			</div>
			{(isMyProfile || isSelectedUser) && (
				<h3 className="mt-[0.2rem] max-w-full truncate text-mint-01 detail-semibold-14">{userName}</h3>
			)}
		</button>
	);
};

export default ButtonUserProfile;
