import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FieldType } from '@/shared/types/fileds';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import StepField from './StepField/StepField';
import StepService from './StepService/StepService';
import StepStart from './StepStart/StepStart';
import { useFunnel } from './hooks/useFunnel';

const OnboardingPage = () => {
	const navigate = useNavigate();
	const { Funnel, Step, setStep } = useFunnel();

	const [selectedField, setSelectedField] = useState<FieldType | null>(null);

	const handleSelectField = (field: FieldType) => {
		setSelectedField(field);
	};

	useEffect(() => {
		const isSignUp = localStorage.getItem('isSignUp');

		if (isSignUp !== 'true') {
			navigate(ROUTES_CONFIG.home.path, { replace: true });
		}
	});

	return (
		<div className="flex h-screen w-[calc(100vw-7.4rem)] bg-gray-bg-01">
			<Funnel>
				<Step name="start">
					<StepStart setStep={setStep} />
				</Step>
				<Step name="field">
					<StepField setStep={setStep} onSelectField={handleSelectField} selectedField={selectedField} />
				</Step>
				<Step name="service">
					<StepService setStep={setStep} selectedField={selectedField} />
				</Step>
			</Funnel>
		</div>
	);
};

export default OnboardingPage;
