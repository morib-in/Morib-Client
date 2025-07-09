import { ImgHTMLAttributes } from 'react';

import DefaultFaviconImage from '@/shared/assets/svgs/default_url_favicon.svg';

export const FaviconImage = ({ src, className, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
	return (
		<img
			{...rest}
			src={src || DefaultFaviconImage}
			className={`h-[2rem] w-[2rem] ${className}`}
			onError={(e) => {
				e.currentTarget.src = DefaultFaviconImage;
				e.currentTarget.alt = '모립 로고 아이콘';
			}}
		/>
	);
};

export default FaviconImage;
