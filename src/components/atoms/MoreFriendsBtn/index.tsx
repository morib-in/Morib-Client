import { ButtonHTMLAttributes } from 'react';

import ButtonMoreFriendIcon from '@/assets/svgs/more_friend.svg?react';

interface MoreFriendsBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	friendsCount: number;
}

const MoreFriendsBtn = ({ friendsCount, ...props }: MoreFriendsBtnProps) => {
	return (
		<button className="relative mb-[2rem] h-[5.4rem] w-[5.4rem]" {...props}>
			<ButtonMoreFriendIcon className="rounded-full hover:bg-gray-bg-04" />
			<p className="subhead-med-18 absolute left-[1.4rem] top-[1.9rem] z-10 text-gray-04">+{friendsCount}</p>
		</button>
	);
};

export default MoreFriendsBtn;
