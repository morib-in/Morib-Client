import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import OnboardingIcon from '@/shared/assets/svgs/onboarding_image.svg?react';

import ButtonSkip from '../ButtonSkip/ButtonSkip';

interface StepStartProps {
	setStep: (step: string) => void;
}

const StepStart = ({ setStep }: StepStartProps) => {
	return (
		<main className="flex w-full flex-col items-center justify-center">
			<h1 className="mb-[2rem] text-center text-white title-bold-36">
				집중을 도와줄 허용서비스 리스트를 만들어볼까요?
			</h1>
			<p className="body-med-24 mb-[8.3rem] text-center text-gray-04">
				작업 할 때 필요한 서비스들만을 사용하며 오롯이 할 일에 집중해보세요.
				<br />
				작업할 때 자주 쓰는 서비스들을 추천해드릴게요!
			</p>
			<OnboardingIcon className="mb-[8.3rem]" />

			<HomeLargeBtn variant={HomeLargeBtnVariant.LARGE} onClick={() => setStep('field')} className="mb-[2rem]">
				<span className="min-w-[15.6rem]">시작하기</span>
			</HomeLargeBtn>

			<ButtonSkip />
		</main>
	);
};

export default StepStart;
