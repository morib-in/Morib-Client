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
			<h1 className="mb-[2rem] text-center text-white title-bold-36">집중을 도와줄 모립세트를 만들어볼까요?</h1>
			<p className="mb-[8.3rem] text-center text-gray-04 subhead-reg-22">
				모립세트란 작업에 꼭 필요한 일만 할 수 있도록
				<br />
				설정하는 작업 시 사용 할 허용 서비스들의 모음을 말해요.
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
