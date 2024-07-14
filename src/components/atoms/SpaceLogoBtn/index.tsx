import { ButtonHTMLAttributes, ReactElement } from 'react';

import IconBar from '@/assets/svgs/icon_bar.svg?react';

interface SpaceLogoBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactElement<SVGAElement>;
}

const SpaceLogoBtn = ({ children }: SpaceLogoBtnProps) => {
	return (
		<button type="button" className="flex w-[7.4rem] items-center gap-[1rem]">
			<IconBar />
			{children}
		</button>
	);
};

export default SpaceLogoBtn;
