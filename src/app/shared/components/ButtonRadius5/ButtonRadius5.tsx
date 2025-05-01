import { ButtonHTMLAttributes } from 'react';

const commonStyles = 'flex flex-shrink-0 items-center justify-center rounded-[5px] subhead-semibold-18';

const paddingVariant = {
	xxs: 'px-[1.2rem] py-[0.7rem]',
	xs: 'p-[2rem]',
	sm: 'px-[2.2rem] py-[1.2rem]',
	md: 'px-[4.8rem] py-[1rem]',
	lg: 'px-[6.2rem] py-[2rem]',
	xl: 'px-[9.3rem] py-[1.55rem]',
};

const bgVariant = {
	active: {
		main: 'bg-main-gra-01 hover:bg-main-gra-hover active:bg-main-gra-press',
		gray: 'bg-gray-bg-06 hover:bg-gray-bg-04 active:bg-gray-bg-05',
		red: 'bg-error-01 hover:bg-error-03 active:bg-error-03',
	},

	disabled: 'bg-gray-bg-06 hover:bg-gray-bg-04 active:bg-gray-bg-05',
};

const textVariant = {
	active: { main: 'text-gray-01', gray: 'text-gray-05', red: 'text-white active:text-gray-04' },
	disabled: 'text-gray-04',
};

interface ButtonRadius5Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: 'main' | 'gray' | 'red';
}

const ButtonRadius5Xxs = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.xxs} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Xs = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.xs} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Sm = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.sm} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Md = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.md} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Lg = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.lg} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Xl = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${paddingVariant.xl} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

const ButtonRadius5Root = ({ color, className, ...props }: ButtonRadius5Props) => {
	const status = props.disabled ? 'disabled' : 'active';
	const isActive = status === 'active';
	const bgStyles = isActive ? bgVariant[status][color] : bgVariant[status];
	const textStyles = isActive ? textVariant[status][color] : textVariant[status];

	return (
		<button className={`${commonStyles} ${bgStyles} ${textStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

export const ButtonRadius5 = Object.assign(ButtonRadius5Root, {
	Xxs: ButtonRadius5Xxs,
	Xs: ButtonRadius5Xs,
	Sm: ButtonRadius5Sm,
	Md: ButtonRadius5Md,
	Lg: ButtonRadius5Lg,
	Xl: ButtonRadius5Xl,
});

export default ButtonRadius5;
