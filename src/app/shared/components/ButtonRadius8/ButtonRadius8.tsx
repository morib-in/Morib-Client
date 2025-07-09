import { ButtonHTMLAttributes } from 'react';

const commonStyles = 'flex flex-shrink-0 items-center justify-center rounded-[8px] subhead-semibold-20';

const paddingVariant = {
	md: 'px-[4rem] py-[1.4rem]',
	lg: 'px-[6.2rem] py-[2rem]',
};

const bgVariant = {
	active: 'bg-main-gra-01 hover:bg-main-gra-hover active:bg-main-gra-press',
	disabled: 'bg-gray-bg-05',
};

const textVariant = {
	active: 'text-gray-01',
	disabled: 'text-gray-04',
};

type ButtonRadius8Props = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRadius8Md = ({ ...props }: ButtonRadius8Props) => {
	const status = props.disabled ? 'disabled' : 'active';

	return (
		<button className={`${commonStyles} ${paddingVariant.md} ${bgVariant[status]} ${textVariant[status]}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius8Lg = ({ ...props }: ButtonRadius8Props) => {
	const status = props.disabled ? 'disabled' : 'active';

	return (
		<button className={`${commonStyles} ${paddingVariant.lg} ${bgVariant[status]} ${textVariant[status]}`} {...props}>
			{props.children}
		</button>
	);
};

export const ButtonRadius8 = {
	Md: ButtonRadius8Md,
	Lg: ButtonRadius8Lg,
};

export default ButtonRadius8;
