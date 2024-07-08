import { ButtonHTMLAttributes, ReactNode } from 'react';

interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: '취소' | '완료';
	children: ReactNode;
}

const CategoryCommonBtn = ({ disabled, variant, children, ...props }: CategoryBtnProps) => {
	const btnVariant = {
		취소: 'text-white bg-gray-bg-06',
		완료: 'text-gray-bg-01 bg-mint-02',
	};
	const disabledBtn = 'bg-gray-bg-05 text-gray-04';

	const commonStyle = ' px-[4.8rem] py-[1rem] rounded-[5px] subhead-semibold-18';

	const styledBtn = disabled ? disabledBtn : variant ? btnVariant[variant] : '';

	return (
		<button className={`${styledBtn} ${commonStyle}`} disabled={disabled} {...props}>
			{children}
		</button>
	);
};

export default CategoryCommonBtn;
