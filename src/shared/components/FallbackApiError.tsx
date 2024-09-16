import { HomeLargeBtnVariant } from '@/shared/types/global';

import ErrorIcon from '@/shared/assets/svgs/error.svg?react';

import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';

interface ErrorProps {
	resetError: () => void;
}

const FallbackApiError = ({ resetError }: ErrorProps) => {
	return (
		<div className="flex w-full justify-center">
			<div className="flex w-full flex-col items-center">
				<ErrorIcon className="mt-[32.3rem]" />
				<h2 className="title-bold-36 mt-[7.75rem] text-white">일시적인 오류가 발생했습니다.</h2>
				<p className="title-med-32 text-white">잠시 후 다시 이용해 주세요.</p>

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
