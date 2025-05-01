import { ImgHTMLAttributes } from 'react';

import LogoPath from '@/shared/assets/svgs/logo_icon.svg';

export const FaviconImage = ({ src, className = '', alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
	return (
		<img
			{...rest}
			src={src}
			className={`h-[2rem] w-[2rem] ${className}`}
			alt={alt}
			onError={(e) => {
				e.currentTarget.src = LogoPath;
				e.currentTarget.alt = '모립 로고 아이콘';
			}}
		/>
	);
};

export default FaviconImage;
