import { ButtonHTMLAttributes, ReactNode } from 'react';

interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'positive' | 'negative';
	children: ReactNode;
}

const ButtonRequestAction = ({ variant, children, ...props }: CategoryBtnProps) => {
	const btnVariant = {
		positive: 'text-gray-bg-01 bg-mint-02 hover:bg-mint-02-hover active:bg-mint-02-press',
		negative: 'text-white bg-gray-bg-06 hover:bg-gray-bg-04 active:bg-gray-bg-05',
	};

	const commonStyle = ' px-[2.2rem] py-[1rem] rounded-[5px] subhead-semibold-18 ';

	const styledBtn = variant ? btnVariant[variant] : '';

	return (
		<button className={`${styledBtn} ${commonStyle} flex-grow-0`} {...props}>
			{children}
		</button>
	);
};

export default ButtonRequestAction;
