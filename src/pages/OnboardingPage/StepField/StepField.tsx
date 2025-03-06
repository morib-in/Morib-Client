import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';

import type { FieldType } from '@/shared/types/fileds';
import { HomeLargeBtnVariant } from '@/shared/types/global';

import { FIELDS_WITH_ICONS } from '@/shared/constants/fields';

import ButtonSkip from '../ButtonSkip/ButtonSkip';

interface StepFieldProps {
	setStep: (step: string) => void;
	onSelectField: (field: FieldType) => void;
	selectedField: FieldType | null;
}

const StepField = ({ setStep, onSelectField, selectedField }: StepFieldProps) => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center overflow-auto pb-[18.2rem] pt-[18rem] 2xl:pb-0">
			<h1 className="mb-[2rem] text-center text-white title-bold-36">주로 어떤 분야에 집중하시나요?</h1>
			<h2 className="mb-[8.3rem] text-center text-gray-04 body-reg-24">
				업무 분야에 자주 쓰이는 서비스들을 추천 해드릴게요
			</h2>

			<div>
				<ul className="mb-[11.7rem] flex flex-wrap justify-center gap-[2rem]">
					{FIELDS_WITH_ICONS.map((field) => (
						<li key={field.label}>
							<button
								onClick={() => onSelectField(field.label)}
								className={`flex h-[26rem] w-[19rem] flex-col items-center justify-center gap-y-[0.8rem] rounded-[8px] text-white head-bold-24 ${selectedField === field.label ? 'border border-mint-01 bg-gray-bg-02' : 'bg-gray-bg-03'}`}
							>
								<img src={field.img} alt={field.label} />
								<p>{field.label}</p>
							</button>
						</li>
					))}
				</ul>
			</div>

			<HomeLargeBtn
				variant={HomeLargeBtnVariant.LARGE}
				onClick={() => setStep('service')}
				disabled={selectedField === null}
				className="mb-[2rem]"
			>
				다음으로 넘어가기
			</HomeLargeBtn>

			<ButtonSkip />
		</main>
	);
};

export default StepField;
