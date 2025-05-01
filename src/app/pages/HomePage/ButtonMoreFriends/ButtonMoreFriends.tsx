import { ButtonHTMLAttributes } from 'react';

import ButtonMoreFriendIcon from '@/shared/assets/svgs/more_friend.svg?react';

interface ButtonMoreFriendsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	friendsCount: number;
}

const ButtonMoreFriends = ({ friendsCount, ...props }: ButtonMoreFriendsProps) => {
	return (
		<button className="relative mb-[2rem] h-[5.4rem]" {...props}>
			<ButtonMoreFriendIcon className="absolute top-0 h-[5rem] w-[5rem] rounded-full hover:bg-gray-bg-04 2xl:h-[6rem] 2xl:w-[6rem]" />
			<p className="absolute left-[1.2rem] top-[1.7rem] z-10 text-gray-04 body-med-16 2xl:left-[1.4rem] 2xl:top-[2.1rem] 2xl:subhead-med-18">
				+{friendsCount}
			</p>
		</button>
	);
};

export default ButtonMoreFriends;
