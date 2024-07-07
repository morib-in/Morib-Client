import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: '취소' | '완료';
	isDisabled?: boolean;
	children?: ReactNode;
}

const CategoryCommonBtn = ({ variant, isDisabled, ...props }: CategoryBtnProps) => {
	const btnVariant = {
		취소: 'text-white bg-gray-bg-06',
		완료: 'text-gray-bg-01 bg-mint-02',
	};
	const disabledBtn = 'bg-gray-bg-05 text-gray-04';

	const commonStyle = ' px-[4.8rem] py-[1rem] rounded-[5px] subhead-semibold-18';

	const styledBtn = variant === '취소' ? btnVariant.취소 : isDisabled ? disabledBtn : btnVariant.완료;

	return (
		<>
			<button className={styledBtn + commonStyle} disabled={isDisabled} {...props}>
				{variant}
			</button>
		</>
	);
};

export default CategoryCommonBtn;
