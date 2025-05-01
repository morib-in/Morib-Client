import { useState } from 'react';

import LogoIcon from '@/shared/assets/svgs/logo_icon.svg?react';

interface FaviconImageProps {
	src: string;
	className?: string;
	size?: string;
	alt?: string;
}

export const FaviconImage = ({ src, className = '', size = '2rem', alt = 'favicon' }: FaviconImageProps) => {
	const [imgError, setImgError] = useState(false);

	const handleImageError = () => {
		setImgError(true);
	};

	const defaultStyle = `h-[${size}] w-[${size}] ${className}`;

	if (!src || imgError) {
		return <LogoIcon className={defaultStyle} />;
	}

	return <img src={src} alt={alt} className={defaultStyle} onError={handleImageError} />;
};

export default FaviconImage;
