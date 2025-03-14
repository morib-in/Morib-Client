import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';
import Spacer from '@/shared/components/Spacer/Spacer';

import { AllowedSiteType } from '@/shared/types/allowedSites';
import { HomeLargeBtnVariant } from '@/shared/types/global';

import ColorIcon from '@/shared/assets/svgs/ic_color.svg?react';
import MinusIcon from '@/shared/assets/svgs/ic_minus.svg?react';
import PencilIcon from '@/shared/assets/svgs/ic_pencil.svg?react';

interface AllowedServicesRootProps {
	children: ReactNode;
}

const AllowedServicesRoot = ({ children }: AllowedServicesRootProps) => {
	return (
		<Spacer.Height className="flex flex-shrink-0">
			<div className="grid w-full grid-rows-[auto,1fr,auto] rounded-[18px] bg-gray-bg-03 p-[2.8rem]">{children}</div>
		</Spacer.Height>
	);
};

interface AllowedServiceHeaderProps {
	children: ReactNode;
}

const AllowedServiceHeader = () => {
	return (
		<div className="flex items-center">
			<button>
				<ColorIcon />
			</button>
			<h2 className="ml-[1rem] text-white head-bold-24">허용서비스 리스트 1</h2>
			<button className="ml-[1.7rem]">
				<PencilIcon />
			</button>
		</div>
	);
};

const AllowedServiceHeaderColorButton = () => {
	return (
		<button>
			<ColorIcon />
		</button>
	);
};

interface AllowedServiceHeaderInput extends InputHTMLAttributes<HTMLInputElement> {
	onChangeEditing: (status: boolean) => void;
	isEditing: boolean;
}

const AllowedServiceHeaderInput = ({ isEditing, onChangeEditing, ...props }: AllowedServiceHeaderInput) => {
	const handleEnableEditing = () => {
		onChangeEditing(true);
	};

	const handleDisableEditing = () => {
		onChangeEditing(false);
	};

	return (
		<>
			{isEditing ? (
				<input
					{...props}
					className="placeholder-text-gray-03 ml-[1rem] w-full bg-transparent text-white head-bold-24 focus:outline-none"
				/>
			) : (
				<h1 onDoubleClick={handleEnableEditing} className="ml-[1rem] w-full bg-transparent text-white head-bold-24">
					허용서비스 리스트 1
				</h1>
			)}
		</>
	);
};

interface AllowedServiceListProps {
	children: ReactNode;
}

const AllowedServiceList = ({ children }: AllowedServiceListProps) => {
	return <ul className="mt-[2rem] overflow-auto">{children}</ul>;
};

interface AllowedServiceItemProps extends AllowedSiteType {
	onClick: (url: string) => void;
}

const AllowedServiceItem = ({ onClick, ...props }: AllowedServiceItemProps) => {
	return (
		<li className="flex h-[5.3rem] w-full min-w-0 items-center border-b border-b-gray-bg-04 py-[1.2rem]">
			<span className="flex w-[12rem] gap-[1.2rem]">
				<img src={props.favicon} alt={`${props.siteName} 아이콘`} className="h-[2rem] w-[2rem] flex-shrink-0" />
				<h3 className="w-[6rem] flex-shrink-0 truncate p-0 text-white body-med-16">{props.siteName}</h3>
			</span>
			<div className="ml-[1rem] h-[3.1rem] w-[20.4rem] flex-shrink-0 truncate rounded-[20px] bg-gray-bg-04 px-[1rem] py-[0.6rem] text-gray-04 body-reg-16">
				{props.siteUrl}
			</div>
			<button
				onClick={() => {
					onClick(props.siteUrl);
				}}
				className="flex-shrink-0"
			>
				<MinusIcon className="fill-gray-bg-06 hover:fill-error-01 active:fill-error-03" />
			</button>
		</li>
	);
};

const AllowedServiceBottomButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<HomeLargeBtn variant={HomeLargeBtnVariant.MIDDLE} className="mt-[2rem]" {...props}>
			{props.children}
		</HomeLargeBtn>
	);
};

const AllowedService = Object.assign(AllowedServicesRoot, {
	Header: AllowedServiceHeader,
	List: AllowedServiceList,
	Item: AllowedServiceItem,
	BottomButton: AllowedServiceBottomButton,
});

export default AllowedService;
