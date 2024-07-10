import { ButtonHTMLAttributes, ReactElement } from 'react';

interface SVGBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactElement<SVGElement>;
}

const SVGBtn = ({ children, ...props }: SVGBtnProps) => {
	return (
		<button type="button" {...props}>
			{children}
		</button>
	);
};

export default SVGBtn;
