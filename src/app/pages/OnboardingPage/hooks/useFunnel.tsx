import { ReactElement, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface StepProps {
	name: string;
	children: ReactNode;
}

interface FunnelProps {
	children: ReactElement<StepProps>[];
}

export const useFunnel = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const step = searchParams.get('step') || 'start';

	const setStep = (step: string) => {
		searchParams.set('step', step);
		setSearchParams(searchParams);
	};

	const Step = ({ children }: StepProps) => {
		return <>{children}</>;
	};

	const Funnel = ({ children }: FunnelProps) => {
		const targetStep = children.find((childStep) => childStep.props.name === step);
		return <>{targetStep}</>;
	};

	return { Funnel, Step, setStep };
};
