import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

interface ColorPaletteRootProps {
	isOpen: boolean;
	className?: string;
	children: ReactNode;
}

const ColorPaletteRoot = forwardRef<HTMLDivElement, ColorPaletteRootProps>(function ColorPaletteRoot(
	{ isOpen, className, children },
	ref,
) {
	if (!isOpen) return null;

	return (
		<div
			ref={ref}
			className={`absolute left-0 z-50 grid h-[11.6rem] w-[32rem] grid-cols-6 grid-rows-2 gap-x-[2rem] gap-y-[1.2rem] rounded-[8px] bg-gray-bg-04 px-[2rem] py-[2.2rem] ${className}`}
		>
			{children}
		</div>
	);
});

interface ColorPaletteColorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	hashColor: keyof typeof COLOR_PALETTE_MAP;
	isSelected?: boolean;
}

const ColorPaletteColorButton = ({ hashColor, isSelected, ...props }: ColorPaletteColorButtonProps) => {
	return (
		<button
			{...props}
			className={`h-[3rem] w-[3rem] flex-shrink-0 rounded-full ${isSelected && 'border-[2px] border-white'} ${COLOR_PALETTE_MAP[hashColor]}`}
		/>
	);
};

const ColorPalette = Object.assign(ColorPaletteRoot, { ColorButton: ColorPaletteColorButton });

export default ColorPalette;
