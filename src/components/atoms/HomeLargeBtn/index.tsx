import { ButtonHTMLAttributes, ReactNode } from 'react';

import { HomeLargeBtnVariant } from '@/shared/types/global';

interface HomeLargeBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: HomeLargeBtnVariant;
	children: ReactNode;
}

const btnVariant = {
	middle: 'px-[4rem] py-[1.4rem] ',
	large: 'px-[6.2rem] py-[2rem] ',
};

const HomeLargeBtn = ({ variant, disabled = false, children, ...props }: HomeLargeBtn) => {
	const defaultStyle = 'subhead-bold-20 flex items-center justify-center rounded-[0.8rem] flex-shrink-0 ';
	const buttonStyle = disabled
		? 'bg-gray-bg-05 text-gray-04 '
		: 'bg-main-gra-01 text-gray-01 hover:bg-main-gra-hover active:bg-main-gra-press ';

	return (
		<button className={defaultStyle + btnVariant[variant] + buttonStyle} disabled={disabled} {...props}>
			{children}
		</button>
	);
};

export default HomeLargeBtn;
