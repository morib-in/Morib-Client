import { ButtonHTMLAttributes } from 'react';

import ButtonMoreFriendIcon from '@/assets/svgs/more_friend.svg?react';

import SVGBtn from '../SVGBtn';

interface MoreFriendsBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	friendsCount: number;
}

const MoreFriendsBtn = ({ friendsCount }: MoreFriendsBtnProps) => {
	return (
		<div className="relative mb-[2rem] h-[5.4rem] w-[5.4rem]">
			<SVGBtn>
				<ButtonMoreFriendIcon />
			</SVGBtn>
			<p className="subhead-med-18 absolute left-[1.4rem] top-[1.9rem] text-gray-04">+{friendsCount}</p>
		</div>
	);
};

export default MoreFriendsBtn;
