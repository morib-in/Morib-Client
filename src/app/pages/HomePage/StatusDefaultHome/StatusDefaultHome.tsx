import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';

import { LARGE_BTN_TEXT } from '@/shared/constants/btnText';

import BoxIcon from '@/shared/assets/svgs/home/ic_box.svg?react';

interface StatusDefaultHomeProps {
	onClick?: () => void;
}

const StatusDefaultHome = ({ onClick }: StatusDefaultHomeProps) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<BoxIcon />
			<p className="mb-[5.2rem] mt-[2.4rem] text-center text-white title-bold-32">
				당신의 몰입을 도와줄
				<br />
				작업 카테고리를 만들어 보세요!
			</p>
			<ButtonRadius8.Lg onClick={onClick}>{LARGE_BTN_TEXT.CREATE_CATEGORY}</ButtonRadius8.Lg>
		</div>
	);
};

export default StatusDefaultHome;
