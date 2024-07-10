import ClockIcon from '@/assets/svgs/icon_clock.svg?react';

interface UserFriendDataProps {
	image: string;
	name: string;
	categoryname: string;
}

const FriendInfo = ({ image, name, categoryname }: UserFriendDataProps) => {
	return (
		<div className="flex h-[13.8rem] w-[8.2rem] flex-col items-center justify-center">
			<img src={image} alt="유저 프로필" className="h-[7.4rem] w-[7.4rem]" />
			<div className="flex items-center justify-center">
				<ClockIcon />
				<span className="detail-reg-14 text-mint-01" />
			</div>
			<span className="detail-semibold-14 text-white">{name}</span>
			<span className="detail-reg-12 text-gray-04">{categoryname}</span>
		</div>
	);
};

export default FriendInfo;
