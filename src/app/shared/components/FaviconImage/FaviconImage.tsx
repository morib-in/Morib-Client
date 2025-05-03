import { ImgHTMLAttributes } from 'react';

import LogoPath from '@/shared/assets/svgs/logo_icon.svg';

export const FaviconImage = ({ src, className, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
	return (
		<img
			{...rest}
			src={src || LogoPath}
			className={`h-[2rem] w-[2rem] ${className}`}
			onError={(e) => {
				e.currentTarget.src = LogoPath;
				e.currentTarget.alt = '모립 로고 아이콘';
			}}
		/>
	);
};

export default FaviconImage;
