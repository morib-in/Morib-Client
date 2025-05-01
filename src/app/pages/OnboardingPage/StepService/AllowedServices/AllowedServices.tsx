import { ButtonHTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactNode, useRef, useState } from 'react';

import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';
import ColorPalette from '@/shared/components/ColorPallete/ColorPallete';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { ColorPaletteType } from '@/shared/types/allowedService';
import { AllowedSiteType } from '@/shared/types/allowedSites';
import { HomeLargeBtnVariant } from '@/shared/types/global';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

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

const AllowedServiceHeader = ({ children }: AllowedServiceHeaderProps) => {
	return <div className="flex items-center">{children}</div>;
};

interface AllowedServiceHeaderColorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	selectedColor: ColorPaletteType;
	onSelectColor: (hashColor: ColorPaletteType) => void;
}

const AllowedServiceHeaderColorButton = ({
	selectedColor,
	onSelectColor,
	...props
}: AllowedServiceHeaderColorButtonProps) => {
	const [isPaletteOpen, setIsPaletteOpen] = useState(false);
	const paletteRef = useRef<HTMLDivElement>(null);

	const handleTogglePalette = () => {
		setIsPaletteOpen((prev) => !prev);
	};

	const handleClosePalette = () => {
		setIsPaletteOpen(false);
	};

	const handleColorButtonClick = (hashColor: ColorPaletteType) => {
		onSelectColor(hashColor);
	};

	useClickOutside(paletteRef, handleClosePalette);

	return (
		<div ref={paletteRef} className="relative flex h-full items-center">
			<button onClick={handleTogglePalette} {...props}>
				<div className={`h-[2.2rem] w-[2.2rem] rounded-full ${COLOR_PALETTE_MAP[selectedColor]}`} />
			</button>
			<ColorPalette isOpen={isPaletteOpen} className={'top-[3.6rem]'}>
				{Object.keys(COLOR_PALETTE_MAP).map((hashColor) => {
					return (
						<ColorPalette.ColorButton
							key={hashColor}
							onClick={() => {
								handleColorButtonClick(hashColor as ColorPaletteType);
							}}
							hashColor={hashColor as ColorPaletteType}
							isSelected={selectedColor === hashColor}
						/>
					);
				})}
			</ColorPalette>
		</div>
	);
};

interface AllowedServiceHeaderInput extends InputHTMLAttributes<HTMLInputElement> {
	onInitCategoryNameInput: () => void;
}

const AllowedServiceHeaderInput = ({ onInitCategoryNameInput, ...props }: AllowedServiceHeaderInput) => {
	const [isEditing, setIsEditing] = useState(false);
	const divRef = useRef(null);

	const handleEnableEditing = () => {
		setIsEditing(true);
	};

	const handleDisableEditing = () => {
		if (typeof props.value === 'string' && props.value.length === 0) {
			onInitCategoryNameInput();
		}

		setIsEditing(false);
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleDisableEditing();
		}
	};

	useClickOutside(divRef, handleDisableEditing);

	return (
		<div ref={divRef} className="flex w-full items-center">
			{isEditing ? (
				<input
					{...props}
					onKeyPress={handleKeydown}
					autoFocus
					className={`placeholder-text-gray-03 ml-[1rem] max-w-[calc(36.4rem-4.7rem-3.2rem)] bg-transparent text-white head-bold-24 focus:outline-none`}
				/>
			) : (
				<>
					<h1
						onClick={handleEnableEditing}
						className="ml-[1rem] max-w-[calc(36.4rem-4.7rem-3.2rem)] truncate bg-transparent text-white head-bold-24"
					>
						{props.value}
					</h1>
					<button type="button" onClick={handleEnableEditing} className="ml-[1.7rem]">
						<PencilIcon />
					</button>
				</>
			)}
		</div>
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
	HeaderInput: AllowedServiceHeaderInput,
	HeaderColorButton: AllowedServiceHeaderColorButton,
	List: AllowedServiceList,
	Item: AllowedServiceItem,
	BottomButton: AllowedServiceBottomButton,
});

export default AllowedService;
