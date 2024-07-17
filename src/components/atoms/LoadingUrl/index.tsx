import LogoIcon from '@/assets/svgs/logo_icon.svg?react';

const LoadingUrl = () => {
	return (
		<td className="flex items-center">
			<div className={`my-[0.1rem] flex h-[2.2rem] items-center`}>
				<LogoIcon className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]" />
				<div className={`body-reg-16 my-[0.05rem] w-[18.8rem] truncate text-white`}>Loading . . .</div>
			</div>
		</td>
	);
};

export default LoadingUrl;
