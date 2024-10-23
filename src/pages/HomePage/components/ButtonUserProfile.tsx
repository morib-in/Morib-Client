import { ButtonHTMLAttributes } from 'react';

const cdnUrl = `${import.meta.env.VITE_IMAGE_CDN_URL}`;

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
				<div className="relative h-[6rem] w-[6rem]">
					{(isMyProfile || isSelectedUser) && <img src={`${cdnUrl}gradient_circle.svg`} />}
					<img className="absolute left-0 top-0" src={`${cdnUrl}default_profile.svg`} alt="친구 캐러셀 이미지" />
					{(isMyProfile || isConnecting) && (
						<img
							src={`${cdnUrl}connection_icon.svg`}
							className="absolute bottom-[0.5rem] left-[4.3rem] rounded-full border-[0.2rem] border-gray-bg-01"
						/>
					)}
				</div>
			</div>
			{(isMyProfile || isSelectedUser) && (
				<h3 className="detail-semibold-14 mt-[0.2rem] max-w-full truncate text-mint-01">{userName}</h3>
			)}
		</button>
	);
};

export default ButtonUserProfile;
