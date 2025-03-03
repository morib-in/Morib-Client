import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import ErrorIcon from '@/shared/assets/svgs/error.svg?react';

interface ErrorProps {
	resetError: () => void;
}

const FallbackApiError = ({ resetError }: ErrorProps) => {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-bg-01">
			<div className="flex flex-col items-center">
				<ErrorIcon />
				<h2 className="mt-[7.75rem] text-white title-bold-36">일시적인 오류가 발생했습니다.</h2>
				<p className="text-white title-med-32">잠시 후 다시 이용해 주세요.</p>

				<div className="mt-[4.4rem]">
					<HomeLargeBtn onClick={resetError} variant={HomeLargeBtnVariant.LARGE}>
						다시 시도하기
					</HomeLargeBtn>
				</div>
			</div>
		</div>
	);
};

export default FallbackApiError;
