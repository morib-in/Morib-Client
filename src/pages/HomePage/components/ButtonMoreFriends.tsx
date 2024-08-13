import { ButtonHTMLAttributes } from 'react';

import ButtonMoreFriendIcon from '@/shared/assets/svgs/more_friend.svg?react';

interface ButtonMoreFriendsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	friendsCount: number;
}

const ButtonMoreFriends = ({ friendsCount, ...props }: ButtonMoreFriendsProps) => {
	return (
		<button className="relative mb-[2rem] h-[5.4rem] w-[5.4rem]" {...props}>
			<ButtonMoreFriendIcon className="rounded-full hover:bg-gray-bg-04" />
			<p className="subhead-med-18 absolute left-[1.4rem] top-[1.9rem] z-10 text-gray-04">+{friendsCount}</p>
		</button>
	);
};

export default ButtonMoreFriends;
