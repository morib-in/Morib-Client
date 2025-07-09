import { HtmlHTMLAttributes, ReactNode } from 'react';

import type { FriendRequestListItemType } from '@/shared/types/friend';

import FriendUserProfile from '../../FriendUserProfile/FriendUserProfile';

interface FriendsListRequestedRootProps extends HtmlHTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const FriendsListRequestedRoot = ({ children, ...props }: FriendsListRequestedRootProps) => {
	return (
		<div
			className={`flex h-full w-full flex-col items-center justify-end gap-[1rem] px-[1rem] ${props.className}`}
			{...props}
		>
			{children}
		</div>
	);
};

interface FriendListRequestedItemProp extends FriendRequestListItemType {
	children: ReactNode;
}

const FriendsListRequestedItem = ({ children, ...props }: FriendListRequestedItemProp) => {
	return (
		<li key={props.id} className="flex w-full border-t-[1px] border-gray-bg-06 px-[1rem] py-[2rem]">
			<div className="flex w-[40rem]">
				<FriendUserProfile imgSrc={props.imageUrl} />
				<div className="ml-[2rem] flex flex-col justify-center">
					<p className="text-white subhead-bold-20">{props.name}</p>
					<p className="text-gray-04 body-reg-16">{props.email}</p>
				</div>
			</div>
			<div className="flex w-full items-center justify-end gap-x-[1rem]">{children}</div>
		</li>
	);
};

interface FriendsListRequestedEmptyStateProps {
	children: ReactNode;
}

const FriendsListRequestedEmptyState = ({ children }: FriendsListRequestedEmptyStateProps) => {
	return <div className="h-full w-full pt-[4rem] text-center text-gray-05 subhead-med-18">{children}</div>;
};

const FriendsListRequested = Object.assign(FriendsListRequestedRoot, {
	Item: FriendsListRequestedItem,
	EmptyState: FriendsListRequestedEmptyState,
});

export default FriendsListRequested;
