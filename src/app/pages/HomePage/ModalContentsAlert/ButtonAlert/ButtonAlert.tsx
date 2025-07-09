import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonAlertProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'danger' | 'mint';
	children: ReactNode;
	className?: string;
}

const ButtonAlert = ({ children, variant = 'primary', className = '', ...props }: ButtonAlertProps) => {
	const primaryStyle = 'bg-gray-bg-06 hover:bg-gray-bg-04 text-white active:bg-gray-bg-05';
	const dangerStyle = 'bg-error-01 hover:bg-error-03 active:bg-error-03 text-white active:text-gray-04';
	const mintStyle = 'bg-mint-02 hover:bg-mint-01 active:bg-mint-03 text-black active:text-gray-01';

	const buttonStyle = variant === 'primary' ? primaryStyle : variant === 'danger' ? dangerStyle : mintStyle;

	return (
		<button
			{...props}
			className={`w-full rounded-[5px] px-[4.8rem] py-[1rem] text-center subhead-semibold-18 ${buttonStyle} ${className}`}
		>
			{children}
		</button>
	);
};

export default ButtonAlert;
