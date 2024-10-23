import { ReactNode } from 'react';

import LoginBackground from '@/shared/assets/images/login_background.png';

interface LoginPageWrapperProps {
	children: ReactNode;
}

const LoginPageWrapper = ({ children }: LoginPageWrapperProps) => {
	return (
		<div
			className={`h-[1080px] w-[1920px] pl-[64.5rem] pt-[36.1rem]`}
			style={{
				backgroundImage: `url(${import.meta.env.VITE_IMAGE_CDN_URL}login_background.png)`,
				backgroundSize: 'cover',
			}}
		>
			{children}
		</div>
	);
};

export default LoginPageWrapper;
